import { Link } from "react-router-dom";
import { ArrowRight, Crown, Gift, Sparkles, Star } from "lucide-react";
import styles from "./CustomerBenefits.module.css";

const tiers = [
  { icon: Star, name: "Thành viên mới", text: "Bắt đầu tích điểm ngay từ đơn hàng đầu tiên và nhận thông tin ưu đãi mới nhất." },
  { icon: Sparkles, name: "Khách hàng thân thiết", text: "Tích lũy điểm qua mỗi đơn hoàn tất để đổi mã ưu đãi và quà tặng." },
  { icon: Crown, name: "Thành viên đặc biệt", text: "Nhận các quyền lợi dành riêng, quà sinh nhật và thông tin sự kiện sớm." },
];

function CustomerBenefits() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p><Sparkles size={15} /> ZANTUSTO MEMBERSHIP</p>
        <h1>Mỗi lựa chọn đều<br /><em>có thêm một đặc quyền.</em></h1>
        <span>Đồng hành cùng Zantusto, tích lũy niềm vui qua từng đơn hàng.</span>
      </section>

      <section className={styles.intro}>
        <div className={styles.introIcon}><Gift aria-hidden="true" /></div>
        <p className={styles.eyebrow}>Ưu đãi khách hàng</p>
        <h2>Trở thành thành viên, nhận nhiều hơn một món quà.</h2>
        <p>Chương trình được xây dựng để cảm ơn những khách hàng luôn tin tưởng Zantusto. Đơn giản, rõ ràng và mang lại nhiều điều thú vị trong suốt hành trình mua sắm của bạn.</p>
      </section>

      <section className={styles.benefits}>
        <article><span>01</span><Gift aria-hidden="true" /><h2>Tích điểm mỗi đơn hàng</h2><p>Điểm được ghi nhận cho các đơn hàng hợp lệ sau khi hoàn tất thanh toán. Bạn có thể theo dõi điểm tích lũy trong tài khoản thành viên.</p></article>
        <article><span>02</span><Gift aria-hidden="true" /><h2>Đổi điểm nhận ưu đãi</h2><p>Điểm tích lũy có thể dùng để đổi mã giảm giá, thẻ quà tặng hoặc quà tặng trong những chương trình được Zantusto công bố.</p></article>
        <article><span>03</span><Sparkles aria-hidden="true" /><h2>Ưu đãi theo mùa</h2><p>Thành viên nhận thông tin sớm về bộ sưu tập mới, sự kiện đặc biệt và những ưu đãi chỉ dành riêng cho khách hàng thân thiết.</p></article>
      </section>

      <section className={styles.tiers}>
        <div className={styles.tierHeading}><p className={styles.eyebrow}>Hành trình thành viên</p><h2>Càng gắn bó, càng nhiều đặc quyền.</h2></div>
        <div className={styles.tierGrid}>{tiers.map(({ icon: Icon, name, text }, index) => <article key={name}><Icon aria-hidden="true" /><span>0{index + 1}</span><h3>{name}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className={styles.note}>
        <h2>Lưu ý về điểm thưởng</h2>
        <ul><li>Điểm thưởng chỉ áp dụng cho tài khoản thành viên đã đăng ký thông tin hợp lệ.</li><li>Điểm không có giá trị quy đổi thành tiền mặt và không được chuyển nhượng.</li><li>Điều kiện đổi điểm, quà tặng và ưu đãi có thể được cập nhật theo từng chương trình.</li></ul>
      </section>

      <section className={styles.cta}><p className={styles.eyebrow}>Bắt đầu hôm nay</p><h2>Để mỗi lần mua sắm<br />đều thêm đáng nhớ.</h2><Link to="/products">Khám phá sản phẩm <ArrowRight size={18} /></Link></section>
    </main>
  );
}

export default CustomerBenefits;
