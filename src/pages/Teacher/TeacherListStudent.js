"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import NavBar from '../../components/Teacher/TeacherNavBar'
import Header from "../../components/header"
import Footer from "../../components/footer"

export default function StudentTable() {
  const { classId } = useParams()
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedWeek, setSelectedWeek] = useState("Choose Week")
  const [missingOption, setMissingOption] = useState("Missing Status")
  const [showWeekDropdown, setShowWeekDropdown] = useState(false)
  const [showMissingDropdown, setShowMissingDropdown] = useState(false)

  const weekOptions = ["Week 1", "Week 2", "Week 3", "All"]
  const missingOptions = ["Show All", "Show Missing"]

  const formattedClassId = classId ? classId.toUpperCase().replace(/-/g, " ") : "PNV26B"

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`http://localhost:8000/api/classes/${classId}/students`)
        if (!response.ok) throw new Error("Failed to fetch students")

        const data = await response.json()
        console.log("Fetched data:", data)
        

        // Nếu API trả về { students: [...] }
        if (Array.isArray(data.students)) {
          setStudents(data.students)
        }
        // Nếu API trả về trực tiếp mảng
        else if (Array.isArray(data)) {
          setStudents(data)
        } else {
          setStudents([])
          setError("Unexpected data format from API")
        }
      } catch (error) {
        setError(error.message)
        setStudents([])
      } finally {
        setLoading(false)
      }
    }

    if (classId) {
      fetchStudents()
    }
  }, [classId])

  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      <Header />
      <NavBar />
      <div className="p-3 container my-3">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div className="d-flex gap-3">
            {/* <button
              className="px-3 py-2 fw-medium border-0 border-bottom bg-transparent"
              style={{ color: "#009688", borderColor: "#009688" }}
            >
              {formattedClassId}
            </button> */}
          </div>

          <div className="d-flex align-items-center gap-2">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>
              <input type="text" className="form-control" placeholder="Search..." />
            </div>

            {/* Week Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                onClick={() => setShowWeekDropdown(!showWeekDropdown)}
              >
                {selectedWeek}
              </button>
              {showWeekDropdown && (
                <ul className="dropdown-menu show">
                  {weekOptions.map((week, index) => (
                    <li key={index}>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setSelectedWeek(week)
                          setShowWeekDropdown(false)
                        }}
                      >
                        {week}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Missing Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                onClick={() => setShowMissingDropdown(!showMissingDropdown)}
              >
                {missingOption}
              </button>
              {showMissingDropdown && (
                <ul className="dropdown-menu show">
                  {missingOptions.map((option, index) => (
                    <li key={index}>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setMissingOption(option)
                          setShowMissingDropdown(false)
                        }}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">Loading students...</div>
        ) : error ? (
          <div className="text-danger text-center py-5">{error}</div>
        ) : (
          <div className="table-responsive border rounded">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="text-center" style={{ width: "60px", color: "#6c757d" }}>STT</th>
                  <th className="text-center" style={{ color: "#6c757d" }}>Name</th>
                  <th className="text-center" style={{ color: "#6c757d" }}>Email</th>
                  <th className="text-center" style={{ color: "#6c757d" }}>Progress Week 1</th>
                  <th className="text-center" style={{ color: "#6c757d" }}></th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <tr key={student.userID || index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{student.name || "No name"}</td>
                      <td className="text-center">{student.email || "No email"}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="progress flex-grow-1">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: `${student.progress || 0}%`, backgroundColor: "#009688" }}
                              aria-valuenow={student.progress || 0}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <span className="text-nowrap small">{student.progress || 0}%</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <button className="btn btn-sm btn-outline-secondary btn-icon">
                            <i className="bi bi-eye"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

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
  )
}
