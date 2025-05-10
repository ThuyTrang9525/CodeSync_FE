import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavAdmin() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className={`nav-item ${isActive('/admin-dashboard') ? 'active' : ''}`}>
          <Link to="/admin-dashboard" className="nav-link">Dashboard</Link>
        </li>
        <li className={`nav-item ${isActive('/admin-user') ? 'active' : ''}`}>
          <Link to="/admin-user" className="nav-link">User</Link>
        </li>
        <li className={`nav-item ${isActive('/admin-class') ? 'active' : ''}`}>
          <Link to="/admin-class" className="nav-link">Class</Link>
        </li>
        <li className={`nav-item ${isActive('/admin-notification') ? 'active' : ''}`}>
          <Link to="/admin-notification" className="nav-link">Notification</Link>
        </li>
        <li className={`nav-item ${isActive('/admin/report') ? 'active' : ''}`}>
          <Link to="/admin/report" className="nav-link">Report</Link>
        </li>
      </ul>
    </nav>
  );
}
