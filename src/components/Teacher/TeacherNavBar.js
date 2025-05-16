import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Target, Edit, Menu, Settings, HelpCircle } from "lucide-react";

const navs = [
  {
    label: "Class",
    icon: <Home size={24} />,
    path: "/teacher-home",
    isLink: true,
  },
  {
    label: "Timetable",
    icon: <Target size={24} />,
    path: "/timetable",
    isLink: true,
  },
  {
    label: "Notification",
    icon: <Edit size={24} />,
    path: "/teacher-notification",
    isLink: true,
  },
  {
    label: "Support",
    icon: <Menu size={24} />,
    path: "/support",
    isLink: false,
  }
];

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar">
      {navs.map((nav, idx) => {
        const isActive = nav.path && location.pathname === nav.path;
        return (
          <div
            className={`nav-item${isActive ? " active" : ""}`}
            key={nav.label}
          >
            {nav.isLink && nav.path ? (
              <Link to={nav.path} className="nav-link">
                <div className="nav-icon">{nav.icon}</div>
                {nav.label}
              </Link>
            ) : (
              <>
                <div className="nav-icon">{nav.icon}</div>
                {nav.label}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Navbar;