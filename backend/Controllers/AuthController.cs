using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Google.Apis.Auth;
using Sleepie.Backend.Data;
using Sleepie.Backend.Models;

namespace Sleepie.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public class RegisterDto
        {
            public string FullName { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
            public string? PhoneNumber { get; set; }
        }

        public class LoginDto
        {
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        public class GoogleLoginDto
        {
            public string IdToken { get; set; } = string.Empty;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.FullName) || dto.FullName.Trim().Length < 2)
            {
                return BadRequest(new { message = "Họ và tên không hợp lệ." });
            }

            if (string.IsNullOrWhiteSpace(dto.Email) || !dto.Email.Contains('@'))
            {
                return BadRequest(new { message = "Email không hợp lệ." });
            }

            if (string.IsNullOrWhiteSpace(dto.Password) || dto.Password.Length < 8)
            {
                return BadRequest(new { message = "Mật khẩu phải có ít nhất 8 ký tự." });
            }

            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                return BadRequest(new { message = "Email đã tồn tại." });
            }

            var userRole = await _context.Roles.FirstOrDefaultAsync(r => r.RoleName == "user");
            if (userRole == null) 
            {
                userRole = new Role { RoleName = "user" };
                _context.Roles.Add(userRole);
                
                // Cũng tạo luôn role staff nếu chưa có
                if (!await _context.Roles.AnyAsync(r => r.RoleName == "staff"))
                {
                    _context.Roles.Add(new Role { RoleName = "staff" });
                }
                await _context.SaveChangesAsync();
            }

            var user = new User
            {
                FullName = dto.FullName.Trim(),
                Email = dto.Email.Trim(),
                PhoneNumber = string.IsNullOrWhiteSpace(dto.PhoneNumber) ? null : dto.PhoneNumber.Trim(),
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                RoleId = userRole.Id
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đăng ký thành công!" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "Email hoặc mật khẩu không chính xác." });
            }

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                token,
                user = new { user.Id, user.FullName, user.Email, Role = user.Role?.RoleName ?? "user" }
            });
        }

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin(GoogleLoginDto dto)
        {
            // 1. Xác minh id_token với Google
            GoogleJsonWebSignature.Payload payload;
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[] { _configuration["Google:ClientId"] }
                };
                payload = await GoogleJsonWebSignature.ValidateAsync(dto.IdToken, settings);
            }
            catch (InvalidJwtException)
            {
                return Unauthorized(new { message = "Token Google không hợp lệ." });
            }

            // 2. Tìm user theo GoogleId hoặc Email
            var user = await _context.Users.Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.GoogleId == payload.Subject);

            if (user == null)
            {
                // Tìm theo email — liên kết tài khoản nếu email đã tồn tại
                user = await _context.Users.Include(u => u.Role)
                    .FirstOrDefaultAsync(u => u.Email == payload.Email);

                if (user != null)
                {
                    // Liên kết Google ID vào tài khoản hiện có
                    user.GoogleId = payload.Subject;
                    await _context.SaveChangesAsync();
                }
            }

            if (user == null)
            {
                // 3. Tạo user mới
                var userRole = await _context.Roles.FirstOrDefaultAsync(r => r.RoleName == "user");
                if (userRole == null)
                {
                    userRole = new Role { RoleName = "user" };
                    _context.Roles.Add(userRole);
                    await _context.SaveChangesAsync();
                }

                user = new User
                {
                    FullName = payload.Name ?? payload.Email,
                    Email = payload.Email,
                    GoogleId = payload.Subject,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString()),
                    RoleId = userRole.Id
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                // Reload để lấy Role navigation property
                user = await _context.Users.Include(u => u.Role)
                    .FirstOrDefaultAsync(u => u.Id == user.Id);
            }

            // 4. Trả JWT token
            var token = GenerateJwtToken(user!);

            return Ok(new
            {
                token,
                user = new { user!.Id, user.FullName, user.Email, Role = user.Role?.RoleName ?? "user" }
            });
        }

        private string GenerateJwtToken(User user)
        {
            var roleName = user.Role?.RoleName ?? "user";

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, roleName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

