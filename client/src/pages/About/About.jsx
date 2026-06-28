import styles from "./About.module.css";
import BannerCarousel from "../../components/BannerCarousel/BannerCarousel.jsx";

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
        {/* <div className={styles.aboutContainer}>
          <div className={styles.imageGrid}>
            <div className={`${styles.imageWrapper} ${styles.imgTop}`}>
              <img src={img1} alt="Phụ kiện Zantusto 1" />
            </div>
            <div className={`${styles.imageWrapper} ${styles.imgMiddle}`}>
              <img src={img2} alt="Phụ kiện Zantusto 2" />
            </div>
            <div className={`${styles.imageWrapper} ${styles.imgBottom}`}>
              <img src={img3} alt="Phụ kiện Zantusto 3" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default About;
