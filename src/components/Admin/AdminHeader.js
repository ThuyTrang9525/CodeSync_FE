import React, { Component } from 'react';
import axios from 'axios';
import logo from '../../assets/image/Logo.jpg';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
    borderRadius: '16px',
    margin: '20px',
    fontFamily: "'Segoe UI', sans-serif",
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  brandName: {
    fontSize: '40px',
    fontWeight: 700,
    color: '#2c3e50',
    margin: 0,
  },
  logoutBtn: {
    backgroundColor: '#009688',
    color: '#fff',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
  logoutBtnHover: {
    backgroundColor: '#04756a',
    transform: 'scale(1.05)',
  },
};

export default class Header extends Component {
  state = {
    isHovering: false,
  };

  componentDidMount() {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = 'http://127.0.0.1:8000';
  }

  handleLogout = async () => {
    try {
      await axios.get('/sanctum/csrf-cookie');
      await axios.post('/api/admin/logout');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  render() {
    const { isHovering } = this.state;

    return (
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <img src={logo} alt="Logo" height={60} />
          <h1 style={styles.brandName}>TrackSmart</h1>
        </div>
        <button
          style={{
            ...styles.logoutBtn,
            ...(isHovering ? styles.logoutBtnHover : {}),
          }}
          onMouseEnter={() => this.setState({ isHovering: true })}
          onMouseLeave={() => this.setState({ isHovering: false })}
          onClick={this.handleLogout}
        >
          Log out
        </button>
      </header>
    );
  }
}
