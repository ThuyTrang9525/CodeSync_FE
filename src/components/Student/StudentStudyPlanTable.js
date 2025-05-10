"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

// Thay thế button bằng thẻ <button> nếu không có component button
export default function StudyPlanTable() {
    const [studyPlanData, setStudyPlanData] = useState([
      {
        id: 1,
        date: "3 Mar",
        skill: "TOEIC",
        lesson: "Listening: When, Where, Why, How\nGrammar: Tenses",
        selfAssessment: "2",
        difficulty: "Confused in recognizing verb tenses quickly.",
        plan: "Do more tense exercises and review grammar rules.",
        problemSolved: "Yes",
      },
      {
        id: 2,
        date: "3 Mar",
        skill: "TOEIC",
        lesson: "Listening: When, Where, Why, How\nGrammar: Tenses",
        selfAssessment: "2",
        difficulty: "Confused in recognizing verb tenses quickly.",
        plan: "Do more tense exercises and review grammar rules.",
        problemSolved: "Yes",
      },
      {
        id: 3,
        date: "3 Mar",
        skill: "TOEIC",
        lesson: "Listening: When, Where, Why, How\nGrammar: Tenses",
        selfAssessment: "2",
        difficulty: "Confused in recognizing verb tenses quickly.",
        plan: "Do more tense exercises and review grammar rules.",
        problemSolved: "Yes",
      },
      {
        id: 4,
        date: "3 Mar",
        skill: "TOEIC",
        lesson: "Listening: When, Where, Why, How\nGrammar: Tenses",
        selfAssessment: "2",
        difficulty: "Confused in recognizing verb tenses quickly.",
        plan: "Do more tense exercises and review grammar rules.",
        problemSolved: "Yes",
      },
      {
        id: 5,
        date: "3 Mar",
        skill: "TOEIC",
        lesson: "Listening: When, Where, Why, How\nGrammar: Tenses",
        selfAssessment: "2",
        difficulty: "Confused in recognizing verb tenses quickly.",
        plan: "Do more tense exercises and review grammar rules.",
        problemSolved: "Yes",
      },
      {
        id: 6,
        date: "3 Mar",
        skill: "TOEIC",
        lesson: "Listening: When, Where, Why, How\nGrammar: Tenses",
        selfAssessment: "2",
        difficulty: "Confused in recognizing verb tenses quickly.",
        plan: "Do more tense exercises and review grammar rules.",
        problemSolved: "Yes",
      },
    ])
  
    const [editingCell, setEditingCell] = useState({ id: null, field: null })
    const [editValue, setEditValue] = useState("")
  
    // New state for adding a new study plan entry
    const [newEntry, setNewEntry] = useState({
      date: "",
      skill: "",
      lesson: "",
      selfAssessment: "",
      difficulty: "",
      plan: "",
      problemSolved: "No",
    })
  
    const handleEdit = (id, field, value) => {
      setEditingCell({ id, field })
      setEditValue(value)
    }
  
    const handleSave = (id, field) => {
      setStudyPlanData(
        studyPlanData.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              [field]: editValue,
            }
          }
          return item
        }),
      )
      setEditingCell({ id: null, field: null })
    }
  
    // Handle change in new entry form
    const handleNewEntryChange = (field, value) => {
      setNewEntry({
        ...newEntry,
        [field]: value,
      })
    }
  
    // Add new entry
    const handleAddEntry = () => {
      // Validate required fields
      if (!newEntry.date || !newEntry.skill) return
  
      const newId = studyPlanData.length > 0 ? Math.max(...studyPlanData.map((item) => item.id)) + 1 : 1
  
      setStudyPlanData([
        ...studyPlanData,
        {
          id: newId,
          ...newEntry,
        },
      ])
  
      // Reset form
      setNewEntry({
        date: "",
        skill: "",
        lesson: "",
        selfAssessment: "",
        difficulty: "",
        plan: "",
        problemSolved: "No",
      })
    }
  
    return (

      <table className="full-width-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Skill/ Module</th>
              <th>My Lesson</th>
              <th>Self - assessment (1-3)</th>
              <th>My difficult</th>
              <th>My plan</th>
              <th>Problem solved</th>
            </tr>
          </thead>
          <tbody>
            {studyPlanData.map((item) => (
              <tr key={item.id}>
                <td
                  className={editingCell.id === item.id && editingCell.field === "date" ? "" : "editable-cell"}
                  onClick={() => handleEdit(item.id, "date", item.date)}
                >
                  {editingCell.id === item.id && editingCell.field === "date" ? (
                    <input
                      className="editable-input"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSave(item.id, "date")}
                      onKeyDown={(e) => e.key === "Enter" && handleSave(item.id, "date")}
                      autoFocus
                    />
                  ) : (
                    item.date
                  )}
                </td>
                <td
                  className={editingCell.id === item.id && editingCell.field === "skill" ? "" : "editable-cell"}
                  onClick={() => handleEdit(item.id, "skill", item.skill)}
                >
                  {editingCell.id === item.id && editingCell.field === "skill" ? (
                    <input
                      className="editable-input"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSave(item.id, "skill")}
                      onKeyDown={(e) => e.key === "Enter" && handleSave(item.id, "skill")}
                      autoFocus
                    />
                  ) : (
                    item.skill
                  )}
                </td>
                <td
                  className={`whitespace-pre-line ${editingCell.id === item.id && editingCell.field === "lesson" ? "" : "editable-cell"}`}
                  onClick={() => handleEdit(item.id, "lesson", item.lesson)}
                >
                  {editingCell.id === item.id && editingCell.field === "lesson" ? (
                    <textarea
                      className="editable-input"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSave(item.id, "lesson")}
                      rows={3}
                      autoFocus
                    />
                  ) : (
                    item.lesson
                  )}
                </td>
                <td
                  className={editingCell.id === item.id && editingCell.field === "selfAssessment" ? "" : "editable-cell"}
                  onClick={() => handleEdit(item.id, "selfAssessment", item.selfAssessment)}
                >
                  {editingCell.id === item.id && editingCell.field === "selfAssessment" ? (
                    <input
                      className="editable-input"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSave(item.id, "selfAssessment")}
                      onKeyDown={(e) => e.key === "Enter" && handleSave(item.id, "selfAssessment")}
                      autoFocus
                    />
                  ) : (
                    item.selfAssessment
                  )}
                </td>
                <td
                  className={editingCell.id === item.id && editingCell.field === "difficulty" ? "" : "editable-cell"}
                  onClick={() => handleEdit(item.id, "difficulty", item.difficulty)}
                >
                  {editingCell.id === item.id && editingCell.field === "difficulty" ? (
                    <textarea
                      className="editable-input"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSave(item.id, "difficulty")}
                      rows={3}
                      autoFocus
                    />
                  ) : (
                    item.difficulty
                  )}
                </td>
                <td
                  className={editingCell.id === item.id && editingCell.field === "plan" ? "" : "editable-cell"}
                  onClick={() => handleEdit(item.id, "plan", item.plan)}
                >
                  {editingCell.id === item.id && editingCell.field === "plan" ? (
                    <textarea
                      className="editable-input"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSave(item.id, "plan")}
                      rows={3}
                      autoFocus
                    />
                  ) : (
                    item.plan
                  )}
                </td>
                <td
                  className={editingCell.id === item.id && editingCell.field === "problemSolved" ? "" : "editable-cell"}
                  onClick={() => handleEdit(item.id, "problemSolved", item.problemSolved)}
                >
                  {editingCell.id === item.id && editingCell.field === "problemSolved" ? (
                    <select
                      className="editable-input"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSave(item.id, "problemSolved")}
                      autoFocus
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Partially">Partially</option>
                    </select>
                  ) : (
                    item.problemSolved
                  )}
                </td>
              </tr>
            ))}
            {/* New row for adding data */}
            <tr className="bg-[#e0f2f1]">
              <td>
                <input
                  className="w-full p-2 border border-[#009688] rounded"
                  placeholder="Date"
                  value={newEntry.date}
                  onChange={(e) => handleNewEntryChange("date", e.target.value)}
                />
              </td>
              <td>
                <input
                  className="w-full p-2 border border-[#009688] rounded"
                  placeholder="Skill/Module"
                  value={newEntry.skill}
                  onChange={(e) => handleNewEntryChange("skill", e.target.value)}
                />
              </td>
              <td>
                <textarea
                  className="w-full p-2 border border-[#009688] rounded"
                  placeholder="Lesson"
                  rows={2}
                  value={newEntry.lesson}
                  onChange={(e) => handleNewEntryChange("lesson", e.target.value)}
                />
              </td>
              <td>
                <input
                  className="w-full p-2 border border-[#009688] rounded"
                  placeholder="1-3"
                  value={newEntry.selfAssessment}
                  onChange={(e) => handleNewEntryChange("selfAssessment", e.target.value)}
                />
              </td>
              <td>
                <textarea
                  className="w-full p-2 border border-[#009688] rounded"
                  placeholder="Difficulty"
                  rows={2}
                  value={newEntry.difficulty}
                  onChange={(e) => handleNewEntryChange("difficulty", e.target.value)}
                />
              </td>
              <td>
                <textarea
                  className="w-full p-2 border border-[#009688] rounded"
                  placeholder="Plan"
                  rows={2}
                  value={newEntry.plan}
                  onChange={(e) => handleNewEntryChange("plan", e.target.value)}
                />
              </td>
              <td>
                <div className=" flex-col space-y-2">
                  <select
                    className="w-full p-2 border border-[#009688] rounded"
                    value={newEntry.problemSolved}
                    onChange={(e) => handleNewEntryChange("problemSolved", e.target.value)}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Partially">Partially</option>
                  </select>
                  <button className="w-full bg-[#009688] hover:bg-[#00796b]" size="sm" onClick={handleAddEntry}>
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      
    )
  }
  