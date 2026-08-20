import { Link } from "react-router-dom";
import { ArrowRight, Gift, Sparkles, Ticket, WalletCards } from "lucide-react";
import styles from "./BenefitDetail.module.css";

function RewardsProgram() {
  return <main className={styles.page}>
    <header className={styles.hero}><p><Sparkles size={15} /> ƯU ĐÃI KHÁCH HÀNG</p><h1>Đổi điểm,<br /><em>nhận quà theo gu.</em></h1><span>Biến điểm tích lũy thành những đặc quyền nhỏ cho hành trình mua sắm tiếp theo của bạn.</span></header>
    <section className={styles.intro}><Gift aria-hidden="true" /><p className={styles.eyebrow}>Đổi quà thành viên</p><h2>Mỗi điểm thưởng đều có một niềm vui phía trước.</h2><p>Khi có đủ điểm, bạn có thể dùng điểm để đổi mã ưu đãi, thẻ quà tặng hoặc quà tặng trong danh sách chương trình tại thời điểm áp dụng.</p></section>
    <section className={styles.steps}>
      <article><span>01</span><WalletCards /><h2>Kiểm tra điểm</h2><p>Đăng nhập tài khoản để xem số điểm hiện có và các ưu đãi đang khả dụng.</p></article>
      <article><span>02</span><Ticket /><h2>Chọn quà phù hợp</h2><p>Chọn mã ưu đãi, thẻ quà tặng hoặc quà tặng trong chương trình đổi điểm.</p></article>
      <article><span>03</span><Gift /><h2>Xác nhận đổi quà</h2><p>Điểm sẽ được trừ sau khi đổi thành công; ưu đãi sẽ sẵn sàng để sử dụng theo điều kiện riêng.</p></article>
    </section>
    <section className={styles.rules}><h2>Lưu ý khi đổi điểm</h2><ul><li>Danh sách quà tặng và mức điểm đổi có thể thay đổi theo từng chương trình.</li><li>Mã ưu đãi sau khi đổi có thời hạn và điều kiện áp dụng riêng.</li><li>Quà tặng số lượng giới hạn sẽ được đổi theo thứ tự xác nhận thành công.</li><li>Điểm đã đổi quà không thể hoàn lại, trừ trường hợp Zantusto thông báo khác.</li></ul></section>
    <section className={styles.cta}><h2>Khám phá món quà<br />dành cho bạn.</h2><Link to="/products">Xem sản phẩm <ArrowRight size={18} /></Link></section>
  </main>;
}
export default RewardsProgram;
