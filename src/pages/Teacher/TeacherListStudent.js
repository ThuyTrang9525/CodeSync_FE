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
  const weekOptions = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 8", "Week 9", "All"]
  const semesterOptions = ["2025-1", "2025-2", "2026-1", "2026-2", "2027-1", "2027-2"]
  const [selectedSemester, setSelectedSemester] = useState("Select Semester");
  const [showSemesterDropdown, setShowSemesterDropdown] = useState(false)
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
      const selectedSemesterNumber = selectedSemester !== "Choose Semester" ? selectedSemester : null;

      if (!selectedWeekNumber || !selectedSemesterNumber) return;

      await Promise.all(
        students.map(async (student) => {
          const result = await getWeekGoalProgress(student.email, selectedWeekNumber, selectedSemesterNumber);
          progressData[student.email] = result.progress;
        })
      );

      setWeekProgress(progressData);
    };

    if (
      selectedWeek !== "Choose Week" &&
      selectedSemester !== "Choose Semester" &&
      students.length > 0
    ) {
      fetchProgressData();
    }
  }, [students, selectedWeek, selectedSemester]);


  const filteredStudents = students.filter((student) =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />
      <NavBar />
      <div className="container py-4">
        {/* Search & Filters */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          {/* Search bar */}
          <div className="input-group shadow-sm" style={{ maxWidth: '300px' }}>
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Week Dropdown */}
          <div className="d-flex gap-2">
            <div className="dropdown">
              <button
                className="btn btn-outline-primary dropdown-toggle shadow-sm"
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

            {/* Semester Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-outline-primary dropdown-toggle shadow-sm"
                onClick={() => setShowSemesterDropdown(!showSemesterDropdown)}
              >
                {selectedSemester}
              </button>
              {showSemesterDropdown && (
                <ul className="dropdown-menu show">
                  {semesterOptions.map((semester, index) => (
                    <li key={index}>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setSelectedSemester(semester)
                          setShowSemesterDropdown(false)
                        }}
                      >
                        {semester}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Student Table */}
        {loading ? (
          <div className="text-center py-5">Loading students...</div>
        ) : error ? (
          <div className="text-danger text-center py-5">{error}</div>
        ) : (
          <div className="table-responsive border rounded shadow-sm bg-white">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-primary">
                <tr>
                  <th className="text-center fw-bold text-dark">STT</th>
                  <th className="text-center fw-bold text-dark">Name</th>
                  <th className="text-center fw-bold text-dark">Email</th>
                  <th className="text-center fw-bold text-dark">
                    {selectedWeek === "Choose Week" ? "Progress" : `Progress ${selectedWeek}`}
                  </th>
                  <th className="text-center fw-bold text-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={student.userID || index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center fw-semibold text-dark">
                        {student.name || "No name"}
                      </td>
                      <td className="text-center text-muted">
                        {student.email || "No email"}
                      </td>
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
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleViewProfile(student.userID)}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="d-flex justify-content-end mt-3">
          <div className="btn-group">
            <button className="btn btn-primary btn-sm">1</button>
            <button className="btn btn-outline-secondary btn-sm">2</button>
            <button className="btn btn-outline-secondary btn-sm">Next</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
