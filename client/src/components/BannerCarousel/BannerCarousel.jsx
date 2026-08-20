import Carousel from "react-bootstrap/Carousel";
import styles from "./BannerCarousel.module.css";

import banner1 from "../../assets/About/banner1.png";
import banner2 from "../../assets/About/banner2.png";
import banner3 from "../../assets/About/banner3.png";

function BannerCarousel() {
  return (
    <Carousel
      fade
      interval={4000}
      pause="hover"
      className={styles.bannerCarousel}
      aria-label="Bộ sưu tập nổi bật Zantusto"
    >
      <Carousel.Item>
        <img
          className={styles.bannerImage}
          src={banner1}
          alt="Mũ và Kính Zantusto"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className={styles.bannerImage}
          src={banner2}
          alt="Bộ sưu tập Balo Zantusto"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className={styles.bannerImage}
          src={banner3}
          alt="Khuyến mãi Zantusto"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default BannerCarousel;
