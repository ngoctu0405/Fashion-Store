import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

const emptyForm = {
  fullName: "",
  email: "",
  birthday: "",
  phone: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(
    new URLSearchParams(location.search).get("mode") !== "register",
  );
  const [formData, setFormData] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const switchMode = (nextIsLogin) => {
    setIsLogin(nextIsLogin);
    setError("");
    setMessage("");
    navigate(`/auth?mode=${nextIsLogin ? "login" : "register"}`, { replace: true });
  };

  const handleChange = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFormData((current) => ({ ...current, [target.name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận chưa khớp.");
      return;
    }
    if (!isLogin && !formData.terms) {
      setError("Vui lòng đồng ý với điều khoản sử dụng.");
      return;
    }

    setIsLoading(true);
    try {
      const endpoint = isLogin ? "login" : "register";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            ...formData,
            username: `${formData.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "").slice(0, 20)}${formData.phone.slice(-4)}`,
          };
      const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Có lỗi xảy ra, vui lòng thử lại.");

      if (isLogin) {
        localStorage.setItem("zantustoUser", JSON.stringify(data.user));
        if (data.token) localStorage.setItem("zantustoToken", data.token);
        navigate("/");
        return;
      }

      setFormData(emptyForm);
      setMessage("Tạo tài khoản thành công. Hãy đăng nhập để tiếp tục.");
      setIsLogin(true);
      navigate("/auth?mode=login", { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.authPage}>
      <div className={`${styles.authContainer} ${!isLogin ? styles.registering : ""}`}>
        <div className={styles.formPanel}>
          <form
            className={`${styles.form} ${isLogin ? styles.loginForm : styles.registerForm}`}
            onSubmit={handleSubmit}
          >
            <p className={styles.eyebrow}>{isLogin ? "CHÀO MỪNG TRỞ LẠI" : "TẠO TÀI KHOẢN MỚI"}</p>
            <h1>{isLogin ? "Đăng nhập" : "Đăng ký"}</h1>
            <p className={styles.description}>
              {isLogin
                ? "Đăng nhập để quản lý đơn hàng và nhận ưu đãi mới nhất."
                : "Tạo tài khoản để mua sắm nhanh hơn và nhận ưu đãi."}
            </p>

            {error && <p className={styles.error} role="alert">{error}</p>}
            {message && <p className={styles.success}>{message}</p>}

            <div className={`${styles.fieldsGrid} ${!isLogin ? styles.registerFields : ""}`}>
              {!isLogin && (
                <div className={styles.field}>
                  <label htmlFor="register-name">Họ và tên</label>
                  <input id="register-name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Nhập họ và tên" required />
                </div>
              )}
              <div className={styles.field}>
                <label htmlFor="auth-email">Email</label>
                <input id="auth-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Nhập email của bạn" required />
              </div>
              {!isLogin && (
                <>
                  <div className={styles.field}>
                  <label htmlFor="register-birthday">Ngày tháng năm sinh</label>
                  <input id="register-birthday" name="birthday" type="date" value={formData.birthday} onChange={handleChange} required />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="register-phone">Số điện thoại</label>
                    <input id="register-phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Nhập số điện thoại" required />
                  </div>
                </>
              )}
              <div className={styles.field}>
                <label htmlFor="auth-password">Mật khẩu</label>
                <input id="auth-password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder={isLogin ? "Nhập mật khẩu" : "Tối thiểu 8 ký tự, gồm chữ và số"} minLength={isLogin ? undefined : "8"} required />
              </div>
              {!isLogin && (
                <div className={styles.field}>
                  <label htmlFor="register-confirm-password">Xác nhận mật khẩu</label>
                  <input id="register-confirm-password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Nhập lại mật khẩu" minLength="8" required />
                </div>
              )}
            </div>

            {isLogin ? (
              <div className={styles.options}>
                <label className={styles.remember}><input type="checkbox" /> Ghi nhớ tôi</label>
                <button type="button" className={styles.forgot}>Quên mật khẩu?</button>
              </div>
            ) : (
              <label className={styles.terms}><input name="terms" type="checkbox" checked={formData.terms} onChange={handleChange} /> Tôi đồng ý với điều khoản sử dụng</label>
            )}
            <button className={styles.submitButton} type="submit" disabled={isLoading}>
              {isLoading ? "Đang xử lý..." : isLogin ? "Đăng nhập" : "Tạo tài khoản"}
            </button>
          </form>
        </div>

        <aside className={styles.switchPanel}>
          <p className={styles.switchEyebrow}>ZANTUSTO</p>
          <h2>{isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}</h2>
          <p>
            {isLogin
              ? "Đăng ký để lưu sản phẩm yêu thích và theo dõi đơn hàng dễ dàng."
              : "Đăng nhập để tiếp tục trải nghiệm mua sắm cùng chúng tôi."}
          </p>
          <button className={styles.switchButton} type="button" onClick={() => switchMode(!isLogin)}>
            {isLogin ? "Đăng ký" : "Đăng nhập"}
          </button>
        </aside>
      </div>
    </section>
  );
}
