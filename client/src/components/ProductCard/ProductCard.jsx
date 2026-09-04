import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={product.image} alt={product.name} />
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
        <button className={styles.favorite} type="button" aria-label={`Thêm ${product.name} vào yêu thích`}><Heart size={19} /></button>
      </div>
      <div className={styles.content}>
        <p className={styles.category}>{product.category}</p>
        <h3>{product.name}</h3>
        <div className={styles.priceRow}><strong>{product.price}</strong>{product.oldPrice && <del>{product.oldPrice}</del>}</div>
        <div className={styles.actions}>
          <button className={styles.buyButton} type="button"><ShoppingBag size={16} /> Mua ngay</button>
          <button className={styles.detailButton} type="button">Chi tiết <ArrowRight size={16} /></button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
