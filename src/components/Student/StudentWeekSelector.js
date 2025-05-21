"use client"

export default function SemesterWeekSelector({
  onSemesterChange,
  onWeekChange,
  currentSemester,
  currentWeek,
}) {
  const semesters = ["2025-1", "2025-2", "2026-1", "2026-2", "2027-1", "2027-2"]
  const weeks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="semester-select" className="text-sm font-medium">
          Semester
        </label>
        <select
          id="semester-select"
          className="w-[180px] border rounded p-2"
          value={currentSemester}
          onChange={(e) => onSemesterChange(e.target.value)}
        >
          <option value="">Select semester</option>
          {semesters.map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="week-select" className="text-sm font-medium">
          Week
        </label>
        <select
          id="week-select"
          className="w-[180px] border rounded p-2"
          value={currentWeek}
          onChange={(e) => onWeekChange(e.target.value)}
        >
          <option value="">Select week</option>
          {weeks.map((week) => (
            <option key={week} value={week}>
              Week {week}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}