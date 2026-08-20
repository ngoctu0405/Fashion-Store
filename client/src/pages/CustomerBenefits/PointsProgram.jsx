import { Link } from "react-router-dom";
import { ArrowRight, CircleDollarSign, ShoppingBag, Sparkles, UserRoundCheck } from "lucide-react";
import styles from "./BenefitDetail.module.css";

function PointsProgram() {
  return <main className={styles.page}>
    <header className={styles.hero}><p><Sparkles size={15} /> ƯU ĐÃI KHÁCH HÀNG</p><h1>Chương trình<br /><em>tích điểm thành viên</em></h1><span>Mỗi đơn hàng hoàn tất là thêm một điểm chạm trên hành trình cùng Zantusto.</span></header>
    <section className={styles.intro}><CircleDollarSign aria-hidden="true" /><p className={styles.eyebrow}>Cách thức hoạt động</p><h2>Mua sắm hôm nay, nhận ưu đãi cho lần sau.</h2><p>Điểm thành viên được ghi nhận tự động sau khi đơn hàng hoàn tất. Bạn chỉ cần đăng nhập đúng tài khoản đã dùng khi mua sắm.</p></section>
    <section className={styles.steps}>
      <article><span>01</span><UserRoundCheck /><h2>Đăng ký thành viên</h2><p>Tạo hoặc đăng nhập tài khoản Zantusto với thông tin liên hệ chính xác.</p></article>
      <article><span>02</span><ShoppingBag /><h2>Hoàn tất đơn hàng</h2><p>Điểm được cộng cho những đơn hàng đã thanh toán thành công và hoàn tất.</p></article>
      <article><span>03</span><CircleDollarSign /><h2>Theo dõi & sử dụng điểm</h2><p>Tích lũy điểm để đổi lấy ưu đãi hoặc quà tặng trong các chương trình áp dụng.</p></article>
    </section>
    <section className={styles.rules}><h2>Quy định tích điểm</h2><ul><li>Điểm chỉ được ghi nhận cho đơn hàng hợp lệ sau khi hoàn tất.</li><li>Điểm có thể cần thời gian cập nhật sau khi đơn giao thành công.</li><li>Đơn bị hủy hoặc hoàn trả sẽ không được tích điểm, hoặc điểm tương ứng sẽ được điều chỉnh.</li><li>Điểm không quy đổi thành tiền mặt và không chuyển nhượng giữa các tài khoản.</li></ul></section>
    <section className={styles.cta}><h2>Sẵn sàng tích lũy<br />đặc quyền của bạn?</h2><Link to="/products">Mua sắm ngay <ArrowRight size={18} /></Link></section>
  </main>;
}
export default PointsProgram;
