const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[\p{L}\s]+$/u;
const VN_PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

export function validateFullName(value) {
  const trimmed = value.trim();
  if (!trimmed) return 'Vui lòng nhập họ và tên.';
  if (trimmed.length < 2) return 'Họ và tên phải có ít nhất 2 ký tự.';
  if (trimmed.length > 100) return 'Họ và tên không được vượt quá 100 ký tự.';
  if (!NAME_REGEX.test(trimmed)) return 'Họ và tên chỉ được chứa chữ cái và khoảng trắng.';
  return '';
}

export function validateEmail(value) {
  const trimmed = value.trim();
  if (!trimmed) return 'Vui lòng nhập email.';
  if (!EMAIL_REGEX.test(trimmed)) return 'Email không hợp lệ.';
  if (trimmed.length > 255) return 'Email không được vượt quá 255 ký tự.';
  return '';
}

export function normalizePhone(value) {
  return value.replace(/[\s\-().]/g, '').replace(/^\+84/, '0');
}

export function validatePhone(value) {
  const trimmed = value.trim();
  if (!trimmed) return 'Vui lòng nhập số điện thoại.';
  const normalized = normalizePhone(trimmed);
  if (!VN_PHONE_REGEX.test(normalized)) {
    return 'Số điện thoại không hợp lệ. Ví dụ: 0901234567 hoặc +84901234567.';
  }
  return '';
}

export function validatePassword(value) {
  if (!value) return 'Vui lòng nhập mật khẩu.';
  if (value.length < 8) return 'Mật khẩu phải có ít nhất 8 ký tự.';
  if (value.length > 128) return 'Mật khẩu không được vượt quá 128 ký tự.';
  if (!/[a-zA-Z]/.test(value)) return 'Mật khẩu phải chứa ít nhất một chữ cái.';
  if (!/\d/.test(value)) return 'Mật khẩu phải chứa ít nhất một chữ số.';
  return '';
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return 'Vui lòng xác nhận mật khẩu.';
  if (password !== confirmPassword) return 'Mật khẩu xác nhận không khớp.';
  return '';
}

export function validateRegisterForm({ fullName, email, phone, password, confirmPassword }) {
  return {
    fullName: validateFullName(fullName),
    email: validateEmail(email),
    phone: validatePhone(phone),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(password, confirmPassword),
  };
}
