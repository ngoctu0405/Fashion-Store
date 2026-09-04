import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Search, ShoppingCart, Bell, User, Menu } from "lucide-react";
import styles from "./Header.module.css";
import AuthModal from "../AuthModal/AuthModal";
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
  const [activeNavItem, setActiveNavItem] = useState("Trang Chủ");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const productsMenuRef = useRef(null);
  const location = useLocation();
  const isProductsActive = location.pathname.startsWith("/products");

  const navItems = [
    { name: "Trang Chủ", path: "/" },
    { name: "Giới Thiệu", path: "/about" },
    { name: "Sản Phẩm", path: "/products", dropdown: true },
    { name: "Khuyến Mãi", path: "/promotions" },
  ];

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
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

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <img
            src={`/Name_Shop_Ko_Nen.png?v=${Date.now()}`}
            alt="Zantusto Logo"
            className={styles.logoImg}
          />
        </div>

        <div className={styles.topActionsGroup}>
          <div className={styles.iconActions}>
            <button className={styles.iconBtn} aria-label="Search">
              <Search size={22} strokeWidth={1.5} />
            </button>
            <button className={styles.iconBtn} aria-label="Cart">
              <ShoppingCart size={22} strokeWidth={1.5} />
            </button>
            <button className={styles.iconBtn} aria-label="Notifications">
              <Bell size={22} strokeWidth={1.5} />
            </button>
          </div>

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
              <button
                className={styles.authBtn}
                onClick={() => openAuthModal("login")}
              >
                Đăng Nhập / Đăng Ký
              </button>
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

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
      />
    </header>
  );
};

export default Header;
