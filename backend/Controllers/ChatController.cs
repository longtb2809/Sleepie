using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sleepie.Backend.Data;
using System.Text.Json;
using System.Text;
using System.Text.Json.Serialization;

namespace Sleepie.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public ChatController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            _httpClient = new HttpClient();
        }

        [HttpPost]
        public async Task<IActionResult> Chat([FromBody] ChatRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest("Message cannot be empty.");
            }

            var apiKey = _configuration["GeminiApiKey"]
                ?? Environment.GetEnvironmentVariable("GEMINI_API_KEY");
            if (string.IsNullOrWhiteSpace(apiKey))
            {
                return StatusCode(500, "Chưa cấu hình Gemini API Key. Thêm key vào appsettings.json (GeminiApiKey) hoặc biến môi trường GEMINI_API_KEY.");
            }

            // 1. Retrieve all active products
            var activeProducts = await _context.Products
                .Where(p => p.IsActive)
                .Select(p => new { p.Name, p.Description, p.Price })
                .ToListAsync();

            // 2. Build the Context (RAG) — danh sách sản phẩm từ database
            var productContext = activeProducts.Count > 0
                ? string.Join("\n", activeProducts.Select(p =>
                    $"- {p.Name}: Giá {p.Price:N0} VND. Mô tả: {p.Description}"))
                : "- Chưa có sản phẩm trong hệ thống. Tham khảo mức giá chung: 200.000đ - 400.000đ (đã bao gồm đóng gói quà tặng và cá nhân hóa).";

            var systemPrompt = $@"Bạn là trợ lý ảo CSKH của thương hiệu gối chườm thảo mộc Sleepie.
Slogan: ""One warm hug, one loving message - Ôm một hơi ấm, gửi một lời thương.""
Tone giọng: Nhẹ nhàng, thấu cảm, tinh tế. Xưng ""Sleepie"" hoặc ""mình"" và gọi khách hàng là ""bạn"".
Nhiệm vụ: Khơi gợi nhu cầu (mua tự chăm sóc hay làm quà tặng), tư vấn sản phẩm, hướng dẫn sử dụng và giải đáp chính sách bảo hành. Trả lời chi tiết, tận tâm, đầy đủ thông tin hữu ích, không cam kết chữa bệnh y tế (chỉ dùng từ ""hỗ trợ"", ""làm dịu"", ""thư giãn"").

## THÔNG TIN SẢN PHẨM
Sleepie có 2 dòng sản phẩm chính, đều KHÔNG DÙNG ĐIỆN (an toàn tuyệt đối), đóng gói dạng quà tặng (Gift-ready) hộp cứng sang trọng, hỗ trợ thêu tên riêng, lời chúc tặng kèm thiệp tay:

- Túi chườm đa năng: Vỏ Linen (Lanh) tháo giặt được, lõi thảo mộc tự nhiên. Chườm nóng giúp xoa dịu đau vai gáy, thắt lưng, ấm bụng ngày ""dâu rụng"". Chườm lạnh giúp làm mát, giảm sưng.
- Túi chườm mắt: Thiết kế nhỏ gọn ôm mắt, vải siêu mềm mịn. Chườm nóng giúp giảm mỏi mắt, thư giãn thần kinh để dễ ngủ. Chườm lạnh giúp giảm sưng húp và quầng thâm.

## Sản phẩm đang bán (từ hệ thống — ưu tiên khi tư vấn giá và mô tả cụ thể)
{productContext}

## HƯỚNG DẪN SỬ DỤNG
- Chườm nóng: Chỉ làm nóng phần ruột gối bằng Lò vi sóng (600W trong 2-3 phút) hoặc Nồi chiên không dầu (150-180°C trong 3 phút).
- Chườm lạnh: Bọc kín túi chườm vào túi zip, để ngăn đá tủ lạnh từ 30 - 60 phút.

## CHÍNH SÁCH BẢO HÀNH & HẬU MÃI
- Chính sách 1 đổi 1 trong vòng 07 ngày kể từ ngày nhận hàng đối với các lỗi từ nhà sản xuất (như bung chỉ, hỏng khóa kéo, lỗi thêu tên sai yêu cầu...).
- Điều kiện đổi trả: Sản phẩm còn nguyên vẹn, chưa qua sử dụng và giặt tẩy.
- Sleepie luôn đồng hành, hỗ trợ hướng dẫn làm nóng/lạnh và bảo quản trọn đời trong suốt quá trình khách hàng sử dụng sản phẩm.

