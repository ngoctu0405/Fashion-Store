import {
  Check,
  Clipboard,
  Gift,
  ShoppingBag,
  Sparkles,
  Ticket,
} from "lucide-react";
import styles from "./Promotions.module.css";

const vouchers = [
  {
    code: "GIAM15",
    title: "Giảm 15% đơn hàng",
    detail: "Ưu đãi áp dụng cho các đơn hàng đủ điều kiện.",
    condition: "Đơn từ 499.000đ",
  },
  {
    code: "FREESHIP",
    title: "Miễn phí giao hàng",
    detail: "Ưu đãi vận chuyển khi đặt hàng trực tuyến.",
    condition: "Không yêu cầu giá trị tối thiểu",
  },
];

function VoucherCard({ voucher, onCopy }) {
  return (
    <article className={styles.voucherCard}>
      <div className={styles.voucherTop}>
        <span>DÀNH CHO BẠN</span>
        <Ticket aria-hidden="true" />
      </div>
      <h3>{voucher.title}</h3>
      <p>{voucher.detail}</p>
      <div className={styles.voucherCondition}>
        <Check size={16} aria-hidden="true" /> {voucher.condition}
      </div>
      <div className={styles.codeRow}>
        <div>
          <small>MÃ ƯU ĐÃI</small>
          <strong>{voucher.code}</strong>
        </div>
        <button type="button" onClick={() => onCopy(voucher.code)}>
          <Clipboard size={16} /> Sao chép
        </button>
      </div>
    </article>
  );
}

function Promotions() {
  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      alert(`Đã sao chép mã: ${code}`);
    } catch {
      alert(`Mã ưu đãi: ${code}`);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p>
            <Sparkles size={15} /> PHIẾU ƯU ĐÃI ZANTUSTO
          </p>
          <h3>
            Ưu đãi dành cho <em> mỗi hành trình mua sắm.</em>
          </h3>
          <span>
            Khám phá các mã ưu đãi áp dụng cho đơn hàng đủ điều kiện tại
            ZANTUSTO.
          </span>
          <a href="#voucher-groups">
            Xem ưu đãi <span>↓</span>
          </a>
        </div>
      </section>

      <section className={styles.voucherSection} id="voucher-groups">
        <div className={styles.voucherInner}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Ưu đãi khách hàng</p>
            <p>
              Các mã ưu đãi được áp dụng cho khách hàng đủ điều kiện khi mua sắm
              tại ZANTUSTO.
            </p>
          </div>
          <div className={styles.voucherGrid}>
            {vouchers.map((voucher) => (
              <VoucherCard
                key={voucher.code}
                voucher={voucher}
                onCopy={handleCopy}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.howTo}>
        <div className={styles.howHeading}>
          <p className={styles.eyebrow}>Sử dụng voucher</p>
          <h2>Chỉ cần ba bước đơn giản.</h2>
        </div>
        <div className={styles.stepGrid}>
          <article>
            <span>01</span>
            <ShoppingBag aria-hidden="true" />
            <h3>Chọn sản phẩm</h3>
            <p>Thêm những sản phẩm yêu thích vào giỏ hàng của bạn.</p>
          </article>
          <article>
            <span>02</span>
            <Ticket aria-hidden="true" />
            <h3>Nhập mã ưu đãi</h3>
            <p>Dán mã voucher phù hợp vào ô mã giảm giá khi thanh toán.</p>
          </article>
          <article>
            <span>03</span>
            <Gift aria-hidden="true" />
            <h3>Nhận đặc quyền</h3>
            <p>Kiểm tra mức giảm giá trước khi xác nhận đơn hàng.</p>
          </article>
        </div>
      </section>

      <section className={styles.rules}>
        <div>
          <p className={styles.eyebrow}>Lưu ý</p>
          <h2>Điều kiện áp dụng ưu đãi</h2>
        </div>
        <ul>
          <li>Mỗi mã ưu đãi được áp dụng một lần cho một đơn hàng hợp lệ.</li>
          <li>
            Mã ưu đãi không quy đổi thành tiền mặt và không cộng dồn với các ưu
            đãi khác, trừ khi có thông báo riêng.
          </li>
          <li>Vui lòng nhập mã ưu đãi trước khi xác nhận đơn hàng.</li>
          <li>
            ZANTUSTO có quyền điều chỉnh thời hạn hoặc số lượng mã ưu đãi theo
            từng chương trình.
          </li>
        </ul>
      </section>

      <section className={styles.finalCta}>
        <p className={styles.eyebrow}>Cập nhật ưu đãi</p>
        <h2 class="slogan">
          Theo dõi ZANTUSTO để không bỏ lỡ
          <br />
          những ưu đãi mới nhất.
        </h2>
        <a href="/products">
          Khám phá sản phẩm <span>→</span>
        </a>
      </section>
    </main>
  );
}

export default Promotions;
