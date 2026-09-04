import { ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
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
          <Link className={styles.detailButton} to={`/products/${product.id}`}>Chi tiết <ArrowRight size={16} /></Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
