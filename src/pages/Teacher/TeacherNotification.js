"use client"

import { useState } from "react"
import Navigation from '../../components/Teacher/TeacherNavigation';
import Header from "../../components/header"
import Footer from "../../components/footer"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa"; 

const notifications = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    class: "PNV26B",
    content: "I don't understand",
    time: "29/9/2023",
  },
  {
    id: 2,
    name: "Nguyễn Văn A",
    class: "PNV26B",
    content: "I don't understand",
    time: "29/9/2023",
  },
  {
    id: 3,
    name: "Nguyễn Văn A",
    class: "PNV26B",
    content: "I got it",
    time: "29/9/2023",
  },
  {
    id: 4,
    name: "Nguyễn Văn A",
    class: "PNV26B",
    content: "I got it",
    time: "29/9/2023",
  },
  {
    id: 5,
    name: "Nguyễn Văn A",
    class: "PNV26B",
    content: "I don't understand",
    time: "29/9/2023",
  },
  {
    id: 6,
    name: "Nguyễn Văn A",
    class: "PNV26B",
    content: "I got it",
    time: "29/9/2023",
  },
  {
    id: 7,
    name: "Nguyễn Văn A",
    class: "PNV26B",
    content: "I got it",
    time: "29/9/2023",
  },
  {
    id: 8,
    name: "Nguyễn Văn A",
    class: "PNV26B",
    content: "I don't understand",
    time: "29/9/2023",
  },
  {
    id: 9,
    name: "Nguyễn Văn A",
    class: "PNV26B",
    content: "I don't understand",
    time: "29/9/2023",
  },
]

export default function NotificationsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState("All");
  const [openCalendar, setOpenCalendar] = useState(false);

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
  

  return (
    <div className="bg-white">
      <Header />
      <Navigation />
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 position-relative">
        <h2 className="fs-4 fw-semibold mb-0">Recent announcements</h2>
        <div className="d-flex align-items-center gap-2">
        <button className="btn btn-outline-secondary" onClick={toggleCalendar}>
        <FaCalendarAlt />
        </button>

        {openCalendar && (
          <div className="position-absolute"
            style={{
              zIndex: 999,
              top: '100%', 
            }}>
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              inline
            />
          </div>
          
        )}
        <div className="">
          <h10>Selected Date: {formattedDate}</h10>
        </div>
        
        <select
          className="form-select"
          value={selectedClass}
          onChange={handleClassChange}
          style={{ width: "120px" }}
        >
          <option value="All">All</option>
          <option value="PNV26B">PNV26B</option>
          <option value="PNV25A">PNV25A</option>
        </select>
        </div>
      </div>

      <div className="table-responsive border rounded">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Content</th>
              <th>Time</th>
              <th className="text-center" style={{ width: "100px" }}></th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.id}>
                <td>{notification.name}</td>
                <td>
                  <span className="text-danger fw-medium">{notification.class}</span>
                </td>
                <td>{notification.content}</td>
                <td>{notification.time}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-sm btn-outline-secondary btn-icon">
                      <i className="bi bi-eye"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-secondary btn-icon">
                      <i className="bi bi-chat-square-text"></i>
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
      <Footer />
    </div>
  )
}
