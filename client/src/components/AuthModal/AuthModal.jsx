import styles from './AuthModal.module.css';
import { useState, useEffect } from 'react';

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setShowPassword(false);
      setShowConfirmPassword(false);
      setFormData({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        phone: '',
        birthday: '',
        gender: '',
        terms: false
      });
      setErrors({});
      setTouched({});
    }
  }, [isOpen, initialMode]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthday: '',
    gender: '',
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  if (!isOpen) return null;

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'fullName':
        if (!value.trim()) error = 'Họ và tên không được để trống';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) error = 'Email không đúng định dạng';
        break;
      case 'username':
        if (value.length < 4) error = 'Tên đăng nhập phải có ít nhất 4 ký tự';
        break;
      case 'password':
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        if (!value) {
          error = 'Mật khẩu không được để trống';
        } else if (value.length < 8) {
          error = 'Mật khẩu phải có ít nhất 8 ký tự';
        } else if (!passwordRegex.test(value)) {
          error = 'Mật khẩu phải bao gồm cả chữ và số';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) error = 'Mật khẩu xác nhận không khớp';
        break;
      case 'phone':
        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        if (!value.trim()) {
          error = 'Số điện thoại không được để trống';
        } else if (!phoneRegex.test(value)) {
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
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
    
    // Clear error while typing if it was already touched
    if (touched[name]) {
      const error = validateField(name, val);
      setErrors({ ...errors, [name]: error });
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={`${styles.modal} ${mode === 'login' ? styles.loginModal : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        
        <div className={styles.headerTabs}>
          <button 
            className={`${styles.tab} ${mode === 'login' ? styles.activeTab : ''}`}
            onClick={() => setMode('login')}
          >
            Đăng Nhập
          </button>
          <button 
            className={`${styles.tab} ${mode === 'register' ? styles.activeTab : ''}`}
            onClick={() => setMode('register')}
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
          
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={`${styles.formGrid} ${mode === 'login' ? styles.loginGrid : ''}`}>
              {mode === 'register' && (
                <div className={styles.inputGroup}>
                  <label>Họ và Tên <span className={styles.required}>*</span></label>
                  <input 
                    type="text" 
                    name="fullName"
                    placeholder="Nhập họ và tên" 
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.fullName && errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
                </div>
              )}

              <div className={styles.inputGroup}>
                <label>Email <span className={styles.required}>*</span></label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="example@gmail.com" 
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              {mode === 'register' && (
                <div className={styles.inputGroup}>
                  <label>Tên đăng nhập <span className={styles.required}>*</span></label>
                  <input 
                    type="text" 
                    name="username"
                    placeholder="Tối thiểu 4 ký tự" 
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.username && errors.username && <span className={styles.errorText}>{errors.username}</span>}
                </div>
              )}

              <div className={styles.inputGroup}>
                <label>Mật khẩu <span className={styles.required}>*</span></label>
                <div className={styles.passwordWrapper}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    placeholder="Tối thiểu 8 ký tự, gồm chữ và số" 
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <button 
                    type="button" 
                    className={styles.toggleBtn}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {touched.password && errors.password && <span className={styles.errorText}>{errors.password}</span>}
              </div>

              {mode === 'register' && (
                <>
                  <div className={styles.inputGroup}>
                    <label>Xác nhận mật khẩu <span className={styles.required}>*</span></label>
                    <div className={styles.passwordWrapper}>
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        name="confirmPassword"
                        placeholder="Nhập lại mật khẩu" 
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <button 
                        type="button" 
                        className={styles.toggleBtn}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                    {touched.confirmPassword && errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Số điện thoại <span className={styles.required}>*</span></label>
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="09xxxxxxxx" 
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.phone && errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Ngày sinh (tuỳ chọn)</label>
                    <input 
                      type="date" 
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Giới tính (tuỳ chọn)</label>
                    <div className={styles.radioGroup}>
                      <label><input type="radio" name="gender" value="male" onChange={handleChange} checked={formData.gender === 'male'} /> Nam</label>
                      <label><input type="radio" name="gender" value="female" onChange={handleChange} checked={formData.gender === 'female'} /> Nữ</label>
                      <label><input type="radio" name="gender" value="other" onChange={handleChange} checked={formData.gender === 'other'} /> Khác</label>
                    </div>
                  </div>

                  <div className={styles.checkboxGroup}>
                    <label>
                      <input 
                        type="checkbox" 
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                      /> Tôi đồng ý với <span className={styles.link}>Điều khoản sử dụng</span>
                    </label>
                  </div>
                </>
              )}
            </div>

            <button type="submit" className={styles.submitBtn}>
              {mode === 'login' ? 'Đăng Nhập' : 'Đăng Ký'}
            </button>

            <p className={styles.footer}>
              {mode === 'login' ? (
                <>Bạn chưa có tài khoản? <span onClick={() => setMode('register')}>Đăng ký ngay</span></>
              ) : (
                <>Bạn đã có tài khoản? <span onClick={() => setMode('login')}>Đăng nhập</span></>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
