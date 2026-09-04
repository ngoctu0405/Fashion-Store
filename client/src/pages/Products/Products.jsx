import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import styles from "./Products.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { products } from "../../data/products";

const collections = [
  { name: "Mẫu Áo", path: "/products/ao" },
  { name: "Mẫu Quần", path: "/products/quan" },
  { name: "Set Đồ", path: "/products/set" },
  { name: "Phụ Kiện", path: "/products/phu-kien" },
];

function Products() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const selected = collections.find(
    (collection) => pathname === collection.path,
  );
  const searchTerm = searchParams.get("search")?.trim().toLowerCase() || "";
  const categoryProducts = selected
    ? products.filter((product) => product.category === selected.name)
    : products;
  const filteredProducts = categoryProducts.filter((product) =>
    `${product.name} ${product.category}`.toLowerCase().includes(searchTerm),
  );
  const pageCount = Math.ceil(filteredProducts.length / 12);
  const currentPage = Math.min(
    Math.max(Number(searchParams.get("page")) || 1, 1),
    Math.max(pageCount, 1),
  );
  const shownProducts = filteredProducts.slice(
    (currentPage - 1) * 12,
    currentPage * 12,
  );
  const pageUrl = (page) => `${selected?.path ?? "/products"}?page=${page}`;

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p>
            <Sparkles size={15} /> BỘ SƯU TẬP ZANTUSTO
          </p>
          <h1>{selected?.name ?? "Tất cả sản phẩm"}</h1>
          <span>
            Khám phá những thiết kế và phụ kiện được chọn lọc để hoàn thiện
            phong cách riêng của bạn.
          </span>
        </div>
        <span className={styles.heroWord}>Z</span>
      </header>
      <section className={styles.catalog}>
        <div className={styles.catalogHeader}>
          <div>
            <p className={styles.eyebrow}>Khám phá theo phong cách</p>
          </div>
        </div>
        <nav className={styles.categoryTabs} aria-label="Danh mục sản phẩm">
          <Link className={!selected ? styles.selectedTab : ""} to="/products">
            Tất cả
          </Link>
          {collections.map((item) => (
            <Link
              className={pathname === item.path ? styles.selectedTab : ""}
              key={item.path}
              to={item.path}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className={styles.collectionGrid}>
          {shownProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {searchTerm && <p className={styles.resultCount}>Kết quả tìm kiếm cho “{searchParams.get("search")}”: {filteredProducts.length} sản phẩm</p>}
        {pageCount > 1 && (
          <nav className={styles.pagination} aria-label="Phân trang sản phẩm">
            {Array.from({ length: pageCount }, (_, index) => (
              <Link
                className={currentPage === index + 1 ? styles.currentPage : ""}
                key={index + 1}
                to={pageUrl(index + 1)}
              >
                {index + 1}
              </Link>
            ))}
          </nav>
        )}
      </section>
      <section className={styles.bottomCta}>
        <ShoppingBag aria-hidden="true" />
        <div>
          <p className={styles.eyebrow}>Tìm kiếm điều riêng biệt?</p>
          <h2>Phong cách của bạn bắt đầu từ một lựa chọn nhỏ.</h2>
        </div>
        <Link to="/about">
          Câu chuyện ZANTUSTO <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}

export default Products;
