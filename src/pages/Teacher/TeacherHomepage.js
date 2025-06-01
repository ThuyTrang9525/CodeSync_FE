"use client"

import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import NavBar from '../../components/Teacher/TeacherNavBar'
import Header from "../../components/header"
import Footer from "../../components/footer"
import { TeacherClasses } from "../../service/api"

function ClassesGrid() {
  const navigate = useNavigate()
  const [classes, setClasses] = useState([])
  const [totalStudents, setTotalStudents] = useState(0);
 
  useEffect(() => {
    const loadClasses = async () => {
      const result = await TeacherClasses();
      setClasses(result.classes);
      setTotalStudents(result.totalStudents);
    };

    loadClasses();
  }, []);

  const handleClassClick = (classId) => {
    navigate(`/teachers/${classId}`)
  }

  useEffect(() => {
    if (typeof window !== "undefined" && window.bootstrap) {
      const dropdownElementList = document.querySelectorAll(".dropdown-toggle")
      dropdownElementList.forEach((dropdownToggleEl) => {
        new window.bootstrap.Dropdown(dropdownToggleEl)
      })
    }
  }, [])

 return (
  <div className="d-flex min-vh-100 bg-body-tertiary">
    {/* Main Content */}
    <main className="flex-grow-1 p-4">
      <Header />
      <NavBar />

      {/* Welcome Banner */}
      <section className="p-4 mb-4 rounded shadow-sm" style={{  color: "black" }}>
        <h2 className="fw-bold mb-1">Welcome back, Teacher!</h2>
        <p className="mb-0">Here's an overview of your teaching activities.</p>
      </section>

      {/* Overview Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="p-3 rounded shadow-sm d-flex justify-content-between align-items-center" style={{ backgroundColor: "#f0f9ff" }}>
            <div>
              <h6 className="text-muted mb-1">Classes</h6>
              <h4 className="fw-bold mb-0">{classes.length}</h4>
            </div>
            <i className="bi bi-easel2-fill fs-2 text-primary"></i>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 rounded shadow-sm d-flex justify-content-between align-items-center" style={{ backgroundColor: "#f0fff4" }}>
            <div>
              <h6 className="text-muted mb-1">Students</h6>
              <h4 className="fw-bold mb-0">{totalStudents}</h4>
            </div>
            <i className="bi bi-people-fill fs-2" style={{ color: "#009688" }}></i>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 rounded shadow-sm d-flex justify-content-between align-items-center" style={{ backgroundColor: "#fff5f0" }}>
            <div>
              <h6 className="text-muted mb-1">New Messages</h6>
              <h4 className="fw-bold mb-0">5</h4>
            </div>
            <i className="bi bi-chat-dots-fill fs-2 text-danger"></i>
          </div>
        </div>
      </div>

      {/* Class List Section */}
      <section>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold">Your Classes</h5>
          <button className="btn btn-success" style={{ backgroundColor: "#009688" }}><i className="bi bi-plus-lg me-1"></i>Add Class</button>
        </div>

        <div className="row g-3">
          {classes.length === 0 ? (
            <div className="text-center text-muted w-100">No classes found.</div>
          ) : (
            classes.map((cls) => (
              <div className="col-md-6" key={cls.classID}>
                <div
                  className="p-3 rounded shadow-sm h-100 border"
                  style={{
                    backgroundColor: "#d9f0ff", // dùng màu bạn yêu cầu
                    cursor: "pointer",
                    transition: "box-shadow 0.2s"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 12px rgba(0,0,0,0.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                  onClick={() => handleClassClick(cls.classID)}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="fw-bold">{cls.className}</h6>
                      <p className="text-muted mb-0">{cls.teacherName || "Teacher"}</p>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-people"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-graph-up-arrow"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-bookmark"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

    </section>
  </main>
  </div>
  );

}

export default ClassesGrid
