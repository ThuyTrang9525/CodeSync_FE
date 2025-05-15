"use client"

import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Navigation from '../../components/Teacher/TeacherNavigation'
import Header from "../../components/header"
import Footer from "../../components/footer"

function ClassesGrid() {
  const navigate = useNavigate()
  const [classes, setClasses] = useState([])

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/teacher/classes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json()
        if (data.classes) {
          setClasses(data.classes)
        } else {
          console.error("No classes field in response", data)
        }
      } catch (err) {
        console.error("Failed to fetch classes:", err)
      }
    }

    fetchClasses()
  }, [])

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
    <div className="d-flex flex-column min-vh-100 bg-white">
      <Header />
      <Navigation />
      <div className="p-3 container my-3">
        <div className="w-100">
          {/* Banner */}
          <div className="text-white p-4 rounded mb-4" style={{ backgroundColor: "#009688" }}>
            <h2 className="fs-3 fw-bold mb-2">Keep Students at the Heart of Teaching</h2>
            <p className="mb-4">
              See progress unfold in real time, get tailored assignment suggestions, and unlock powerful insights—all in one place.
            </p>
            <div className="d-flex justify-content-end">
              <button className="btn btn-light text-teal">Create a class</button>
            </div>
          </div>

          <div className="row g-3">
            {classes.length === 0 ? (
              <div className="text-center w-100">
                <p>No classes found or loading...</p>
              </div>
            ) : (
              classes.map((cls) => (
                <div className="col-6" key={cls.classID}>
                  <div
                    className="text-white p-3 rounded h-100"
                    style={{
                      backgroundColor: cls.color || "#009688",
                      minHeight: "130px",
                      cursor: "pointer"
                    }}
                    onClick={() => handleClassClick(cls.classID)}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h3 className="fs-6 fw-bold mb-1">{cls.className || cls.classID}</h3>
                        <p className="mb-0">{cls.teacherName || "Teacher"}</p>
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-light border-0">
                          <i className="bi bi-people-fill"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-light border-0">
                          <i className="bi bi-bar-chart-fill"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-light border-0">
                          <i className="bi bi-bookmark-fill"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ClassesGrid
