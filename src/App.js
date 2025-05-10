// src/App.js
import './App.css';
import "./assets/css/Global.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes'; // Import routes từ routes.js

function App() {
  return (
    <Router>
      <div id="container">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;