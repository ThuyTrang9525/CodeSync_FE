"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import NavBar from '../../components/Teacher/TeacherNavBar'
import Header from "../../components/header"
import Footer from "../../components/footer"
import { StudentsByClassId, getWeekGoalProgress } from "../../service/api"

export default function StudentTable() {
  const { classId } = useParams()
  localStorage.setItem("classID", classId);
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [weekProgress, setWeekProgress] = useState({}); 
  const [selectedWeek, setSelectedWeek] = useState("Choose Week")
  const [missingOption, setMissingOption] = useState("Missing Status")
  const [showWeekDropdown, setShowWeekDropdown] = useState(false)
  const weekOptions = ["Week 1", "Week 2", "Week 3", "All"]
  const formattedClassId = classId ? classId.toUpperCase().replace(/-/g, " ") : "PNV26B"
  const navigate = useNavigate()
  const handleViewProfile = (studentId) => {
    navigate(`/students/${studentId}`)
  }

  useEffect(() => {
    setSearchTerm("");

    const loadStudents = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await StudentsByClassId(classId);
        setStudents(data);
      } catch (err) {
        setError(err.message);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      loadStudents();
    }
    }, [classId]);

  useEffect(() => {
    const fetchProgressData = async () => {
      const progressData = {};
      const selectedWeekNumber = selectedWeek.includes("Week") ? selectedWeek.split(" ")[1] : null;

      if (!selectedWeekNumber) return;

      await Promise.all(
        students.map(async (student) => {
          const result = await getWeekGoalProgress(student.email, selectedWeekNumber);
          progressData[student.email] = result.progress;
        })
      );

      setWeekProgress(progressData);
    };

    if (selectedWeek !== "Choose Week" && students.length > 0) {
      fetchProgressData();
    }
  }, [students, selectedWeek]);

  const filteredStudents = students.filter((student) =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      <Header />
      <NavBar />
      <div className="p-3 container my-3">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div className="d-flex gap-3">
          </div>

          <div className="d-flex align-items-center gap-2">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>
              <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

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
                  <th className="text-center" style={{ color: "#6c757d" }}>
                    {selectedWeek === "Choose Week" ? "Progress" : `Progress ${selectedWeek}`}
                  </th>
                  <th className="text-center" style={{ color: "#6c757d" }}></th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={student.userID || index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{student.name || "No name"}</td>
                      <td className="text-center">{student.email || "No email"}</td>
                      <td className="text-center align-middle">
                        {selectedWeek === "Choose Week" ? (
                          "-"
                        ) : weekProgress[student.email] !== undefined ? (
                          <div className="progress" style={{ height: "20px" }}>
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{
                                width: `${weekProgress[student.email]}%`,
                                backgroundColor:
                                  weekProgress[student.email] >= 80
                                    ? "#28a745"
                                    : weekProgress[student.email] >= 50
                                    ? "#ffc107"
                                    : "#dc3545",
                              }}
                              aria-valuenow={weekProgress[student.email]}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              {weekProgress[student.email]}%
                            </div>
                          </div>
                        ) : (
                          <span>Loading...</span>
                        )}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-sm btn-outline-secondary btn-icon"
                            onClick={() => handleViewProfile(student.userID)}
                          >
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
