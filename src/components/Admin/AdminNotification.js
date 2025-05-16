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

// Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const paginationButtonStyle = (isActive) => ({
    width: '60px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
    borderRadius: '4px',
    margin: '0 5px',
    cursor: 'pointer',
    backgroundColor: isActive ? '#00796b' : 'white',
    color: isActive ? 'white' : '#333',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'all 0.2s ease',
  });

  const navButtonStyle = {
    ...paginationButtonStyle(false),
    width: '80px',
  };

  const disabledStyle = {
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <div 
        style={{ 
          ...navButtonStyle, 
          ...(currentPage === 1 ? disabledStyle : {}) 
        }}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        Prev
      </div>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <div
          key={page}
          style={paginationButtonStyle(page === currentPage)}
          onClick={() => onPageChange(page)}
        >
          {page}
        </div>
      ))}
      
      <div 
        style={{ 
          ...navButtonStyle, 
          ...(currentPage === totalPages ? disabledStyle : {}) 
        }}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
      >
        Next
      </div>
    </div>
  );
};

const NotificationsList = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5; // Số thông báo mỗi trang

  const fetchNotifications = (page) => {
    // Thêm tham số page vào URL API
    axios.get(`http://127.0.0.1:8000/api/admin/notifications?page=${page}&limit=${itemsPerPage}`)
      .then(response => {
        // Nếu API hỗ trợ phân trang, sử dụng dữ liệu từ API
        if (response.data.pagination) {
          setNotifications(response.data.items.map(noti => ({ 
            ...noti, 
            type: noti.user.role 
          })));
          setTotalPages(response.data.pagination.totalPages);
        } else {
          // Nếu API không hỗ trợ phân trang, thực hiện phân trang ở client
          const filtered = response.data
            .filter(noti => {
              const role = noti.user?.role;
              return role === 'STUDENT' || role === 'TEACHER';
            })
            .map(noti => ({ ...noti, type: noti.user.role }));
          
          // Tính tổng số trang
          const total = Math.ceil(filtered.length / itemsPerPage);
          setTotalPages(total);
          
          // Lấy dữ liệu cho trang hiện tại
          const startIndex = (page - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          setNotifications(filtered.slice(startIndex, endIndex));
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy thông báo:', error);
      });
  };

  useEffect(() => {
    fetchNotifications(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Cuộn lên đầu danh sách khi chuyển trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        <>
          {notifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>Không có thông báo nào</div>
          ) : (
            notifications.map(noti => (
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
            ))
          )}
          
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
    </div>
  );
};

export default NotificationsList;