## Cách trả lời (bắt buộc)
Khi tư vấn, luôn trả lời ĐẦY ĐỦ theo cấu trúc sau (không bỏ sót bước nào):
1. Thấu cảm: Thể hiện sự hiểu nỗi lo/nhu cầu của khách (1-2 câu).
2. Gợi ý sản phẩm phù hợp: Nêu rõ tên sản phẩm, giá (từ hệ thống), lý do phù hợp với tình trạng khách.
3. Công dụng cụ thể: Giải thích chườm nóng/lạnh hỗ trợ thế nào cho trường hợp của khách.
4. Hướng dẫn ngắn: Cách làm nóng/lạnh cơ bản nếu khách hỏi về triệu chứng/cách dùng.
5. Gợi ý thêm (nếu phù hợp): Quà tặng, thêu tên, thiệp tay, hoặc hỏi thêm để tư vấn sâu hơn.

Luôn hoàn thành câu trả lời trọn vẹn — KHÔNG dừng giữa chừng. Mỗi tin nhắn khoảng 6-10 câu, đủ chi tiết để khách tự quyết định.

## Quy tắc bắt buộc
- KHÔNG cam kết y tế: Không dùng ""chữa bệnh"", ""điều trị dứt điểm"", ""thuốc"". Chỉ dùng ""hỗ trợ"", ""làm dịu"", ""thư giãn"".
- KHÔNG bịa đặt: Câu hỏi ngoài phạm vi (phí ship cụ thể, tư vấn y tế chuyên sâu...) → lịch sự báo nhân viên CSKH sẽ liên hệ hỗ trợ chi tiết.
- Tư vấn sản phẩm dựa trên danh sách hệ thống; nếu không có trong danh sách, xin lỗi và cho biết Sleepie chưa có sản phẩm đó.
- Nhớ ngữ cảnh hội thoại trước đó để trả lời liền mạch, không hỏi lại thông tin khách đã cung cấp.";

            // 3. Build conversation history for context
            var contents = new List<object>();
            if (request.History != null)
            {
                foreach (var msg in request.History.TakeLast(10))
                {
                    var role = msg.Role == "assistant" ? "model" : "user";
                    contents.Add(new
                    {
                        role,
                        parts = new[] { new { text = msg.Content } }
                    });
                }
            }
            contents.Add(new
            {
                role = "user",
                parts = new[] { new { text = request.Message } }
            });

            // 4. Call Gemini API
            var apiUrl = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={apiKey}";

            var geminiRequest = new
            {
                systemInstruction = new
                {
                    parts = new[] { new { text = systemPrompt } }
                },
                contents,
                generationConfig = new
                {
                    temperature = 0.7,
                    maxOutputTokens = 1024
                }
            };

            var content = new StringContent(JsonSerializer.Serialize(geminiRequest), Encoding.UTF8, "application/json");
            
            try
            {
                var response = await _httpClient.PostAsync(apiUrl, content);
                var responseString = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode(500, $"Lỗi khi gọi AI (HTTP {(int)response.StatusCode}): {responseString}");
                }

                var geminiResponse = JsonSerializer.Deserialize<GeminiResponse>(responseString);
                var reply = geminiResponse?.Candidates?.FirstOrDefault()?.Content?.Parts?.FirstOrDefault()?.Text;

                return Ok(new { reply = reply ?? "Xin lỗi, Sleepie đang gặp sự cố nhỏ. Bạn thử lại sau nhé!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi gọi AI: {ex.Message}");
            }
        }
    }

    public class ChatRequest
    {
        public string Message { get; set; } = string.Empty;
        public List<ChatMessage>? History { get; set; }
    }

    public class ChatMessage
    {
        public string Role { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
    }

    public class GeminiResponse
    {
        [JsonPropertyName("candidates")]
        public List<Candidate> Candidates { get; set; } = new();
    }

    public class Candidate
    {
        [JsonPropertyName("content")]
        public Content Content { get; set; } = new();
    }

    public class Content
    {
        [JsonPropertyName("parts")]
        public List<Part> Parts { get; set; } = new();
    }

    public class Part
    {
        [JsonPropertyName("text")]
        public string Text { get; set; } = string.Empty;
    }
}
