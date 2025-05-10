"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";

export default function SkillsTable() {
    const [skills, setSkills] = useState([
      {
        id: 1,
        description: "Can complete complete sentence structures and identify vocabulary",
        completed: {
          toeic: true,
          itEnglish: true,
          speakEnglish: true,
        },
      },
      {
        id: 2,
        description: "Can complete complete sentence structures and identify vocabulary",
        completed: {
          toeic: true,
          itEnglish: true,
          speakEnglish: true,
        },
      },
    ])
  
    const [editingCell, setEditingCell] = useState({ skillId: null, field: null })
    const [editValue, setEditValue] = useState("")
  
    // New state for adding a new skill
    const [newSkill, setNewSkill] = useState({
      description: "",
      completed: {
        toeic: false,
        itEnglish: false,
        speakEnglish: false,
      },
    })
  
    const handleEdit = (skillId, field, value) => {
      setEditingCell({ skillId, field })
      setEditValue(value)
    }
  
    const handleSave = (skillId, field) => {
      setSkills(
        skills.map((skill) => {
          if (skill.id === skillId) {
            return {
              ...skill,
              description: field === "description" ? editValue : skill.description,
            }
          }
          return skill
        }),
      )
      setEditingCell({ skillId: null, field: null })
    }
  
    const toggleCheckbox = (skillId, field) => {
      setSkills(
        skills.map((skill) => {
          if (skill.id === skillId) {
            return {
              ...skill,
              completed: {
                ...skill.completed,
                [field]: !skill.completed[field],
              },
            }
          }
          return skill
        }),
      )
    }
  
    // Toggle checkbox for new skill
    const toggleNewSkillCheckbox = (field) => {
      setNewSkill({
        ...newSkill,
        completed: {
          ...newSkill.completed,
          [field]: !newSkill.completed[field],
        },
      })
    }
  
    // Add new skill
    const handleAddSkill = () => {
      if (newSkill.description.trim() === "") return
  
      const newId = skills.length > 0 ? Math.max(...skills.map((skill) => skill.id)) + 1 : 1
  
      setSkills([
        ...skills,
        {
          id: newId,
          description: newSkill.description,
          completed: newSkill.completed,
        },
      ])
  
      // Reset new skill form
      setNewSkill({
        description: "",
        completed: {
          toeic: false,
          itEnglish: false,
          speakEnglish: false,
        },
      })
    }
  
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Toeic</th>
              <th>IT English</th>
              <th>Speak English</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id}>
                <td>
                  <div className="flex items-start">
                    <div
                      className={`flex-1 ${editingCell.skillId === skill.id && editingCell.field === "description" ? "" : "editable-cell"}`}
                      onClick={() => handleEdit(skill.id, "description", skill.description)}
                    >
                      {editingCell.skillId === skill.id && editingCell.field === "description" ? (
                        <input
                          className="editable-input"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => handleSave(skill.id, "description")}
                          onKeyDown={(e) => e.key === "Enter" && handleSave(skill.id, "description")}
                          autoFocus
                        />
                      ) : (
                        skill.description
                      )}
                    </div>
                    <div className="checkbox-container cursor-pointer" onClick={() => toggleCheckbox(skill.id, "toeic")}>
                      {skill.completed.toeic && <Check className="h-4 w-4" />}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-start">
                    <div
                      className={`flex-1 ${editingCell.skillId === skill.id && editingCell.field === "description" ? "" : "editable-cell"}`}
                      onClick={() => handleEdit(skill.id, "description", skill.description)}
                    >
                      {editingCell.skillId === skill.id && editingCell.field === "description" ? (
                        <input
                          className="editable-input"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => handleSave(skill.id, "description")}
                          onKeyDown={(e) => e.key === "Enter" && handleSave(skill.id, "description")}
                          autoFocus
                        />
                      ) : (
                        skill.description
                      )}
                    </div>
                    <div
                      className="checkbox-container cursor-pointer"
                      onClick={() => toggleCheckbox(skill.id, "itEnglish")}
                    >
                      {skill.completed.itEnglish && <Check className="h-4 w-4" />}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-start">
                    <div
                      className={`flex-1 ${editingCell.skillId === skill.id && editingCell.field === "description" ? "" : "editable-cell"}`}
                      onClick={() => handleEdit(skill.id, "description", skill.description)}
                    >
                      {editingCell.skillId === skill.id && editingCell.field === "description" ? (
                        <input
                          className="editable-input"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => handleSave(skill.id, "description")}
                          onKeyDown={(e) => e.key === "Enter" && handleSave(skill.id, "description")}
                          autoFocus
                        />
                      ) : (
                        skill.description
                      )}
                    </div>
                    <div
                      className="checkbox-container cursor-pointer"
                      onClick={() => toggleCheckbox(skill.id, "speakEnglish")}
                    >
                      {skill.completed.speakEnglish && <Check className="h-4 w-4" />}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {/* New row for adding data */}
            <tr className="bg-[#e0f2f1]">
              <td>
                <div className="flex items-start">
                  <input
                    className="flex-1 p-2 border border-[#009688] rounded"
                    placeholder="Enter new skill description"
                    value={newSkill.description}
                    onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                  />
                  <div
                    className="checkbox-container cursor-pointer ml-2 bg-white"
                    onClick={() => toggleNewSkillCheckbox("toeic")}
                  >
                    {newSkill.completed.toeic && <Check className="h-4 w-4" />}
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-start">
                  <div className="flex-1 text-center text-gray-500">Same as first column</div>
                  <div
                    className="checkbox-container cursor-pointer ml-2 bg-white"
                    onClick={() => toggleNewSkillCheckbox("itEnglish")}
                  >
                    {newSkill.completed.itEnglish && <Check className="h-4 w-4" />}
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-center text-gray-500">Same as first column</div>
                  <div
                    className="checkbox-container cursor-pointer ml-2 bg-white"
                    onClick={() => toggleNewSkillCheckbox("speakEnglish")}
                  >
                    {newSkill.completed.speakEnglish && <Check className="h-4 w-4" />}
                  </div>
                  <button className="ml-2 bg-[#009688] hover:bg-[#00796b]" size="sm" onClick={handleAddSkill}>
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
  