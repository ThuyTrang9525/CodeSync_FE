"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import GoalsTable from "./StudentSkillsTable"
import StudyPlanTable from "./StudentStudyPlanTable"
import SelfStudyTable from "./StudentSeftStudyTable"
import SemesterWeekSelector from "./StudentWeekSelector"

export default function StudyPlanManagement() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [semester, setSemester] = useState("2025-1")
  const [week, setWeek] = useState("1")
  const [activeTab, setActiveTab] = useState("inclass")

  const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    boxSizing: "border-box",
    padding: "20px 15px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
  },
  titleBox: {
    backgroundColor: "#bfdbfe",
    border: "1px solid #93c5fd",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 6px rgba(59, 130, 246, 0.3)",
  },
  titleText: {
    fontSize: "1.75rem",
    fontWeight: "700",
    textAlign: "center",
    padding: "0.75rem 1.5rem",
    color: "#1e40af",
    userSelect: "none",
  },
  menuButton: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(59, 130, 246, 0.4)",
    transition: "background-color 0.3s ease",
  },
  menuButtonHover: {
    backgroundColor: "#2563eb",
  },

  sectionTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#00796b",
    marginBottom: "25px",
    borderBottom: "3px solid #4db6ac",
    paddingBottom: "12px",
    userSelect: "none",
  },
  tabButtons: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    marginTop: "2rem",
    flexWrap: "wrap",
  },
  tabButton: (active) => ({
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    padding: "0.6rem 1.2rem",
    fontWeight: "600",
    fontSize: "1rem",
    backgroundColor: active ? "#3b82f6" : "#e5e7eb",
    color: active ? "#fff" : "#374151",
    boxShadow: active
      ? "0 4px 12px rgba(59, 130, 246, 0.5)"
      : "none",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  }),
  scrollContainer: {
    width: "100%",
    overflowX: "auto",
    paddingBottom: "1rem",
  },
}


  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleBox}>
          <h1 style={styles.titleText}>Study Plan Management</h1>
        </div>
        <button style={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} />
        </button>
      </div>

      <SemesterWeekSelector
        currentSemester={semester}
        currentWeek={week}
        onSemesterChange={setSemester}
        onWeekChange={setWeek}
      />

      <div >
        <h2 style={styles.sectionTitle}>Week {week}'s Goals</h2>
        <GoalsTable semester={semester} week={week} />
      </div>

      <div style={styles.tabButtons}>
        <button
          style={styles.tabButton(activeTab === "inclass")}
          onClick={() => setActiveTab("inclass")}
        >
          In Class
        </button>
        <button
          style={styles.tabButton(activeTab === "selfstudy")}
          onClick={() => setActiveTab("selfstudy")}
        >
          Self-study
        </button>
      </div>

      {activeTab === "inclass" && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>In Class</h2>
<div style={styles.scrollContainer}>
            <SelfStudyTable semester={semester} week={week} />
          </div>        </div>
      )}

      {activeTab === "selfstudy" && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Self-study</h2>
          <div style={styles.scrollContainer}>
            <SelfStudyTable semester={semester} week={week} />
          </div>
        </div>
      )}
    </div>
  )
}
