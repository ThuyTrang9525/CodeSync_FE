"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export default function SelfStudyTable() {
    const [selfStudyData, setSelfStudyData] = useState([
      {
        id: 1,
        date: "3 Mar",
        skill: "TOEIC",
        lesson: "Listening: When, Where, Why, How\nGrammar: Tenses",
        timeAllocation: "9:00-10:00pm",
        learningResources: "Website link",
        learningActivity: "Read & write key attributes, memorize",
        evaluation: "Practice more with linking words",
      },
      {
        id: 2,
        date: "3 Mar",
        skill: "TOEIC",
        lesson: "Listening: When, Where, Why, How\nGrammar: Tenses",
        timeAllocation: "9:00-10:00pm",
        learningResources: "Website link",
        learningActivity: "Read & write key attributes, memorize",
        evaluation: "Practice more with linking words",
      },
      {
        id: 3,
        date: "3 Mar",
        skill: "TOEIC",
        lesson: "Listening: When, Where, Why, How\nGrammar: Tenses",
        timeAllocation: "9:00-10:00pm",
        learningResources: "Website link",
        learningActivity: "Read & write key attributes, memorize",
        evaluation: "Practice more with linking words",
      },
      {
        id: 4,
        date: "3 Mar",
        skill: "TOEIC",
        lesson: "Listening: When, Where, Why, How\nGrammar: Tenses",
        timeAllocation: "9:00-10:00pm",
        learningResources: "Website link",
        learningActivity: "Read & write key attributes, memorize",
        evaluation: "Practice more with linking words",
      },
    ])
  
    const [editingCell, setEditingCell] = useState({ id: null, field: null })
    const [editValue, setEditValue] = useState("")
  
    // New state for adding a new self-study entry
    const [newEntry, setNewEntry] = useState({
      date: "",
      skill: "",
      lesson: "",
      timeAllocation: "",
      learningResources: "",
      learningActivity: "",
      evaluation: "",
    })
  
    const handleEdit = (id, field, value) => {
      setEditingCell({ id, field })
      setEditValue(value)
    }
  
    const handleSave = (id, field) => {
      setSelfStudyData(
        selfStudyData.map((item) => {
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
  
      const newId = selfStudyData.length > 0 ? Math.max(...selfStudyData.map((item) => item.id)) + 1 : 1
  
      setSelfStudyData([
        ...selfStudyData,
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
        timeAllocation: "",
        learningResources: "",
        learningActivity: "",
        evaluation: "",
      })
    }
  
    return (
      <div className="">
       <table className="full-width-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Skill/ Module</th>
              <th>My Lesson</th>
              <th>Time allocation</th>
              <th>Learning resources</th>
              <th>Learning activity</th>
              <th>Evaluation of work</th>
            </tr>
          </thead>
          <tbody>
            {selfStudyData.map((item) => (
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
                  className={editingCell.id === item.id && editingCell.field === "timeAllocation" ? "" : "editable-cell"}
                  onClick={() => handleEdit(item.id, "timeAllocation", item.timeAllocation)}
                >
                  {editingCell.id === item.id && editingCell.field === "timeAllocation" ? (
                    <input
                      className="editable-input"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSave(item.id, "timeAllocation")}
                      onKeyDown={(e) => e.key === "Enter" && handleSave(item.id, "timeAllocation")}
                      autoFocus
                    />
                  ) : (
                    item.timeAllocation
                  )}
                </td>
                <td
                  className={
                    editingCell.id === item.id && editingCell.field === "learningResources" ? "" : "editable-cell"
                  }
                  onClick={() => handleEdit(item.id, "learningResources", item.learningResources)}
                >
                  {editingCell.id === item.id && editingCell.field === "learningResources" ? (
                    <input
                      className="editable-input"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSave(item.id, "learningResources")}
                      onKeyDown={(e) => e.key === "Enter" && handleSave(item.id, "learningResources")}
                      autoFocus
                    />
                  ) : (
                    item.learningResources
                  )}
                </td>
                <td
                  className={
                    editingCell.id === item.id && editingCell.field === "learningActivity" ? "" : "editable-cell"
                  }
                  onClick={() => handleEdit(item.id, "learningActivity", item.learningActivity)}
                >
                  {editingCell.id === item.id && editingCell.field === "learningActivity" ? (
                    <textarea
                      className="editable-input"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSave(item.id, "learningActivity")}
                      rows={3}
                      autoFocus
                    />
                  ) : (
                    item.learningActivity
                  )}
                </td>
                <td
                  className={editingCell.id === item.id && editingCell.field === "evaluation" ? "" : "editable-cell"}
                  onClick={() => handleEdit(item.id, "evaluation", item.evaluation)}
                >
                  {editingCell.id === item.id && editingCell.field === "evaluation" ? (
                    <textarea
                      className="editable-input"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSave(item.id, "evaluation")}
                      rows={3}
                      autoFocus
                    />
                  ) : (
                    item.evaluation
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
                  placeholder="Time allocation"
                  value={newEntry.timeAllocation}
                  onChange={(e) => handleNewEntryChange("timeAllocation", e.target.value)}
                />
              </td>
              <td>
                <input
                  className="w-full p-2 border border-[#009688] rounded"
                  placeholder="Learning resources"
                  value={newEntry.learningResources}
                  onChange={(e) => handleNewEntryChange("learningResources", e.target.value)}
                />
              </td>
              <td>
                <textarea
                  className="w-full p-2 border border-[#009688] rounded"
                  placeholder="Learning activity"
                  rows={2}
                  value={newEntry.learningActivity}
                  onChange={(e) => handleNewEntryChange("learningActivity", e.target.value)}
                />
              </td>
              <td>
                <div className="flex flex-col space-y-2">
                  <textarea
                    className="w-full p-2 border border-[#009688] rounded"
                    placeholder="Evaluation"
                    rows={2}
                    value={newEntry.evaluation}
                    onChange={(e) => handleNewEntryChange("evaluation", e.target.value)}
                  />
                  <button className="w-full bg-[#009688] hover:bg-[#00796b]" size="sm" onClick={handleAddEntry}>
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
  