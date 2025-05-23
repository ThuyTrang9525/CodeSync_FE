import { useState } from "react";

export default function SemesterWeekSelector({
  onSemesterChange,
  onWeekChange,
  currentSemester,
  currentWeek,
}) {
  const semesters = ["2025-1", "2025-2", "2026-1", "2026-2", "2027-1", "2027-2"];
  const weeks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  const [semesterFocused, setSemesterFocused] = useState(false);
  const [weekFocused, setWeekFocused] = useState(false);

  return (
    <div style={styles.container}>
      {/* Semester Selector */}
      <div style={styles.selectorWrapper}>
        <label htmlFor="semester-select" style={styles.label}>
          Semester
        </label>
        <select
          id="semester-select"
          style={{
            ...styles.select,
            ...(semesterFocused ? styles.selectFocus : {}),
          }}
          value={currentSemester}
          onChange={(e) => onSemesterChange(e.target.value)}
          onFocus={() => setSemesterFocused(true)}
          onBlur={() => setSemesterFocused(false)}
        >
          <option value="">Select semester</option>
          {semesters.map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>
      </div>

      {/* Week Selector */}
      <div style={styles.selectorWrapper}>
        <label htmlFor="week-select" style={styles.label}>
          Week
        </label>
        <select
          id="week-select"
          style={{
            ...styles.select,
            ...(weekFocused ? styles.selectFocus : {}),
          }}
          value={currentWeek}
          onChange={(e) => onWeekChange(e.target.value)}
          onFocus={() => setWeekFocused(true)}
          onBlur={() => setWeekFocused(false)}
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
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    alignItems: "flex-end",
    backgroundColor: "white",
    padding: "1rem",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
    marginBottom: "1.5rem",
  },
  selectorWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "0.25rem",
  },
  select: {
    width: "12rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem",
    padding: "0.5rem 0.75rem",
    outline: "none",
    fontSize: "1rem",
    color: "#374151",
    backgroundColor: "white",
    transition: "box-shadow 0.2s ease, border-color 0.2s ease",
    cursor: "pointer",
  },
  selectFocus: {
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
  },
};
