import React from 'react';
import { X } from 'lucide-react';
import styles from './ProfileModal.module.css';

const ProfileModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        
        <div className={styles.content}>
          <h2 className={styles.title}>Thông tin tài khoản</h2>
          <p className={styles.subtitle}>Xem lại thông tin cá nhân của bạn</p>
          
          <div className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>Họ và Tên</label>
                <input type="text" value={user.name || ''} readOnly disabled />
              </div>

              <div className={styles.inputGroup}>
                <label>Email</label>
                <input type="email" value={user.email || ''} readOnly disabled />
              </div>

              <div className={styles.inputGroup}>
                <label>Tên đăng nhập</label>
                <input type="text" value={user.username || user.name || ''} readOnly disabled />
              </div>

              <div className={styles.inputGroup}>
                <label>Số điện thoại</label>
                <input type="tel" value={user.phone || 'Chưa cập nhật'} readOnly disabled />
              </div>

              <div className={styles.inputGroup}>
                <label>Ngày sinh</label>
                <input 
                  type="text" 
                  value={user.birthday ? new Date(user.birthday).toLocaleDateString('vi-VN') : 'Chưa cập nhật'} 
                  readOnly 
                  disabled 
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Giới tính</label>
                <div className={styles.genderDisplay}>
                   {user.gender === 'male' ? 'Nam' : user.gender === 'female' ? 'Nữ' : 'Khác'}
                </div>
              </div>
            </div>

            <button className={styles.submitBtn}>Chỉnh sửa thông tin</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
