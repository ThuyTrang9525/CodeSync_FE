"use client"

import { Link } from "react-router-dom"
import { Bell, Search, User } from "lucide-react"
import Logo from "../assets/image/Logo.jpg";

export default function Header() {
  return (
    <header className="header sticky-top bg-light shadow-sm">
      <div className="container py-3">
        <div className="row align-items-center">
          {/* Logo */}
          <div className="col-auto">
            <Link to="/" className="text-decoration-none">
              <img src={Logo} alt="TrackSmart Logo" className="header-logo" />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="col">
            <div className="position-relative">
              <Search className="search-icon" size={16} />
              <input type="text" placeholder="Search..." className="form-control search-input" />
            </div>
          </div>

          {/* Notifications and User Menu */}
          <div className="col-auto d-flex align-items-center gap-4">
            <div className="position-relative">
              <Bell className="text-muted" size={20} />
              <span className="notification-badge">2</span>
            </div>

            <div className="dropdown">
              <div
                className="avatar"
                role="button"
                id="userDropdown"
                onClick={() => {
                  const menu = document.getElementById("userDropdownMenu")
                  menu?.classList.toggle("show")
                }}
              >
                <User size={18} />
              </div>
              <ul className="dropdown-menu" id="userDropdownMenu">
                <li>
                  <Link className="dropdown-item" to="/student-profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>

            <button className="btn btn-primary">Log out</button>
          </div>
        </div>
      </div>
    </header>
  )
}