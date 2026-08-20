import styles from "./About.module.css";
import BannerCarousel from "../../components/BannerCarousel/BannerCarousel.jsx";
import { ArrowRight, Gem, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className={styles.container}>
      <BannerCarousel />

      <div className={styles.zantustoIntroContainer}>
        <p className={styles.zantustoTagline}>XU HƯỚNG THỜI TRANG ĐẲNG CẤP</p>
        <h2 className={styles.zantustoIntroText}>
          Chào mừng bạn đến với{" "}
          <span className={styles.brandName}>ZANTUSTO</span> – Không gian thời
          trang đẳng cấp dành cho cả Nam và Nữ. Chúng tôi mang đến những bộ sưu
          tập phụ kiện tinh tế từ mũ thời trang, kính mắt thời thượng đến balo
          cao cấp, giúp bạn tự tin tôn vinh cá tính, khẳng định bản lĩnh và định
          hình phong cách dẫn đầu.
        </h2>
        <div className={styles.accentLine}></div>
        <Link className={styles.shopLink} to="/products">
          Khám phá bộ sưu tập <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>

      <section className={styles.highlights} aria-label="Cam kết của Zantusto">
        <article className={styles.highlightCard}>
          <Sparkles aria-hidden="true" />
          <h3>Thiết kế chọn lọc</h3>
          <p>Phụ kiện cập nhật xu hướng, dễ phối và tôn lên dấu ấn riêng.</p>
        </article>
        <article className={styles.highlightCard}>
          <Gem aria-hidden="true" />
          <h3>Chất lượng chỉn chu</h3>
          <p>Mỗi sản phẩm được chọn kỹ về chất liệu, đường nét và độ bền.</p>
        </article>
        <article className={styles.highlightCard}>
          <Truck aria-hidden="true" />
          <h3>Mua sắm thuận tiện</h3>
          <p>Đặt hàng nhanh chóng, giao tận nơi để bạn an tâm tận hưởng.</p>
        </article>
      </section>

      <section className={styles.promise}>
        <ShieldCheck aria-hidden="true" />
        <div>
          <p className={styles.sectionEyebrow}>LỜI HỨA ZANTUSTO</p>
          <h2>Không chỉ là phụ kiện, đó là cách bạn kể câu chuyện của mình.</h2>
          <p>Chúng tôi đồng hành cùng bạn từ những lựa chọn hằng ngày đến những khoảnh khắc cần thật nổi bật.</p>
        </div>
      </section>

      <section className={styles.journey}>
        <div className={styles.journeyHeading}>
          <p className={styles.sectionEyebrow}>HÀNH TRÌNH PHONG CÁCH</p>
          <h2>Từ cảm hứng đến món phụ kiện dành cho bạn</h2>
          <p>Một trải nghiệm mua sắm đơn giản để mọi lựa chọn đều thật đúng gu.</p>
        </div>
        <ol className={styles.steps}>
          <li>
            <span>01</span>
            <h3>Khám phá</h3>
            <p>Tìm sản phẩm phù hợp với phong cách và nhu cầu hằng ngày.</p>
          </li>
          <li>
            <span>02</span>
            <h3>Chọn lựa</h3>
            <p>So sánh màu sắc, kiểu dáng để hoàn thiện set đồ của riêng bạn.</p>
          </li>
          <li>
            <span>03</span>
            <h3>Tỏa sáng</h3>
            <p>Nhận đơn hàng tận nơi và tự tin tạo dấu ấn trong mọi khoảnh khắc.</p>
          </li>
        </ol>
      </section>

      <section className={styles.closingCta}>
        <p className={styles.sectionEyebrow}>ZANTUSTO CHỜ BẠN</p>
        <h2>Phụ kiện nhỏ, phong cách lớn.</h2>
        <p>Khám phá những món đồ giúp bạn tự tin thể hiện bản thân mỗi ngày.</p>
        <Link className={styles.ctaButton} to="/products">Xem sản phẩm <ArrowRight size={18} aria-hidden="true" /></Link>
      </section>
    </div>
  );
}

export default About;
