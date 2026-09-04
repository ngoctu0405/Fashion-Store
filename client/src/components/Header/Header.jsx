import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Search, ShoppingCart, Bell, User, Menu, Minus, Plus, Trash2, X } from "lucide-react";
import styles from "./Header.module.css";
import ProfileModal from "../ProfileModal/ProfileModal";

const ShirtIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 4.5 10.2 3h3.6L16 4.5l4 2.2-2.2 3.1-1.8-.8V20H8V9l-1.8.8L4 6.7 8 4.5Z" />
  </svg>
);

const ShortsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 7h14l-1.2 11H13l-1-5.5-1 5.5H6.2L5 7Z" />
    <path d="M5 7h14" />
  </svg>
);

const OutfitIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 4a2 2 0 0 1 2 2c0 1.2-.8 1.7-1.8 2.4l-5.4 3.8a2.4 2.4 0 0 0 1.4 4.4h7.6" />
    <path d="m12.2 8.4 5 3.6a2.4 2.4 0 0 1-1.4 4.4H8.2" />
    <path d="M7.5 16.4h9" />
  </svg>
);

const CapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="7.5" cy="13" r="3.5" />
    <circle cx="16.5" cy="13" r="3.5" />
    <path d="M11 13h2M4 12.4l-1.5-1.1M20 12.4l1.5-1.1" />
  </svg>
);

const AllProductsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="4" width="6" height="6" rx="1" />
    <rect x="14" y="4" width="6" height="6" rx="1" />
    <rect x="4" y="14" width="6" height="6" rx="1" />
    <rect x="14" y="14" width="6" height="6" rx="1" />
  </svg>
);

const productCategories = [
  { name: "Mẫu Áo", path: "/products/ao", icon: ShirtIcon },
  { name: "Mẫu Quần", path: "/products/quan", icon: ShortsIcon },
  { name: "Set Đồ", path: "/products/set", icon: OutfitIcon },
  { name: "Phụ Kiện", path: "/products/phu-kien", icon: CapIcon },
];

const getDisplayName = (fullName) => {
  if (!fullName) return "";
  if (fullName.length > 10) {
    const parts = fullName.trim().split(/\s+/);
    return parts[parts.length - 1]; // Lấy tên gọi chính (từ cuối cùng) nếu tên quá dài (> 10 ký tự)
  }
  return fullName;
};

