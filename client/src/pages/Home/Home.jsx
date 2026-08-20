import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Gem,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import styles from "./Home.module.css";
import bannerMen from "../../assets/About/banner1.png";
import bannerStyle from "../../assets/About/banner2.png";
import bannerWomen from "../../assets/About/banner3.png";

const benefits = [
  {
    icon: Truck,
    title: "Giao hàng tận nơi",
    text: "Đóng gói cẩn thận, theo dõi đơn dễ dàng.",
  },
  {
    icon: RotateCcw,
    title: "Đổi hàng linh hoạt",
    text: "Hỗ trợ đổi sản phẩm theo chính sách.",
  },
  {
    icon: ShieldCheck,
    title: "Mua sắm an tâm",
    text: "Sản phẩm được kiểm tra kỹ trước khi gửi.",
  },
];

function Home() {
  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            <Sparkles size={15} /> Bộ sưu tập mới 2026
          </p>
          <h1>
            Chạm vào phong cách.
            <br />
            <em>Tạo nên dấu ấn.</em>
          </h1>
          <p className={styles.heroDescription}>
            Những phụ kiện được chọn lọc để mỗi ngày của bạn đều có một điểm
            nhấn thật riêng.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} to="/products">
              Khám phá ngay <ArrowRight size={18} />
            </Link>
            <Link className={styles.textButton} to="/about">
              Câu chuyện Zantusto <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className={styles.heroNote}>
            <span>
              <Check size={15} /> Thiết kế chọn lọc
            </span>
            <span>
              <Check size={15} /> Phối đồ dễ dàng
            </span>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.visualGlow} />
          <img src={bannerStyle} alt="Bộ sưu tập phụ kiện Zantusto" />
          <div className={styles.floatingCard}>
            <span>
              <Star size={14} fill="currentColor" /> Phong cách được yêu thích
            </span>
            <strong>
              New season
              <br />
              essentials
            </strong>
          </div>
        </div>
      </section>

      <section className={styles.trustRow} aria-label="Cam kết dịch vụ">
        {benefits.map(({ icon: Icon, title, text }) => (
          <div className={styles.trustItem} key={title}>
            <Icon aria-hidden="true" />
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.collections}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Khám phá theo gu</p>
            <h2>
              Chọn điều khiến bạn <em>nổi bật</em>
            </h2>
          </div>
          <Link to="/products">
            Xem tất cả <ArrowRight size={17} />
          </Link>
        </div>
        <div className={styles.collectionGrid}>
          <Collection
            className={styles.menCard}
            image={bannerMen}
            alt="Phong cách thời trang nam"
            label="01 / For him"
            title="Phong cách nam"
          />
          <Collection
            className={styles.featureCard}
            image={bannerStyle}
            alt="Phụ kiện phong cách Zantusto"
            label="02 / The edit"
            title={
              <>
                Phụ kiện
                <br />
                tinh tế
              </>
            }
          />
          <Collection
            className={styles.womenCard}
            image={bannerWomen}
            alt="Phong cách thời trang nữ"
            label="03 / For her"
            title="Phong cách nữ"
          />
        </div>
      </section>

      <section className={styles.statement}>
        <div className={styles.statementMark}>
          <Gem aria-hidden="true" />
        </div>
        <p className={styles.eyebrow}>Zantusto philosophy</p>
        <h2>
          “Phụ kiện không chỉ hoàn thiện một bộ trang phục. Chúng làm rõ con
          người bạn muốn trở thành.”
        </h2>
        <Link to="/about">
          Tìm hiểu về Zantusto <ArrowRight size={17} />
        </Link>
      </section>

      <section className={styles.editorial}>
        <div className={styles.editorialImage}>
          <img src={bannerWomen} alt="Thời trang nữ Zantusto" />
          <span>
            LOOKBOOK
            <br />
            2026
          </span>
        </div>
        <div className={styles.editorialCopy}>
          <p className={styles.eyebrow}>Dành cho khoảnh khắc của bạn</p>
          <h2>
            Đẹp theo cách
            <br />
            <em>không cần gắng gượng.</em>
          </h2>
          <p>
            Chúng tôi tin rằng phong cách bền vững nhất là phong cách khiến bạn
            thấy tự tin. Khám phá những mảnh ghép được tạo ra cho nhịp sống của
            riêng bạn.
          </p>
          <Link className={styles.darkButton} to="/products">
            Bắt đầu chọn gu <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

function Collection({ className, image, alt, label, title }) {
  return (
    <Link className={`${styles.collectionCard} ${className}`} to="/products">
      <img src={image} alt={alt} />
      <div>
        <p>{label}</p>
        <h3>{title}</h3>
        <span>
          Khám phá <ArrowUpRight size={18} />
        </span>
      </div>
    </Link>
  );
}

export default Home;
