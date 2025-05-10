import React from 'react';

const getStyle = (type) => {
  const baseStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 20px',
    borderRadius: '10px',
    margin: '10px auto',
    width: '90%',
    maxWidth: '100%',
    height: '100px',
    color: 'white',
    fontWeight: '600',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
    fontSize: '16px',
    letterSpacing: '0.5px',
    transition: 'transform 0.3s ease',
    transform: 'translateY(0)',
  };

  const typeStyles = {
    success: { backgroundColor: '#2ecc71', borderLeft: '6px solid #27ae60' },
    error: { backgroundColor: '#e74c3c', borderLeft: '6px solid #c0392b' },
    warning: { backgroundColor: '#f39c12', borderLeft: '6px solid #e67e22' },
    info: { backgroundColor: '#3498db', borderLeft: '6px solid #009688' },
  };

  return { ...baseStyle, ...typeStyles[type] };
};

const Notification = ({ type = 'info', message }) => {
  return (
    <div style={getStyle(type)}>
      <div>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Doan Minh Hoang</div>
        <div style={{ fontSize: '14px', fontWeight: 'normal', marginTop: '4px', color: '#dfe6e9' }}> Chinh sua Admin</div>
      </div>
      <span style={{ marginLeft: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
        &times;
      </span>
    </div>
  );
};

export default Notification;
