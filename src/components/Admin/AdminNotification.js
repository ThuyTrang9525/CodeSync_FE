import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Format ngày giờ dd/mm/yyyy hh:mm
const formatDateTime = (datetime) => {
  const date = new Date(datetime);
  return `${date.toLocaleDateString('vi-VN')} ${date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
};

// Style theo loại thông báo, phân biệt teacher và student
const getStyle = (type, isRead) => {
  const baseStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 20px',
    borderRadius: '10px',
    margin: '10px auto',
    width: '90%',
    maxWidth: '100%',
    minHeight: '100px',
    color: 'white',
    fontWeight: '600',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
    fontSize: '16px',
    letterSpacing: '0.5px',
    opacity: isRead ? 0.6 : 1, // làm mờ nếu đã đọc
    cursor: 'default',
  };

  const typeStyles = {
    TEACHER: { backgroundColor: '#009688'}, // xanh dương đậm
    STUDENT: { backgroundColor: '#3BC50C' }, // vàng cam
  };

  return { ...baseStyle, ...(typeStyles[type] || typeStyles.STUDENT) };
};

const checkMarkStyle = (isRead) => ({
  fontSize: '20px',
  fontWeight: 'bold',
  color: isRead ? '#fff' : '#000',
  userSelect: 'none',
  cursor: isRead ? 'default' : 'pointer',
});

const NotificationsList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/admin/notifications')
      .then(response => {
        // Lọc chỉ lấy thông báo của STUDENT hoặc TEACHER
        const filtered = response.data
          .filter(noti => {
            const role = noti.user?.role;
            return role === 'STUDENT' || role === 'TEACHER';
          })
          // map type = role để dùng style
          .map(noti => ({ ...noti, type: noti.user.role }));
        setNotifications(filtered);
      })
      .catch(error => {
        console.error('Lỗi khi lấy thông báo:', error);
      });
  }, []);

  const markAsRead = (notificationID, isAlreadyRead) => {
    if (isAlreadyRead) return;

    // Cập nhật trạng thái ở client
    setNotifications(prev =>
      prev.map(noti =>
        noti.notificationID === notificationID ? { ...noti, isRead: true } : noti
      )
    );

    // Gửi request cập nhật backend
    axios.post(`http://127.0.0.1:8000/api/notifications/${notificationID}/read`)

      .then(() => {
        console.log(`Notification ${notificationID} marked as read in backend`);
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật trạng thái đã đọc:', error);
        // Có thể rollback lại state nếu muốn
      });
  };

  return (
    <div>
      {notifications.map(noti => (
        <div
          key={noti.notificationID}
          style={getStyle(noti.type, noti.isRead)}
        >
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {noti.user?.name || 'Không rõ'}
            </div>
            <div style={{ fontSize: '14px', fontWeight: 'normal', margin: '4px 0' }}>
              {noti.content}
            </div>
            <div style={{ fontSize: '12px', fontStyle: 'italic' }}>
              {formatDateTime(noti.createdAt)}
            </div>
          </div>

          <div
            style={checkMarkStyle(noti.isRead)}
            onClick={() => markAsRead(noti.notificationID, noti.isRead)}
            title={noti.isRead ? 'Đã đọc' : 'Đánh dấu là đã đọc'}
          >
            <i className="fa-regular fa-circle-check"></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsList;
