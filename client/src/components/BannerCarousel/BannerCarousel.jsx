import Carousel from "react-bootstrap/Carousel";
import "./BannerCarousel.module.css";

import banner1 from "../../assets/About/banner1.png";
import banner2 from "../../assets/About/banner2.png";
import banner3 from "../../assets/About/banner3.png";

function BannerCarousel() {
  return (
    <Carousel fade interval={3000} className="banner-carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner1}
          alt="Mũ và Kính Zantusto"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner2}
          alt="Bộ sưu tập Balo Zantusto"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner3}
          alt="Khuyến mãi Zantusto"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default BannerCarousel;
