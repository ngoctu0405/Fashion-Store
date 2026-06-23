import { useState } from 'react';
import styles from './Header.module.css';
import AuthModal from '../AuthModal/AuthModal';

const Header = () => {
  const [activeNavItem, setActiveNavItem] = useState('Trang Chủ');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const navItems = [
    { name: 'Trang Chủ', path: '/' },
    { name: 'Giới Thiệu', path: '/about' },
    { name: 'Sản Phẩm', path: '/products' },
    { name: 'Khuyến Mãi', path: '/promotions' },
  ];

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
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

        <div className={styles.authActions}>
          <button 
            className={styles.authBtn}
            onClick={() => openAuthModal('login')}
          >
            Đăng Nhập
          </button>
          <button 
            className={styles.authBtn}
            onClick={() => openAuthModal('register')}
          >
            Đăng Ký
          </button>
        </div>
      </div>

      <nav className={styles.navBar}>
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className={`${styles.navItem} ${activeNavItem === item.name ? styles.active : ''}`}
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
      />
    </header>
  );
};

export default Header;
