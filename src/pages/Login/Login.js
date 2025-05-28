
import React, { useState } from "react";
import '../../assets/css/Login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/api";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT"); // Hoặc "teacher"
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(email, password, role); // <-- dùng service
      const userRole = response.data.user.role;
      const token = response.data.access_token;
      const user = response.data.user.userID;
      localStorage.setItem('token', token);
      localStorage.setItem("userID", user);
      localStorage.setItem("email",email);

      if (userRole === "TEACHER") {
        navigate(`/teacher-home`);
      } else if (userRole === "STUDENT") {
        navigate(`/student-home`);
      } else if (userRole === "ADMIN") {
        navigate(`/admin-dashboard`);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login failed. Please try again.");
      } else if (err.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };



  return (
    <div className="login-container">
      <div className="background-elements">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
      </div>
      <div className="login-card-wrapper">
        <div className="login-card">
          <div className="card-accent"></div>
          <div className="card-content">
            <div className="card-header">
              <h1 className="title">Welcome back</h1>
              <p className="subtitle">Sign in to your account to continue</p>
            </div>

            {/* Hiển thị lỗi */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
              </div>

              <div className="form-group-sl">
                <label className="form-label">Role</label>
                <select
                  className="form-input-sl"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="STUDENT">Student</option>
                  <option value="TEACHER">Teacher</option>
                  <option value="ADMIN">Admin</option>

                </select>
              </div>

              <button type="submit" className="login-button">
                <span className="button-content">
                  <span>Sign in</span>
                </span>
              </button>
            </form>
          </div>
        </div>
        <div className="decorative-orb orb-1"></div>
        <div className="decorative-orb orb-2"></div>
      </div>
    </div>
  );
}

export default LoginPage;
