import { useState, useEffect, useRef } from "react"
import { MessageSquare } from "lucide-react"
import { Check, Plus,Trash2 } from "lucide-react";
import CommentsSection from "./StudentCommentsSection"

import {
  fetchStudyPlans,
  createStudyPlan,
  updateStudyPlan,
  deleteStudyPlan,
} from "../../service/api"

const USER_ID = localStorage.getItem("userId")

const StudyPlanTable = ({ semester, week }) => {
  const [studyPlans, setStudyPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
 const [showCommentsFor, setShowCommentsFor] = useState(null);
  const commentButtonRefs = useRef({})
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 })

  const [editingCell, setEditingCell] = useState({ planID: null, field: null })
  const [editValue, setEditValue] = useState("")

  const [newEntry, setNewEntry] = useState({
    date: "",
    skill: "",
    lessonSummary: "",
    selfAssessment: "",
    difficulties: "",
    planToImprove: "",
    problemSolved: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem("token")
        const response = await fetchStudyPlans(semester, week, token)
        setStudyPlans(response.data)
        setError(null)
      } catch (error) {
        console.error("❌ Failed to fetch data", error)
        setError("Không thể tải dữ liệu.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [semester, week])


  const toggleComments = (planID) => {
    if (showCommentsFor === planID) {
      setShowCommentsFor(null);
    } else {
      const btn = commentButtonRefs.current[planID];
      if (btn) {
        const rect = btn.getBoundingClientRect();
        setPopupPosition({
          top: rect.bottom + window.scrollY + 5, // 5px cách nút
          left: rect.left + window.scrollX,
        });
      }
      setShowCommentsFor(planID);
    }
  };

  const handleNewEntryChange = (field, value) => {
    setNewEntry({ ...newEntry, [field]: value })
  }

  const handleAddEntry = () => {
    if (!newEntry.date || !newEntry.skill) {
      console.warn("Missing required fields: date or skill")
      return
    }
    const token = localStorage.getItem("token")
    const dataToSend = {
      userID: USER_ID,
      semester,
      week,
      date: newEntry.date,
      skill: newEntry.skill,
      lessonSummary: newEntry.lessonSummary,
      selfAssessment: newEntry.selfAssessment,
      difficulties: newEntry.difficulties,
      planToImprove: newEntry.planToImprove,
      problemSolved: newEntry.problemSolved,
    }
    createStudyPlan(dataToSend, token)
      .then((response) => {
        setStudyPlans([...studyPlans, response.data])
        setNewEntry({
          date: "",
          skill: "",
          lessonSummary: "",
          selfAssessment: "",
          difficulties: "",
          planToImprove: "",
          problemSolved: true,
        })
      })
      .catch((error) => {
        if (error.response) {
          console.error("Server responded with:", error.response.status, error.response.data);
        } else {
          console.error("Error adding entry:", error.message);
        }
        setError("Không thể thêm mục mới.");
      })
  }

  const handleEdit = (planID, field, value) => {
    setEditingCell({ planID, field })
    setEditValue(value)
  }

  const handleSave = async (planID, field) => {
    const updatedItem = studyPlans.find((item) => item.planID === planID)
    if (!updatedItem) return

    const token = localStorage.getItem("token")
    const updatedValue = {
      ...updatedItem,
      [field]: editValue,
    }

    try {
      const response = await updateStudyPlan(planID, updatedValue, token)
      setStudyPlans(
        studyPlans.map((item) => (item.planID === planID ? response.data : item))
      )
      setEditingCell({ planID: null, field: null })
    } catch (error) {
      console.error("Error updating entry:", error)
      setError("Không thể cập nhật.")
    }
  }

  const handleDelete = (planID) => {
    const token = localStorage.getItem("token")
    deleteStudyPlan(planID, token)
      .then(() => {
        setStudyPlans(studyPlans.filter((item) => item.planID !== planID))
      })
      .catch((error) => {
        console.error("Error deleting entry:", error)
        setError("Không thể xóa.")
      })
  }

  const renderCell = (item, field) => {
    const value = item[field]
    if (editingCell.planID === item.planID && editingCell.field === field) {
      return (
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => handleSave(item.planID, field)}
          autoFocus
          className="w-full text-xs"
        />
      )
    }
    return (
      <div
        onClick={() => handleEdit(item.planID, field, value)}
        className="cursor-pointer"
      >
        {value}
      </div>
    )
  }

  if (loading) return <p>Đang tải dữ liệu...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Skill</th>
            <th className="border p-2">Lesson</th>
            <th className="border p-2">Self-assessment(1-3)</th>
            <th className="border p-2">Difficulties</th>
            <th className="border p-2">Plan</th>
            <th className="border p-2">Solved?</th>
            <th className="border p-2 text-center">💬</th>
            <th className="border p-2 text-center">🗑️</th>
          </tr>
        </thead>
        <tbody>
          {studyPlans.map((item) => (
            <tr key={item.planID}>
              {[
                "date",
                "skill",
                "lessonSummary",
                "selfAssessment",
                "difficulties",
                "planToImprove",
                "problemSolved",
              ].map((field) => (
                <td key={field} className="border p-1">
                  {renderCell(item, field)}
                </td>
              ))}
              <td className="border text-center">
                  <button
                    ref={(el) => (commentButtonRefs.current[item.planID] = el)}
                    onClick={() => toggleComments(item.planID)}
                    className="comment-button"
                    title="Toggle comments"
                  >
                    <MessageSquare size={18} />
                    <span></span>
                  </button>
              </td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => handleDelete(item.planID)}
                  className="text-red-500 hover:underline text-xs"
                >
                  <Trash2 className="trash-icon" />
                </button>
              </td>
            </tr>
          ))}

          <tr className="bg-[#e0f2f1]">
            <td>
              <input
                type="date"
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
                value={newEntry.lessonSummary}
                onChange={(e) =>
                  handleNewEntryChange("lessonSummary", e.target.value)
                }
              />
            </td>
            <td>
              <input
                className="w-full p-2 border border-[#009688] rounded"
                placeholder="1-3"
                value={newEntry.selfAssessment}
                onChange={(e) =>
                  handleNewEntryChange("selfAssessment", e.target.value)
                }
              />
            </td>
            <td>
              <textarea
                className="w-full p-2 border border-[#009688] rounded"
                placeholder="Difficulty"
                rows={2}
                value={newEntry.difficulties}
                onChange={(e) =>
                  handleNewEntryChange("difficulties", e.target.value)
                }
              />
            </td>
            <td>
              <textarea
                className="w-full p-2 border border-[#009688] rounded"
                placeholder="Plan"
                rows={2}
                value={newEntry.planToImprove}
                onChange={(e) =>
                  handleNewEntryChange("planToImprove", e.target.value)
                }
              />
            </td>
            <td>
              <select
                className="w-full p-2 border border-[#009688] rounded"
                value={newEntry.problemSolved}
                onChange={(e) =>
                  handleNewEntryChange("problemSolved", e.target.value)
                }
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Partially">Partially</option>
              </select>
            </td>
            <td colSpan={2} className="text-center">
              <button
                onClick={handleAddEntry}
                className="text-green-600 hover:underline text-xs"
              >
                     <Plus
  className="inline-block w-4 h-4 mr-1"
  style={{ stroke: "green" }}  // hoặc fill: "green"
 />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {showCommentsFor && (
  <div
    style={{
      position: "fixed", // dùng fixed để popup không phụ thuộc vào scroll
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)", // căn giữa hoàn hảo
      zIndex: 2000,
      wplanIDth: 600,
      maxHeight: 600,
      overflowY: "auto",
      backgroundColor: "white",
      border: "1px solplanID #ccc",
      borderRadius: 8,
      boxShadow:
        "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
      padding: 12,
    }}
  >
    <CommentsSection planID={showCommentsFor} planType="in_class" />
    <div className="text-right mt-2">
      <button
        className="text-gray-600 hover:text-gray-900 text-xs"
        onClick={() => setShowCommentsFor(null)}
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  )
}

export default StudyPlanTable
