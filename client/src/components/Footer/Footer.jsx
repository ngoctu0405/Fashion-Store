import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Cột 1 */}
        <div className={styles.section}>
          <div className={styles.logo}>ZANTUSTO</div>

          <p>Tổng đài CSKH: 0xxxxxxxxxxxx</p>
          <p>Email: cskh@zantusto.com</p>
        </div>

        {/* Cột 2 */}
        <div className={styles.section}>
          <h3>ƯU ĐÃI KHÁCH HÀNG</h3>

          <ul>
            <li>Chương trình tích điểm</li>
            <li>Đổi điểm sang thẻ quà tặng</li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div className={styles.section}>
          <h3>HỖ TRỢ KHÁCH HÀNG</h3>

          <ul className={styles.policyList}>
            <li>
              <Link to="/exchange-policy">Chính sách đổi hàng và bảo hành</Link>
            </li>

            <li>
              <Link to="/membership-policy">Chính sách Membership</Link>
            </li>

            <li>
              <Link to="/privacy-policy">Chính sách bảo mật</Link>
            </li>

            <li>
              <Link to="/shipping-policy">Chính sách giao hàng</Link>
            </li>
          </ul>
        </div>

        {/* Cột 4 */}
        <div className={styles.section}>
          <h3>KẾT NỐI VỚI CHÚNG TÔI</h3>

          <div className={styles.socials}>
            <a href="#">Zalo</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Youtube</a>
            <a href="#">Tiktok</a>
          </div>
        </div>
      </div>

      {/* Thanh toán */}
      <div className={styles.paymentSection}>
        <h3>PHƯƠNG THỨC THANH TOÁN</h3>

        <div className={styles.paymentMethods}>
          <span className={styles.payment}>COD</span>
          <span className={styles.payment}>MoMo</span>
          <span className={styles.payment}>Ngân hàng</span>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.bottom}>
        <p>© Bản quyền thuộc về ZANTUSTO</p>
      </div>
    </footer>
  );
}

export default Footer;
