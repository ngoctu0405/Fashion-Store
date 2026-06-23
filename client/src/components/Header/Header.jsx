import { useState } from "react";
import { Search, ShoppingCart, Bell, User, Menu } from "lucide-react";
import styles from "./Header.module.css";
import AuthModal from "../AuthModal/AuthModal";
import ProfileModal from "../ProfileModal/ProfileModal";

const Header = () => {
  const [activeNavItem, setActiveNavItem] = useState("Trang Chủ");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const navItems = [
    { name: "Trang Chủ", path: "/" },
    { name: "Giới Thiệu", path: "/about" },
    { name: "Sản Phẩm", path: "/products" },
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
                    <span className={styles.userName}>Hi , {user.name}</span>
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
                          Hi , {user.name}
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
                          Thông tin tài khoản
                        </button>
                      </li>
                      <li>
                        <button className={styles.dropdownItem}>
                          Lịch sử mua hàng
                        </button>
                      </li>
                      <li>
                        <button className={styles.dropdownItem}>
                          Mã giảm giá
                        </button>
                      </li>
                      <li>
                        <button className={styles.dropdownItem}>
                          Đổi mật khẩu
                        </button>
                      </li>
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
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className={`${styles.navItem} ${activeNavItem === item.name ? styles.active : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveNavItem(item.name);
            }}
          >
            {item.name}
          </a>
        ))}
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
