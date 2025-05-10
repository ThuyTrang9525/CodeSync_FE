import React from 'react';

const CustomButton = ({ icon, text, onClick }) => {
  return (
    <button onClick={onClick} style={styles.button}>
      {icon && <span style={styles.icon}>{icon}</span>}
      {text}
    </button>
  );
};

const styles = {
  button: {
    marginTop: '20px',
    backgroundColor: '#009688',
    color: 'white',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    cursor: 'pointer',
  },
  icon: {
    marginRight: '8px',
    display: 'flex',
    alignItems: 'center',
  },
};

export default CustomButton;
