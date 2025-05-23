"use client"

import { useState, useEffect, useRef } from "react"
import { Menu } from "lucide-react"
import SkillsTable from "./StudentSkillsTable"
import StudyPlanTable from "./StudentStudyPlanTable"
import SelfStudyTable from "./StudentSeftStudyTable"
import SemesterWeekSelector from "./StudentWeekSelector" // Đảm bảo đã import nếu có

export default function StudyPlanManagement() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [semester, setSemester] = useState("2025-1") // Default semester
  const [week, setWeek] = useState("1") // Default week

  // Pass these values to child components
  const handleSemesterChange = (newSemester) => {
    setSemester(newSemester)
  }

  const handleWeekChange = (newWeek) => {
    setWeek(newWeek)
  }

  return (
    <div className="flex-col w-full h-full p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-blue-200 p-2 border border-blue-300 rounded">
          <h1 className="text-2xl font-bold text-center">Study Plan Management</h1>
        </div>
        <button
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Add the semester and week selector */}
      <SemesterWeekSelector
        currentSemester={semester}
        currentWeek={week}
        onSemesterChange={setSemester}
        onWeekChange={setWeek}
      />

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Week {week}'s Goals</h2>
        <SkillsTable semester={semester} week={week} />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">In Class</h2>
        <StudyPlanTable semester={semester} week={week} />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Self-study</h2>
        <SelfStudyTable semester={semester} week={week} />
      </div>
    </div>
  )
}