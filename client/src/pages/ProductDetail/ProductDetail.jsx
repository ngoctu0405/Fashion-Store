import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./ProductDetail.module.css";

function ProductDetail() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === Number(productId));
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("Đen");
  const [stockNotice, setStockNotice] = useState("");

  if (!product) {
    return (
      <main className={styles.notFound}>
        <h1>Không tìm thấy sản phẩm</h1>
        <Link to="/products">Quay lại sản phẩm</Link>
      </main>
    );
  }

  const related = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 4);
  const stock = 12 + (product.id % 18);
  const changeQuantity = (nextValue) => {
    const parsedValue = Number(nextValue);
    if (!Number.isFinite(parsedValue) || parsedValue < 1) {
      setQuantity(1);
      return;
    }
    if (parsedValue > stock) {
      setQuantity(stock);
      setStockNotice(`Số lượng bạn chọn vượt tồn kho. Hệ thống đã điều chỉnh về ${stock} sản phẩm.`);
      return;
    }
    setQuantity(parsedValue);
    setStockNotice("");
  };
  const specifications = [
    ["Tình trạng", "CÒN HÀNG"],
    ["Thương hiệu", "ZANTUSTO"],
    ["Họa tiết", "Trơn"],
    ["Phong cách", "Cơ bản, chỉn chu"],
    ["Dáng cao", "Có"],
    ["Xuất xứ", "Việt Nam"],
    ["Độ dài tay", "Tay ngắn"],
    ["Dịp sử dụng", "Hằng ngày"],
    ["Kiểu dáng", "Ôm vừa"],
    ["Kiểu cổ", "Cổ cổ điển"],
    ["Kích cỡ lớn", "Không"],
    ["Tên nhà sản xuất", "Đang cập nhật"],
    ["Địa chỉ nhà sản xuất", "Đang cập nhật"],
    ["Sản phẩm tùy chỉnh", "Không"],
    ["Độ dài sản phẩm", "Dài vừa"],
    ["Chất liệu", "Vải Modal, 12% Modal 88% Polyester"],
    ["Gửi từ", "Thành phố Hồ Chí Minh"],
  ];
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("zantustoCart") || "[]");
    const existing = cart.find(
      (item) => item.id === product.id && item.color === color,
    );
    if (existing) existing.quantity += quantity;
    else cart.push({ ...product, color, quantity });
    localStorage.setItem("zantustoCart", JSON.stringify(cart));
    window.dispatchEvent(new Event("zantusto-cart-updated"));
  };
  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link to="/products">
          <ArrowLeft size={16} /> Tất cả sản phẩm
        </Link>
        <span>/</span>
        <span>{product.category}</span>
      </div>
      <section className={styles.productLayout}>
        <div className={styles.imagePanel}>
          <img src={product.image} alt={product.name} />
          {product.badge && <span>{product.badge}</span>}
        </div>
        <div className={styles.infoPanel}>
          <p className={styles.category}>{product.category}</p>
          <h1>{product.name}</h1>
          <div className={styles.price}>
            <strong>{product.price}</strong>
            {product.oldPrice && <del>{product.oldPrice}</del>}
            {product.badge && <span>{product.badge}</span>}
          </div>
          <section className={styles.shipping}>
            <h2>Giao hàng</h2>
            <p>
              <Truck size={18} />
              <b>Ngày mai trước 12:00</b> <span>(Đặt trước 08:00 hôm nay)</span>
            </p>
            <p>
              <Check size={18} />
              <b>Miễn phí vận chuyển 0₫</b>
            </p>
            <small>Nhận ưu đãi nếu đơn hàng giao trễ.</small>
          </section>
          <section className={styles.guarantee}>
            <h2>
              <ShieldCheck size={19} /> Đảm bảo mua sắm
            </h2>
            <p>
              Hàng chính hãng • Giao hàng miễn phí • Hỗ trợ đổi sản phẩm theo
              chính sách
            </p>
          </section>
          <div className={styles.selection}>
            <h2>Màu sắc</h2>
            <div>
              {["Đen", "Xám", "Xanh nhạt"].map((item) => (
                <button
                  key={item}
                  className={color === item ? styles.selectedColor : ""}
                  onClick={() => setColor(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.orderRow}>
            <div>
              <h2>Số lượng</h2>
              <p>Còn lại: {stock} sản phẩm</p>
            </div>
            <div className={styles.quantity}>
              <button
                onClick={() => changeQuantity(quantity - 1)}
              >
                <Minus size={25} />
              </button>
              <input aria-label="Số lượng sản phẩm" type="number" min="1" max={stock} value={quantity} onChange={(event) => changeQuantity(event.target.value)} />
              <button onClick={() => changeQuantity(quantity + 1)}>
                <Plus size={25} />
              </button>
            </div>
          </div>
          {stockNotice && <p className={styles.stockNotice} role="status">{stockNotice}</p>}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.addButton}
              onClick={addToCart}
            >
              Thêm vào giỏ
            </button>
            <button
              type="button"
              className={styles.buyButton}
              onClick={() => {
                addToCart();
                alert("Sản phẩm đã được thêm vào giỏ hàng.");
              }}
            >
              Mua ngay
            </button>
          </div>
        </div>
      </section>
      <section className={styles.specifications}>
        <h2>Thông tin sản phẩm</h2>
        <div>
          {specifications.map(([label, value]) => (
            <p key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </p>
          ))}
        </div>
      </section>
      <section className={styles.extra}>
        <article>
          <h2>Phối cùng ZANTUSTO</h2>
          <p>
            Khám phá những item được tuyển chọn kỹ lưỡng để dễ dàng kết hợp cùng
            nhau, từ trang phục đến phụ kiện. Hoàn thiện outfit theo phong cách
            hiện đại, tinh tế và hài hòa hơn, đồng thời tạo nên dấu ấn riêng cho
            từng khoảnh khắc của bạn.
          </p>
        </article>
        <article>
          <h2>Hướng dẫn bảo quản</h2>
          <ul>
            <li>Giặt riêng sản phẩm màu đậm trong lần giặt đầu tiên.</li>
            <li>
              Giặt tay hoặc chọn chế độ giặt nhẹ, dùng nước mát dưới 30°C.
            </li>
            <li>
              Không ngâm lâu, không dùng chất tẩy mạnh và tránh vắt xoắn sản
              phẩm.
            </li>
            <li>
              Phơi ở nơi thoáng mát, tránh ánh nắng gắt để giữ màu và form dáng.
            </li>
            <li>
              Ủi ở nhiệt độ thấp đến trung bình; kiểm tra nhãn hướng dẫn trước
              khi ủi.
            </li>
          </ul>
        </article>
      </section>
      <section className={styles.related}>
        <p>SẢN PHẨM CÙNG DANH MỤC</p>
        <h2>Có thể bạn cũng thích</h2>
        <div className={styles.grid}>
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;
