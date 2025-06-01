"use client";

import { useState, useEffect } from "react";
import NavBar from '../../components/Teacher/TeacherNavBar'
import Header from "../../components/header";
import Footer from "../../components/footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { NotificationsByReceiver } from "../../service/api"

export default function NotificationsTable() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState(null);
  const [selectedClass, setSelectedClass] = useState("All");
  const [openCalendar, setOpenCalendar] = useState(false);
  const notificationsPerPage = 10;
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const filteredNotifications = notifications.filter((n) => {
      const matchesClass = selectedClass === "All" || n.className === selectedClass;

      const matchesDate = !date || new Date(n.createdAt).toDateString() === date.toDateString();

      return matchesClass && matchesDate;
    });

 const currentNotifications = filteredNotifications.slice(indexOfFirstNotification, indexOfLastNotification);
  const totalPages = Math.ceil(filteredNotifications.length / notificationsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

 const receiverID = localStorage.getItem("userID");
 console.log(receiverID);

  useEffect(() => {
  if (!receiverID) return;

  const loadNotifications = async () => {
    try {
      const data = await NotificationsByReceiver(receiverID);
      setNotifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  loadNotifications();
}, [selectedClass, date]);


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

  const formattedDate = date ? date.toLocaleDateString() : "All";

 return (
  <div className="d-flex flex-column min-vh-100 bg-light">
    <Header />
    <NavBar />

    <div className="container py-4">
      {/* Title & Filter Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="fs-4 fw-bold mb-1 d-flex align-items-center gap-2">
            {/* <FaBullhorn className="text-primary" /> */}
            Recent Announcements
          </h2>
          <p className="text-muted mb-0">Check updates and notices from your classes.</p>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          {/* Calendar Toggle */}
          <div className="position-relative">
            <button className="btn btn-outline-primary" onClick={toggleCalendar}>
              <FaCalendarAlt className="me-1" /> Date
            </button>

            {openCalendar && (
              <div className="position-absolute bg-white border rounded shadow p-2 mt-1" style={{ zIndex: 999 }}>
                <DatePicker selected={date} onChange={handleDateChange} inline />
              </div>
            )}
          </div>

          {/* Selected Date */}
          <div className="d-flex align-items-center">
            {date && (
              <>
                <small className="text-muted">Selected: {formattedDate}</small>
                <button
                  className="btn btn-sm btn-outline-danger ms-2"
                  onClick={() => setDate(null)}
                >
                  Clear
                </button>
              </>
            )}
          </div>

          {/* Class Filter */}
          <select
            className="form-select btn-outline-primary"
            value={selectedClass}
            onChange={handleClassChange}
            style={{ width: "150px" }}
          >
            <option value="All">All</option>
            <option value="TOEIC">TOEIC</option>
            <option value="SPEAKING">SPEAKING</option>
            <option value="IT ENGLISH">IT ENGLISH</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-responsive shadow-sm border rounded bg-white">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-primary">
            <tr>
              <th className="text-center fw-bold text-dark">Name</th>
              <th className="text-center fw-bold text-dark">Class</th>
              <th className="text-center fw-bold text-dark">Content</th>
              <th className="text-center fw-bold text-dark">Time</th>
              <th className="text-center fw-bold text-dark">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" className="text-center py-4">Loading announcements...</td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan="5" className="text-center text-danger py-4">Error: {error}</td>
              </tr>
            )}
            {!loading && !error && filteredNotifications.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">No announcements found.</td>
              </tr>
            )}
            {!loading && !error && currentNotifications.map((notification) => (
              <tr key={notification.id}>
                <td className="text-center">{notification.name || "N/A"}</td>
                <td className="text-center text-primary fw-semibold">{notification.className || "N/A"}</td>
                <td>{notification.content}</td>
                <td className="text-center">
                  {notification.createdAt
                    ? new Date(notification.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="text-center">
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-sm btn-outline-success" title="View">
                      <i className="bi bi-eye" />
                    </button>
                    <button className="btn btn-sm btn-outline-info" title="Comment">
                      <i className="bi bi-chat-square-text" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4 gap-2">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`btn btn-sm px-3 ${currentPage === pageNumber ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>

    <Footer />
  </div>
);

}
