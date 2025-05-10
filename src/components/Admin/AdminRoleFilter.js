import React, { useState } from 'react';

const RoleFilter = ({ onFilterChange, defaultRole = 'all', className = '' }) => {
  const [activeRole, setActiveRole] = useState(defaultRole);

  const handleRoleChange = (role) => {
    setActiveRole(role);
    if (onFilterChange) {
      onFilterChange(role);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div className={`${className}`} style={styles.containers}>
        <button
          onClick={() => handleRoleChange('all')}
          style={activeRole === 'all' ? styles.activeButton : styles.inactiveButton}
        >
          All
        </button>
        <button
          onClick={() => handleRoleChange('student')}
          style={activeRole === 'student' ? styles.activeButton : styles.inactiveButton}
        >
          Student
        </button>
        <button
          onClick={() => handleRoleChange('teacher')}
          style={activeRole === 'teacher' ? styles.activeButton : styles.inactiveButton}
        >
          Teacher
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    maxWidth: '220px',     // Giới hạn chiều rộng
    width: '100%',
  },
  containers: {
    display: 'flex',
    borderRadius: '9999px',
    backgroundColor: '#e2e8f0',
    padding: '4px',
  },
  activeButton: {
    padding: '8px 16px',
    borderRadius: '9999px',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: '#00796b',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  inactiveButton: {
    padding: '8px 16px',
    borderRadius: '9999px',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: '#4b5563',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default RoleFilter;
