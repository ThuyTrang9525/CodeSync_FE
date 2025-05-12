import React from "react";
import { Link } from "react-router-dom";
import { Home, Target, Edit, Menu, Settings, HelpCircle } from "lucide-react";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="nav-item active">
            <Link to="/student-home" className="nav-link">
                <div className="nav-icon">
                    <Home size={24} />
                </div>
                Class
            </Link>
            </div>
            <div className="nav-item">
                <Link to="/student-goal" className="nav-link">
                    <div className="nav-icon">
                        <Target size={24} />
                    </div>
                    Set Goal Sem
                </Link>
            </div>
            <div className="nav-item">
                <Link to="/student-management" className="nav-link">
                    <div className="nav-icon">
                        <Edit size={24} />
                    </div>
                    Learning Journal
                </Link>
            </div>
            <div className="nav-item">
                <div className="nav-icon">
                    <Menu size={24} />
                </div>
                Time table
            </div>
            <div className="nav-item">
                <div className="nav-icon">
                    <Settings size={24} />
                </div>
                Setting
            </div>
            <div className="nav-item">
                <div className="nav-icon">
                    <HelpCircle size={24} />
                </div>
                Support
            </div>
        </div>
    );
};

export default Navbar;