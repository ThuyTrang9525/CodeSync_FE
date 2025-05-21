import React, { useState, useEffect } from "react"
import axios from "axios"
import { LogOut } from "lucide-react"
import "../../assets/css/StudentHomepage.css"
export default function StudentHomeContent() {
  const [student, setStudent] = useState("")
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    axios.get("http://localhost:8000/api/my-classes", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setStudent(res.data.student)
        setClasses(res.data.classes)
        setLoading(false)
      })
      .catch(() => {
        setError("Không thể tải dữ liệu")
        setLoading(false)
      })
  }, [])

  return (
    <div className="student-homepage">
      <h2 className="welcome-text">
        {student ? `Welcome ${student}` : "Welcome"}
      </h2>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="course-grid">
        {classes.map((item, index) => (
          <div className="course-card" key={item.classID || index}>
            <div className="course-header">
              <strong>{item.className}</strong>
              <div className="card-actions">
                <span className="exit-icon">
                  <LogOut size={18} />
                </span>
              </div>
            </div>
            <p>
              <em>{item.teacher?.user?.name}</em>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}