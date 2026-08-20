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
    <path d="M8 5.5 10.2 4h3.6L16 5.5l3 1.6-1.7 2.4H6.7L5 7.1 8 5.5Z" />
    <path d="M7 12h10l-.8 8H7.8L7 12Z" />
  </svg>
);

const CapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 14c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    <path d="M3 16.5h18c0 1.4-2.5 2.5-9 2.5s-9-1.1-9-2.5Z" />
    <path d="M12 6v2" />
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
              <>
                <button
                  className={styles.authBtn}
                  onClick={() => openAuthModal("login")}
                >
                  Đăng Nhập
                </button>
                <button
                  className={styles.authBtn}
                  onClick={() => openAuthModal("register")}
                >
                  Đăng Ký
                </button>
              </>
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
                  {productCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <NavLink
                        key={category.name}
                        to={category.path}
                        className={({ isActive }) =>
                          `${styles.productsDropdownItem} ${isActive ? styles.productsDropdownItemActive : ""}`
                        }
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
