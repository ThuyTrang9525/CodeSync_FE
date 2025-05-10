"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import SkillsTable from "./StudentSkillsTable"
import StudyPlanTable from "./StudentStudyPlanTable"
import SelfStudyTable from "./StudentSeftStudyTable"

export default function StudyPlanManagement() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className=" flex-col ">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-blue-200 p-2 border border-blue-300 rounded">
          <h1 className="text-2xl font-bold text-center">Study Plan Management</h1>
        </div>
        <button variant="outline" size="icon" className="bg-blue-500 text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <SkillsTable />
      <div className="mt-8">
      <h2 className="text-2xl font-bold text-blue-500 mb-4">Week's Goal</h2>
        <StudyPlanTable />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Self-study</h2>
        <SelfStudyTable />
      </div>
    </div>
  )
}
