import React, { useEffect, useState } from 'react';
import axios from 'axios';

const formatDateTime = (datetime) => {
  const date = new Date(datetime);
  return `${date.toLocaleDateString('vi-VN')} ${date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
};

const styles = {
  container: {
    padding: 20,
    maxWidth: 1200,
    margin: 'auto',
  },
  columns: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 24,
  },
  column: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#333',
  },
  cardBase: {
    padding: '16px 20px',
    marginBottom: 15,
    borderRadius: 10,
    color: '#000',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
  },
  read: {
    textDecoration: 'line-through',
    opacity: 0.5,
  },
  teacher: {
    backgroundColor: '#009688',
  },
  student: {
    backgroundColor: '#3BC50C',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.8,
  },
  check: {
    float: 'right',
    cursor: 'pointer',
    fontSize: 18,
    marginTop: -5,
  },
  noNoti: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    color: '#777',
  },
};

const NotificationsList = () => {
  const [studentNotifications, setStudentNotifications] = useState([]);
  const [teacherNotifications, setTeacherNotifications] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/admin/notifications')
      .then((res) => {
        const all = res.data;

        const students = all.filter(n => n.user?.role === 'STUDENT');
        const teachers = all.filter(n => n.user?.role === 'TEACHER');

        setStudentNotifications(students);
        setTeacherNotifications(teachers);
      })
      .catch((err) => console.error('Lỗi lấy thông báo:', err));
  }, []);

  const markAsRead = (id, listSetter) => {
    // Cập nhật UI trước
    listSetter(prev =>
      prev.map((n) =>
        n.notificationID === id ? { ...n, isRead: true } : n
      )
    );

    // Gửi request tới API
    axios
      .post(`http://127.0.0.1:8000/api/admin/notifications/${id}/read`)
      .then(() => console.log(`Đã đánh dấu ${id} là đã đọc`))
      .catch((err) => console.error('Lỗi khi cập nhật:', err));
  };

  const renderNotifications = (list, type, listSetter) => {
    if (list.length === 0) {
      return <div style={styles.noNoti}>Không có thông báo nào</div>;
    }

    return list.map((noti) => (
      <div
        key={noti.notificationID}
        style={{
          ...styles.cardBase,
          ...(type === 'STUDENT' ? styles.student : styles.teacher),
          ...(noti.isRead ? styles.read : {}),
        }}
      >
        <div style={styles.check} onClick={() => markAsRead(noti.notificationID, listSetter)}>
          <i className="fa-regular fa-circle-check" title="Đánh dấu đã đọc"></i>
        </div>
        <div style={styles.name}>{noti.user?.name || 'Không rõ'}</div>
        <div style={styles.text}>{noti.content}</div>
        <div style={styles.date}>{formatDateTime(noti.createdAt)}</div>
      </div>
    ));
  };

  return (
    <div style={styles.container}>
      <div style={styles.columns}>
        <div style={styles.column}>
          <div style={styles.title}>Student</div>
          {renderNotifications(studentNotifications, 'STUDENT', setStudentNotifications)}
        </div>
        <div style={styles.column}>
          <div style={styles.title}>Teacher</div>
          {renderNotifications(teacherNotifications, 'TEACHER', setTeacherNotifications)}
        </div>
      </div>
    </div>
  );
};

export default NotificationsList;
