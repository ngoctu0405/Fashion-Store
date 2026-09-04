import { useState, useEffect } from 'react';
import styles from './AuthModal.module.css';

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const INITIAL_FORM_DATA = {
  fullName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  birthday: '',
  gender: '',
  terms: false,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /(84|0[35789])\d{8}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const AuthModal = ({ isOpen, onClose, initialMode = 'login', onLoginSuccess }) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setShowPassword(false);
      setShowConfirmPassword(false);
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
      setTouched({});
      setApiError('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setErrors({});
    setTouched({});
    setApiError('');
  };

  const validateField = (name, value, currentMode = mode) => {
    let error = '';
    switch (name) {
      case 'fullName':
        if (!value.trim()) error = 'Họ và tên không được để trống';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email không được để trống';
        } else if (!EMAIL_REGEX.test(value)) {
          error = 'Email không đúng định dạng';
        }
        break;
      case 'username':
        if (!value.trim()) {
          error = 'Tên đăng nhập không được để trống';
        } else if (value.length < 4) {
          error = 'Tên đăng nhập phải có ít nhất 4 ký tự';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Mật khẩu không được để trống';
        } else if (currentMode === 'register') {
          if (value.length < 8) {
            error = 'Mật khẩu phải có ít nhất 8 ký tự';
          } else if (!PASSWORD_REGEX.test(value)) {
            error = 'Mật khẩu phải bao gồm cả chữ và số';
          }
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          error = 'Mật khẩu xác nhận không khớp';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Số điện thoại không được để trống';
        } else if (!PHONE_REGEX.test(value)) {
          error = 'Số điện thoại không hợp lệ';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: val }));
    setApiError('');

    if (touched[name]) {
      const error = validateField(name, val);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError('');

    const fieldsToValidate = mode === 'register' 
      ? ['fullName', 'email', 'username', 'password', 'confirmPassword', 'phone'] 
      : ['email', 'password'];

    const newErrors = {};
    const newTouched = {};

    fieldsToValidate.forEach((field) => {
      newTouched[field] = true;
      const error = validateField(field, formData[field], mode);
      if (error) newErrors[field] = error;
    });

    if (mode === 'register' && !formData.terms) {
      newErrors.terms = 'Bạn phải đồng ý với điều khoản sử dụng';
      newTouched.terms = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(newTouched);
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = mode === 'login' ? 'login' : 'register';
      const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Có lỗi xảy ra, vui lòng thử lại');
      }

      if (onLoginSuccess) {
        onLoginSuccess({
          name: data.user.name || data.user.fullName,
          email: data.user.email,
        });
      }
      onClose();
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={`${styles.modal} ${mode === 'login' ? styles.loginModal : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Đóng">&times;</button>
        
        <div className={styles.headerTabs}>
          <button 
            type="button"
            className={`${styles.tab} ${mode === 'login' ? styles.activeTab : ''}`}
            onClick={() => handleModeSwitch('login')}
          >
            Đăng Nhập
          </button>
          <button 
            type="button"
            className={`${styles.tab} ${mode === 'register' ? styles.activeTab : ''}`}
            onClick={() => handleModeSwitch('register')}
          >
            Đăng Ký
          </button>
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>
            {mode === 'login' ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
          </h2>
          <p className={styles.subtitle}>
            {mode === 'login' 
              ? 'Nhập thông tin để tiếp tục' 
              : 'Trở thành thành viên để nhận ưu đãi'}
          </p>
          
          {apiError && <div className={styles.apiError}>{apiError}</div>}
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={`${styles.formGrid} ${mode === 'login' ? styles.loginGrid : ''}`}>
              {mode === 'register' && (
                <div className={styles.inputGroup}>
                  <label htmlFor="fullName">Họ và Tên <span className={styles.required}>*</span></label>
                  <input 
                    id="fullName"
                    type="text" 
                    name="fullName"
                    placeholder="Nhập họ và tên" 
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                  />
                  {touched.fullName && errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
                </div>
              )}

              <div className={styles.inputGroup}>
                <label htmlFor="email">Email <span className={styles.required}>*</span></label>
                <input 
                  id="email"
                  type="email" 
                  name="email"
                  placeholder="example@gmail.com" 
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                />
                {touched.email && errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              {mode === 'register' && (
                <div className={styles.inputGroup}>
                  <label htmlFor="username">Tên đăng nhập <span className={styles.required}>*</span></label>
                  <input 
                    id="username"
                    type="text" 
                    name="username"
                    placeholder="Tối thiểu 4 ký tự" 
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                  />
                  {touched.username && errors.username && <span className={styles.errorText}>{errors.username}</span>}
                </div>
              )}

              <div className={styles.inputGroup}>
                <label htmlFor="password">Mật khẩu <span className={styles.required}>*</span></label>
                <div className={styles.passwordWrapper}>
                  <input 
                    id="password"
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    placeholder="Tối thiểu 8 ký tự, gồm chữ và số" 
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                  />
                  <button 
                    type="button" 
                    className={styles.toggleBtn}
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {touched.password && errors.password && <span className={styles.errorText}>{errors.password}</span>}
              </div>

              {mode === 'register' && (
                <>
                  <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu <span className={styles.required}>*</span></label>
                    <div className={styles.passwordWrapper}>
                      <input 
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"} 
                        name="confirmPassword"
                        placeholder="Nhập lại mật khẩu" 
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isLoading}
                      />
                      <button 
                        type="button" 
                        className={styles.toggleBtn}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                        aria-label={showConfirmPassword ? "Ẩn xác nhận mật khẩu" : "Hiện xác nhận mật khẩu"}
                      >
                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                    {touched.confirmPassword && errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="phone">Số điện thoại <span className={styles.required}>*</span></label>
                    <input 
                      id="phone"
                      type="tel" 
                      name="phone"
                      placeholder="09xxxxxxxx" 
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isLoading}
                    />
                    {touched.phone && errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="birthday">Ngày sinh (tuỳ chọn)</label>
                    <input 
                      id="birthday"
                      type="date" 
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Giới tính (tuỳ chọn)</label>
                    <div className={styles.radioGroup}>
                      <label><input type="radio" name="gender" value="male" onChange={handleChange} checked={formData.gender === 'male'} disabled={isLoading} /> Nam</label>
                      <label><input type="radio" name="gender" value="female" onChange={handleChange} checked={formData.gender === 'female'} disabled={isLoading} /> Nữ</label>
                      <label><input type="radio" name="gender" value="other" onChange={handleChange} checked={formData.gender === 'other'} disabled={isLoading} /> Khác</label>
                    </div>
                  </div>

                  <div className={styles.checkboxGroup}>
                    <label>
                      <input 
                        type="checkbox" 
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                        disabled={isLoading}
                      /> Tôi đồng ý với <span className={styles.link}>Điều khoản sử dụng</span>
                    </label>
                    {touched.terms && errors.terms && <div className={styles.errorText}>{errors.terms}</div>}
                  </div>
                </>
              )}
            </div>

            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? 'Đang xử lý...' : (mode === 'login' ? 'Đăng Nhập' : 'Đăng Ký')}
            </button>

            <p className={styles.footer}>
              {mode === 'login' ? (
                <>Bạn chưa có tài khoản? <span role="button" tabIndex={0} onClick={() => handleModeSwitch('register')}>Đăng ký ngay</span></>
              ) : (
                <>Bạn đã có tài khoản? <span role="button" tabIndex={0} onClick={() => handleModeSwitch('login')}>Đăng nhập</span></>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
