"use client";

import { useState, useEffect } from "react";
import NavBar from '../../components/Student/StudentNavBar';
import Header from "../../components/header";
import Footer from "../../components/footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { getUserNotifications } from '../../service/api';

export default function NotificationsTable() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState("All");
  const [openCalendar, setOpenCalendar] = useState(false);

  const receiverID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      getUserNotifications(receiverID)
        .then(({data}) => {
          if (data.status === "success") {
            setNotifications(data.data);
          } else {
            setError(data.message || "Failed to load notifications.");
          }
        })
        .catch((err) => {
          console.error("Error fetching notifications:", err);
          setError(err.message || "Failed to load notifications.");
        }).finally(() => {
          setLoading(false);
        });
    };

    fetchNotifications();
  }, []);

  const toggleCalendar = () => {
    setOpenCalendar(!openCalendar);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setOpenCalendar(false);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const formattedDate = date.toLocaleDateString();

  const filteredNotifications = notifications.filter((n) =>
    selectedClass === "All" || n.class_name === selectedClass
  );

  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      <Header />
      <NavBar />
      <div className="p-3 container my-3">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 position-relative">
          <h2 className="fs-4 fw-semibold mb-0">Recent announcements</h2>
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-outline-secondary" onClick={toggleCalendar}>
              <FaCalendarAlt />
            </button>

            {openCalendar && (
              <div className="position-absolute" style={{ zIndex: 999, top: '100%' }}>
                <DatePicker selected={date} onChange={handleDateChange} inline />
              </div>
            )}

            <div>
              <small>Selected Date: {formattedDate}</small>
            </div>
          </div>
        </div>

        <div className="table-responsive border rounded">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                {/* <th className="text-center" style={{ color: "#6c757d" }}>Name</th> */}
                <th className="text-center" style={{ color: "#6c757d" }}>Class</th>
                <th className="text-center" style={{ color: "#6c757d" }}>Content</th>
                <th className="text-center" style={{ color: "#6c757d" }}>Time</th>
                <th className="text-center" style={{ color: "#6c757d" }}></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5" className="text-center py-3">Loading notifications...</td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan="5" className="text-center text-danger py-3">Error: {error}</td>
                </tr>
              )}
              {!loading && !error && filteredNotifications.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-3">No notifications found.</td>
                </tr>
              )}
              {!loading && !error && filteredNotifications.map((notification) => (
                <tr key={notification.notificationID}>
                  {/* <td>{notification.name || "N/A"}</td> */}
                  <td className="text-danger fw-medium text-center">{notification.className || "N/A"}</td>
                  <td>{notification.content}</td>
                  <td className="text-center">
                    {notification.createdAt
                      ? new Date(notification.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-sm btn-outline-secondary btn-icon" title="Xem">
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger btn-icon" title="Xóa">
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-3">
          <div className="d-flex align-items-center gap-1">
            <button className="btn btn-primary btn-sm px-3">1</button>
            <button className="btn btn-outline-secondary btn-sm px-3">2</button>
            <button className="btn btn-outline-secondary btn-sm">Next</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
