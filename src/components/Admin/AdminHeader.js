// Header.jsx
import React, { Component } from 'react';
import axios from 'axios';
import logo from '../../assets/image/Logo.jpg';

export default class Header extends Component {
  componentDidMount() {
    // Enable sending cookies for CSRF if using cookie-based auth
    axios.defaults.withCredentials = true;
    // Set base URL if you want
    axios.defaults.baseURL = 'http://127.0.0.1:8000';
  }

  handleLogout = async () => {
    try {
      // If using cookie-based Sanctum:
      await axios.get('/sanctum/csrf-cookie');
      
      // Now call logout endpoint
      await axios.post('/api/admin/logout');

      // If you stored token in localStorage (token-based), remove it
      localStorage.removeItem('token');

      // Redirect to login page
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
      // Optionally, fallback to clearing local token and redirecting
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  render() {
    return (
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
          <h6 className="brand-name">TrackSmart</h6>
        </div>
        <button className="logout-btn" onClick={this.handleLogout}>
          Log out
        </button>
      </header>
    );
  }
}