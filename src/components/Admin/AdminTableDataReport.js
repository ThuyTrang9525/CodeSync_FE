"use client"

import { useState, useEffect } from "react"

export default function AdminReport() {
  const [students, setStudents] = useState([])
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/reports")
      if (response.ok) {
        const data = await response.json()
        setStudents(data)
      } else {
        alert("Không thể lấy dữ liệu sinh viên")
      }
    } catch (error) {
      console.error("Lỗi:", error)
      alert("Đã xảy ra lỗi khi lấy dữ liệu")
    } finally {
      setLoading(false)
    }
  }

  const fetchGoals = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/goals")
      if (response.ok) {
        const data = await response.json()
        setGoals(data)
      } else {
        alert("Không thể lấy dữ liệu goals")
      }
    } catch (error) {
      console.error("Lỗi:", error)
      alert("Đã xảy ra lỗi khi lấy dữ liệu goals")
    }
  }

  const handleViewGoals = (student) => {
    setSelectedStudent(student)
    setShowModal(true)
    fetchGoals()
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedStudent(null)
  }

  if (loading) {
    return <div style={styles.loading}>Đang tải...</div>
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Student Management</h1>
        <div style={styles.border}></div>
      </div>

      {/* Danh sách sinh viên dạng ô */}
      <div style={styles.grid}>
        {students.map((student, index) => (
          <div key={index} style={styles.card}>
            <div>
                <div style={styles.header}>
                  <h3 style={styles.name}>{student.name}</h3>
                  <div style={styles.bordersm}></div>
                </div>
              <p><strong>Email:</strong> {student.email}</p>
            </div>
            <button style={styles.button} onClick={() => handleViewGoals(student)}>
              View Goals 👁️
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={{ margin: 0 }}>Student Goals</h2>
              <button onClick={closeModal} style={styles.closeButton}>×</button>
            </div>

            {selectedStudent && (
              <div>
                <h3>{selectedStudent.username}</h3>
                <p><strong>ID:</strong> {selectedStudent.id}</p>
                <p><strong>Email:</strong> {selectedStudent.email}</p>
                <p><strong>Class:</strong> {selectedStudent.class}</p>

                <h4 style={styles.goalTitle}>Goals</h4>
                {goals.length > 0 ? (
                  <div style={styles.goalGrid}>
                    {goals.map((goal, index) => (
                      <div key={index} style={styles.goalCard}>
                        <h4 style={{ marginBottom: 5 }}>{goal.name}</h4>
                        <p><strong>Deadline:</strong> {goal.deadline.split("T")[0]}</p>
                        <p><strong>Status:</strong> {goal.status}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={styles.noGoal}>Không có goal</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    marginBottom: "20px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px",
  },
  border: {
    width: "40%",
    height: "2px",
    backgroundColor: "#009688",
    borderRadius: "2px",
  },
  bordersm:{
    width: "100%",
    height: "2px",
    backgroundColor: "#009688",
    borderRadius: "2px",
  },
  loading: {
    padding: "50px",
    fontSize: "18px",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "20px",
    backgroundColor: "#fefefe",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  },

  // Hover effect (bạn có thể thêm phần này vào trong component hoặc chuyển sang file CSS nếu tách riêng)
  ":hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
  },

 name: {
  marginBottom: "8px",
  fontSize: "20px",
  fontWeight: "bold",
  color: "#222",
},

  button: {
  marginTop: "12px",
  padding: "10px 16px",
  backgroundColor: "#009688",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
},

buttonHover: {
  backgroundColor: "#00796b",
},

 modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(4px)",
  },

  modal: {
    backgroundColor: "#fff",
    padding: "25px 30px",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "650px",
    maxHeight: "80vh",
    overflowY: "auto",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
    animation: "fadeIn 0.3s ease-out",
    position: "relative",
    fontFamily: "'Segoe UI', sans-serif",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
  },

  closeButton: {
    fontSize: "24px",
    background: "none",
    border: "none",
    color: "#666",
    cursor: "pointer",
    transition: "color 0.3s ease",
  },

  studentInfo: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginBottom: "30px",
  },

  infoItem: {
    backgroundColor: "#f5f5f5",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "80px",
  },

  infoLabel: {
    fontWeight: 600,
    fontSize: "14px",
    color: "#555",
    marginBottom: "6px",
  },

  infoValue: {
    fontSize: "15px",
    color: "#333",
    wordBreak: "break-word",
  },

  goalTitle: {
    marginTop: "20px",
    fontSize: "20px",
    fontWeight: "600",
    color: "#009688",
    borderBottom: "1px solid #ddd",
    paddingBottom: "6px",
  },

  goalGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
    marginTop: "15px",
  },

  goalCard: {
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
    padding: "12px",
    backgroundColor: "#fafafa",
    minHeight: "80px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    fontSize: "15px",
    color: "#444",
  },

  noGoal: {
    textAlign: "center",
    padding: "20px",
    color: "#999",
    fontStyle: "italic",
  },

}
