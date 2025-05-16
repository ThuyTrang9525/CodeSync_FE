// NotFoundPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = '404 - Page Not Found';
  }, []);

  return (
    <div className="notfound-container">
      <div className="animated-circle" />
      <div className="notfound-card">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-message">
          Oops! The page you're looking for can't be found.
        </p>
        <Link to="/" className="notfound-link">
          Go Back Home
        </Link>
      </div>
      {/* Inline CSS for animations */}
      <style>{`
        .notfound-container {
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
          font-family: 'Poppins', sans-serif;
        }
        .animated-circle {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          top: -150px;
          right: -150px;
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { transform: translateY(20px) scale(1.1); opacity: 0.5; }
        }
        .notfound-card {
          z-index: 1;
          text-align: center;
          padding: 60px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          max-width: 400px;
          width: 90%;
          animation: fadeInUp 1s ease-out;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .notfound-title {
          font-size: 100px;
          margin: 0;
          color: #333;
          line-height: 1;
        }
        .notfound-message {
          font-size: 18px;
          margin: 20px 0 30px;
          color: #555;
        }
        .notfound-link {
          display: inline-block;
          padding: 14px 28px;
          background: linear-gradient(135deg, #00bfa5, #00796b);
          color: #fff;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .notfound-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
