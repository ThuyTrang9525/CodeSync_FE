import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Target, Edit, Menu, Settings, HelpCircle } from "lucide-react";

const navs = [
  {
    label: "Class",
    icon: <Home size={24} />,
    path: "/student-home",
    isLink: true,
  },
  {
    label: "Set Goal Sem",
    icon: <Target size={24} />,
    path: "/student-goal",
    isLink: true,
  },
  {
    label: "Learning Journal",
    icon: <Edit size={24} />,
    path: "/student-management",
    isLink: true,
  },
  {
    label: "Time table",
    icon: <Menu size={24} />,
    path: "/student-timetable",
    isLink: true,
  },
  {
    label: "Setting",
    icon: <Settings size={24} />,
    path: null,
    isLink: false,
  },
  {
    label: "Support",
    icon: <HelpCircle size={24} />,
    path: null,
    isLink: false,
  },
];

const StudentNavBar = () => {
  const location = useLocation();

  return (
    <div className="navbar">
      {navs.map((nav) => {
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
              <div className="nav-link nav-disabled">
                <div className="nav-icon">{nav.icon}</div>
                {nav.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StudentNavBar;