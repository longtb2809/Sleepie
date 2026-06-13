import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';
import {
  validateFullName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
  validateRegisterForm,
  normalizePhone,
} from '../utils/validation';

const FIELD_VALIDATORS = {
  fullName: (value) => validateFullName(value),
  email: (value) => validateEmail(value),
  phone: (value) => validatePhone(value),
  password: (value) => validatePassword(value),
  confirmPassword: (value, form) => validateConfirmPassword(form.password, value),
};

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const formValues = { fullName, email, phone, password, confirmPassword };

  const validateField = (field, value) => {
    const validator = FIELD_VALIDATORS[field];
    if (!validator) return '';
    return validator(value, formValues);
  };

  const handleBlur = (field) => {
    const value = formValues[field];
    const message = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleFieldChange = (field, value) => {
    const setters = {
      fullName: setFullName,
      email: setEmail,
      phone: setPhone,
      password: setPassword,
      confirmPassword: setConfirmPassword,
    };
    setters[field](value);

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }

    if (field === 'password' && errors.confirmPassword && confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(value, confirmPassword),
      }));
    }
  };

  const inputClassName = (field) =>
    `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
      errors[field] ? 'border-red-500' : 'border-gray-300'
    }`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validateRegisterForm(formValues);
    setErrors(fieldErrors);

    if (Object.values(fieldErrors).some(Boolean)) {
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      await register(fullName.trim(), email.trim(), password, normalizePhone(phone));
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setIsLoading(true);
    try {
      const user = await loginWithGoogle(credentialResponse.credential);
      if (user.role === 'staff') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký bằng Google thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Đăng ký bằng Google thất bại. Vui lòng thử lại.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative">
        <Link to="/" className="absolute top-4 left-4 text-text-light hover:text-primary transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-text-dark">Tạo tài khoản</h2>
          <p className="text-text-light mt-2">Tham gia cùng Sleepie ngay hôm nay</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Họ và tên</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => handleFieldChange('fullName', e.target.value)}
              onBlur={() => handleBlur('fullName')}
              className={inputClassName('fullName')}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={inputClassName('email')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Số điện thoại</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              className={inputClassName('phone')}
              placeholder="Ví dụ: 0901 234 567"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              className={inputClassName('password')}
            />
            {errors.password ? (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            ) : (
              <p className="mt-1 text-xs text-text-light">Ít nhất 8 ký tự, gồm chữ cái và số.</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Xác nhận mật khẩu</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
              onBlur={() => handleBlur('confirmPassword')}
              className={inputClassName('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-light text-white font-medium py-3 rounded-lg transition-colors shadow-md disabled:opacity-70 mt-2"
          >
            {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-text-light">Hoặc</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            size="large"
            width="100%"
            text="signup_with"
            shape="rectangular"
            logo_alignment="left"
            locale="vi_VN"
          />
        </div>

        <p className="mt-8 text-center text-text-light text-sm">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