const Header = () => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("zantustoUser")) || null;
    } catch {
      return null;
    }
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("zantustoCart") || "[]"));
  const productsMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isProductsActive = location.pathname.startsWith("/products");

  const navItems = [
    { name: "Trang Chủ", path: "/" },
    { name: "Giới Thiệu", path: "/about" },
    { name: "Sản Phẩm", path: "/products", dropdown: true },
    { name: "Khuyến Mãi", path: "/promotions" },
  ];

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("zantustoUser");
    localStorage.removeItem("zantustoToken");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOpenProfile = () => {
    setIsProfileModalOpen(true);
    setIsDropdownOpen(false);
  };

  const toggleProductsMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsProductsMenuOpen((open) => !open);
  };

  const saveCart = (nextCart) => {
    setCart(nextCart);
    localStorage.setItem("zantustoCart", JSON.stringify(nextCart));
  };
  const updateQuantity = (id, change) => saveCart(cart.map((item) => item.id === id ? { ...item, quantity: item.quantity + change } : item).filter((item) => item.quantity > 0));
  const submitSearch = (event) => {
    event.preventDefault();
    const value = searchQuery.trim();
    navigate(value ? `/products?search=${encodeURIComponent(value)}` : "/products");
    setActivePanel(null);
  };

  useEffect(() => {
    if (!isProductsMenuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!productsMenuRef.current?.contains(event.target)) {
        setIsProductsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isProductsMenuOpen]);

  useEffect(() => {
    setIsProductsMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const refreshCart = () => setCart(JSON.parse(localStorage.getItem("zantustoCart") || "[]"));
    window.addEventListener("zantusto-cart-updated", refreshCart);
    return () => window.removeEventListener("zantusto-cart-updated", refreshCart);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <img
            src="/Name_Shop_Ko_Nen.png"
            alt="ZANTUSTO Logo"
            className={styles.logoImg}
          />
        </div>

        <div className={styles.topActionsGroup}>
          <div className={styles.iconActions}>
            <button className={styles.iconBtn} onClick={() => setActivePanel(activePanel === "search" ? null : "search")} aria-label="Tìm kiếm">
              <Search size={22} strokeWidth={1.5} />
            </button>
            {activePanel === "search" && <form className={styles.searchExpand} onSubmit={submitSearch}><input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Tìm sản phẩm..." /><button type="submit">Tìm</button></form>}
            <button className={styles.iconBtn} onClick={() => setActivePanel(activePanel === "cart" ? null : "cart")} aria-label="Giỏ hàng">
              <ShoppingCart size={22} strokeWidth={1.5} />
              {cart.length > 0 && <span className={styles.counter}>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>}
            </button>
            <button className={styles.iconBtn} onClick={() => setActivePanel(activePanel === "notifications" ? null : "notifications")} aria-label="Thông báo">
              <Bell size={22} strokeWidth={1.5} />
            </button>
          </div>
          {activePanel && activePanel !== "search" && <div className={styles.actionPanel}>
            <button className={styles.panelClose} onClick={() => setActivePanel(null)} aria-label="Đóng"><X size={17} /></button>
            {activePanel === "notifications" && <><strong>Thông báo</strong><p className={styles.notice}>Ưu đãi mới đang chờ bạn tại trang Khuyến mãi.</p><p className={styles.notice}>Sản phẩm yêu thích đã có sẵn để bạn khám phá.</p></>}
            {activePanel === "cart" && <><strong>Giỏ hàng ({cart.reduce((sum, item) => sum + item.quantity, 0)})</strong>{cart.length === 0 ? <p className={styles.empty}>Giỏ hàng của bạn đang trống.</p> : <><div className={styles.cartItems}>{cart.map((item) => <div className={styles.cartItem} key={item.id}><img src={item.image} alt="" /><div><b>{item.name}</b><small>{item.price}</small><span><button onClick={() => updateQuantity(item.id, -1)}><Minus size={13} /></button>{item.quantity}<button onClick={() => updateQuantity(item.id, 1)}><Plus size={13} /></button></span></div><button className={styles.removeItem} onClick={() => saveCart(cart.filter((cartItem) => cartItem.id !== item.id))}><Trash2 size={15} /></button></div>)}</div><button className={styles.checkout} onClick={() => alert("Chức năng thanh toán sẽ được cập nhật sớm.")}>Tiến hành thanh toán</button></>}</>}
          </div>}

          <div className={styles.authActions}>
            {user ? (
              <div className={styles.userContainer}>
                <div className={styles.userProfile}>
                  <div className={styles.userInfo}>
                    <User size={24} strokeWidth={1.5} />
                    <span className={styles.userName}>Xin chào, {getDisplayName(user.name)}</span>
                  </div>
                  <div className={styles.menuIcon} onClick={toggleDropdown}>
                    <Menu size={28} strokeWidth={1.5} />
                  </div>
                </div>

                {isDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownHeader}>
                      <div className={styles.userInfo}>
                        <User size={24} strokeWidth={1.5} />
                        <span className={styles.userName}>
                          Xin chào, {getDisplayName(user.name)}
                        </span>
                      </div>
                      <div
                        className={styles.menuIconOpen}
                        onClick={toggleDropdown}
                      >
                        <Menu size={28} strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className={styles.divider}></div>
                    <ul className={styles.dropdownList}>
                      <li>
                        <button
                          className={styles.dropdownItem}
                          onClick={handleOpenProfile}
                        >
                          Quản lý thông tin
                        </button>
                      </li>
                      <li>
                        <button className={styles.dropdownItem}>
                          Đổi mật khẩu
                        </button>
                      </li>
                      <li>
                        <button className={styles.dropdownItem}>
                          Lịch sử đơn hàng
                        </button>
                      </li>
                      <li>
                        <button className={styles.dropdownItem}>
                          Mã giảm giá
                        </button>
                      </li>
                    </ul>
                    <div className={styles.divider}></div>
                    <ul className={styles.dropdownList}>
                      <li>
                        <button
                          className={`${styles.dropdownItem} ${styles.logoutBtn}`}
                          onClick={handleLogout}
                        >
                          Đăng Xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <NavLink className={styles.authBtn} to="/auth?mode=login">
                Đăng Nhập / Đăng Ký
              </NavLink>
            )}
          </div>
        </div>
      </div>

      <nav className={styles.navBar}>
        {navItems.map((item) =>
          item.dropdown ? (
            <div
              key={item.name}
              className={`${styles.productsNav} ${isProductsMenuOpen ? styles.productsNavOpen : ""}`}
              ref={productsMenuRef}
            >
              <button
                type="button"
                className={`${styles.navItem} ${styles.navItemWithMenu} ${isProductsActive || isProductsMenuOpen ? styles.active : ""}`}
                onClick={toggleProductsMenu}
                aria-expanded={isProductsMenuOpen}
                aria-haspopup="true"
              >
                {item.name}
                <Menu
                  className={styles.navMenuIcon}
                  size={22}
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
              </button>
              {isProductsMenuOpen && (
                <div className={styles.productsDropdown}>
                  <NavLink
                    to="/products"
                    end
                    className={styles.productsDropdownItem}
                  >
                    <span className={styles.productsDropdownIcon}><AllProductsIcon /></span>
                    <span>Tất cả sản phẩm</span>
                  </NavLink>
                  <div className={styles.dropdownDivider} />
                  {productCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <NavLink
                        key={category.name}
                        to={category.path}
                        className={styles.productsDropdownItem}
                      >
                        <span className={styles.productsDropdownIcon}>
                          <Icon />
                        </span>
                        <span>{category.name}</span>
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
            >
              {item.name}
            </NavLink>
          )
        )}
      </nav>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
      />
    </header>
  );
};

export default Header;
