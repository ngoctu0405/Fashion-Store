import { useLocation } from "react-router-dom";
import { FileText } from "lucide-react";
import styles from "./Policies.module.css";

const policies = {
  "/exchange-policy": {
    title: "Chính sách đổi hàng & bảo hành",
    intro: "ZANTUSTO mong muốn mỗi đơn hàng đều mang lại trải nghiệm hài lòng. Chúng tôi hỗ trợ đổi hàng minh bạch, nhanh chóng trong các trường hợp đủ điều kiện.",
    sections: [
      ["Điều kiện đổi hàng", ["Sản phẩm được yêu cầu đổi trong vòng 07 ngày kể từ ngày nhận hàng.", "Sản phẩm còn nguyên tem, nhãn, phụ kiện đi kèm và chưa qua sử dụng, giặt ủi hoặc sửa chữa.", "Sản phẩm mua trong chương trình giảm giá vẫn được áp dụng nếu không có thông báo riêng."]],
      ["Trường hợp được hỗ trợ", ["Giao sai mẫu, màu sắc hoặc số lượng so với đơn hàng đã xác nhận.", "Sản phẩm có lỗi kỹ thuật hoặc lỗi từ khâu sản xuất.", "Kích thước chưa phù hợp, áp dụng theo tồn kho của cửa hàng."]],
      ["Bảo hành", ["Các lỗi do sản xuất được tiếp nhận kiểm tra trong 30 ngày kể từ ngày nhận hàng.", "Chính sách không áp dụng cho hao mòn tự nhiên, bảo quản không đúng cách hoặc tác động từ bên ngoài."]],
    ],
  },
  "/membership-policy": {
    title: "Chính sách Membership",
    intro: "Chương trình thành viên ZANTUSTO được xây dựng để ghi nhận sự đồng hành và mang đến các ưu đãi phù hợp cho khách hàng thân thiết.",
    sections: [
      ["Tích điểm", ["Khách hàng có thể tích điểm cho các đơn hàng hợp lệ sau khi hoàn tất thanh toán.", "Điểm được ghi nhận theo giá trị thực tế của đơn hàng, sau khi trừ ưu đãi và phí vận chuyển.", "Điểm không có giá trị quy đổi thành tiền mặt."]],
      ["Ưu đãi thành viên", ["Thành viên được nhận ưu đãi sinh nhật, thông tin bộ sưu tập và chương trình riêng tùy từng thời điểm.", "Ưu đãi chỉ áp dụng cho tài khoản đã cung cấp thông tin chính xác và còn hoạt động."]],
      ["Lưu ý", ["ZANTUSTO có thể điều chỉnh điều kiện, quà tặng hoặc thời hạn điểm; thông báo sẽ được cập nhật trên các kênh chính thức.", "Tài khoản không được chuyển nhượng hoặc dùng chung cho nhiều người."]],
    ],
  },
  "/privacy-policy": {
    title: "Chính sách bảo mật",
    intro: "ZANTUSTO tôn trọng quyền riêng tư và cam kết bảo vệ thông tin cá nhân mà bạn cung cấp trong quá trình mua sắm.",
    sections: [
      ["Thông tin thu thập", ["Thông tin liên hệ như họ tên, số điện thoại, email và địa chỉ nhận hàng.", "Thông tin đơn hàng, lịch sử mua sắm và các yêu cầu hỗ trợ khách hàng.", "Dữ liệu kỹ thuật cần thiết để cải thiện trải nghiệm sử dụng website."]],
      ["Mục đích sử dụng", ["Xác nhận, xử lý và giao đơn hàng; hỗ trợ đổi trả khi cần thiết.", "Gửi thông tin về đơn hàng, ưu đãi hoặc sản phẩm mới khi bạn đồng ý nhận tin.", "Nâng cao chất lượng sản phẩm, dịch vụ và bảo mật hệ thống."]],
      ["Bảo vệ dữ liệu", ["Thông tin chỉ được chia sẻ với đối tác cần thiết để hoàn tất đơn hàng hoặc khi pháp luật yêu cầu.", "Bạn có thể yêu cầu xem, chỉnh sửa hoặc ngừng nhận thông tin tiếp thị bằng cách liên hệ bộ phận chăm sóc khách hàng."]],
    ],
  },
  "/shipping-policy": {
    title: "Chính sách giao hàng",
    intro: "ZANTUSTO xử lý đơn hàng cẩn thận và phối hợp cùng đơn vị vận chuyển để sản phẩm đến tay bạn an toàn, đúng thời gian dự kiến.",
    sections: [
      ["Thời gian xử lý", ["Đơn hàng được xác nhận và chuẩn bị trong 01–02 ngày làm việc, không tính ngày lễ.", "Đơn đặt vào cuối tuần hoặc ngày lễ sẽ được xử lý vào ngày làm việc kế tiếp."]],
      ["Thời gian giao dự kiến", ["Khu vực nội thành: khoảng 01–03 ngày làm việc sau khi đơn được bàn giao vận chuyển.", "Các tỉnh/thành khác: khoảng 03–07 ngày làm việc, tùy địa chỉ nhận hàng và điều kiện vận chuyển."]],
      ["Lưu ý khi nhận hàng", ["Vui lòng kiểm tra thông tin người nhận và tình trạng kiện hàng trước khi ký nhận.", "Nếu có dấu hiệu hư hỏng hoặc thiếu sản phẩm, hãy ghi chú với đơn vị giao hàng và liên hệ ZANTUSTO sớm nhất."]],
    ],
  },
};

function Policies() {
  const { pathname } = useLocation();
  const policy = policies[pathname] ?? policies["/privacy-policy"];

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p>HỖ TRỢ KHÁCH HÀNG</p>
        <h1>{policy.title}</h1>
        <span>Cập nhật lần cuối: 20/08/2026</span>
      </header>

      <div className={styles.content}>
        <article className={styles.article}>
          <FileText aria-hidden="true" />
          <p className={styles.intro}>{policy.intro}</p>
          {policy.sections.map(([heading, items], index) => (
            <section key={heading}>
              <h2><span>0{index + 1}</span>{heading}</h2>
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          ))}
          <div className={styles.contact}>Cần hỗ trợ thêm? Vui lòng liên hệ ZANTUSTO qua email <strong>cskh@zantusto.com</strong>.</div>
        </article>
      </div>
    </main>
  );
}

export default Policies;
