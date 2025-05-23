"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Plus } from "lucide-react"

const DEFAULT_SEMESTER = "2025-1"
const DEFAULT_WEEK = 1

const StudyPlanTable = () => {
  const [studyPlans, setStudyPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [editingCell, setEditingCell] = useState({ id: null, field: null })
  const [editValue, setEditValue] = useState("")
  const [newEntry, setNewEntry] = useState({
    date: "",
    skill: "",
    lessonSummary: "",
    selfAssessment: "",
    difficulties: "",
    planToImprove: "",
    problemSolved: "Yes",
    semester: DEFAULT_SEMESTER,
    week: DEFAULT_WEEK,
  })

  // Lấy token từ localStorage (chỉ chạy client-side)
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  useEffect(() => {
    if (!token) {
      setError("Chưa đăng nhập")
      setLoading(false)
      return
    }

    const fetchStudyPlans = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:8000/api/student/study-plans/semester/${DEFAULT_SEMESTER}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        )

        const data = Array.isArray(response.data) ? response.data : response.data.data
        const filteredData = data.filter((item) => item.week === DEFAULT_WEEK)
        setStudyPlans(filteredData)
        setError(null)
      } catch (err) {
        setError("Lỗi khi lấy dữ liệu từ server")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStudyPlans()
  }, [token])

  const handleEdit = (id, field, value) => {
    setEditingCell({ id, field })
    setEditValue(value || "")
  }

  const handleSave = async (id, field) => {
    const updatedItem = studyPlans.find((item) => item.id === id)
    if (!updatedItem) return

    if (editValue === updatedItem[field]) {
      // Không có thay đổi, chỉ đóng chế độ chỉnh sửa
      setEditingCell({ id: null, field: null })
      return
    }

    const updated = { ...updatedItem, [field]: editValue }

    try {
      await axios.put(
        `http://localhost:8000/api/student/study-plans/${id}`,
        updated,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      setStudyPlans((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      )
      setError(null)
    } catch (err) {
      setError("Lỗi khi cập nhật")
      console.error(err)
    }

    setEditingCell({ id: null, field: null })
    setEditValue("")
  }

  const handleNewEntryChange = (field, value) => {
    setNewEntry((prev) => ({ ...prev, [field]: value }))
  }

  const validateEntry = (entry) => {
    const errors = [];

    if (!entry.date) {
      errors.push("date is missing");
    } else if (isNaN(Date.parse(entry.date))) {
      errors.push("date is invalid");
    }

    if (!entry.skill || entry.skill.trim() === "") {
      errors.push("skill is missing or empty");
    }

    if (!entry.lessonSummary|| entry.lessonSummary.trim() === "") {
      errors.push("lesson is missing or empty");
    }

    if (
      entry.selfAssessment=== "" ||
      isNaN(parseInt(entry.selfAssessment)) ||
      parseInt(entry.selfAssessment) < 1 ||
      parseInt(entry.selfAssessment) > 5
    ) {
      errors.push("selfAssessment must be a number from 1 to 5");
    }

    if (!entry.difficulties || entry.difficulty.trim() === "") {
      errors.push("difficulty is missing or empty");
    }

    if (!entry.planToImprove || entry.plan.trim() === "") {
      errors.push("plan is missing or empty");
    }

    if (entry.problemSolved !== "Yes" && entry.problemSolved !== "No") {
      errors.push("problemSolved must be 'Yes' or 'No'");
    }

    return errors;
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();

    const validationErrors = validateEntry(newEntry);
    if (validationErrors.length > 0) {
      console.error("❌ Invalid input:", validationErrors);
      setError("Dữ liệu không hợp lệ: " + validationErrors.join(", "));
      return;
    }

    const payload = {
      date: newEntry.date,
  semester: DEFAULT_SEMESTER,
  week: DEFAULT_WEEK,
  skill: newEntry.skill,
  lessonSummary: newEntry.lessonSummary,
  selfAssessment: parseInt(newEntry.selfAssessment),
  difficulties: newEntry.difficulties,
  planToImprove: newEntry.planToImprove,
  problemSolved: newEntry.problemSolved === "Yes",
    };

    console.log("🔍 Data sent to server:", payload);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/student/study-plans",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setStudyPlans((prev) => [...prev, response.data]);

      setNewEntry({
        date: "",
        skill: "",
        lessonSummary: "",
        selfAssessment: "",
        difficulties: "",
        planToImprove: "",
        problemSolved: "Yes",
      });

      setError(null);
    } catch (err) {
      if (err.response && err.response.data) {
        console.error("💥 Server responded with validation errors:", err.response.data);
        setError("Lỗi từ server: " + JSON.stringify(err.response.data));
      } else {
        console.error("❌ Unknown error:", err);
        setError("Lỗi không xác định");
      }
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Skill/ Module</th>
            <th className="border border-gray-300 p-2">My Lesson</th>
            <th className="border border-gray-300 p-2">Self - assessment (1-3)</th>
            <th className="border border-gray-300 p-2">My difficult</th>
            <th className="border border-gray-300 p-2">My plan</th>
            <th className="border border-gray-300 p-2">Problem solved</th>
          </tr>
        </thead>
        <tbody>
          {studyPlans.map((item) => (
<tr key={item.id} className="hover:bg-gray-50">
  {[
    "date",
    "skill",
    "lessonSummary",
    "selfAssessment",
    "difficulties",
    "planToImprove",
    "problemSolved",
  ].map((field) => (
    <td
      key={`${item.id}-${field}`} // ✅ Đây là chỗ cần sửa
      className={`border border-gray-300 p-2 ${
        editingCell.id === item.id && editingCell.field === field
          ? ""
          : "cursor-pointer"
      }`}
      onClick={() => handleEdit(item.id, field, item[field])}
    >
      {editingCell.id === item.id && editingCell.field === field ? (
        ["lessonSummary", "difficulties", "planToImprove"].includes(field) ? (
          <textarea
            className="w-full p-1 border border-teal-400 rounded"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => handleSave(item.id, field)}
            rows={3}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setEditingCell({ id: null, field: null })
              }
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSave(item.id, field)
              }
            }}
          />
        ) : field === "problemSolved" ? (
          <select
            className="w-full p-1 border border-teal-400 rounded"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => handleSave(item.id, field)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setEditingCell({ id: null, field: null })
              }
              if (e.key === "Enter") {
                handleSave(item.id, field)
              }
            }}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Partially">Partially</option>
          </select>
        ) : (
          <input
            className="w-full p-1 border border-teal-400 rounded"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => handleSave(item.id, field)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setEditingCell({ id: null, field: null })
              }
              if (e.key === "Enter") {
                handleSave(item.id, field)
              }
            }}
            autoFocus
          />
        )
      ) : (
        item[field]
      )}
    </td>
  ))}
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
                value={newEntry.lessonSummary}
                onChange={(e) => handleNewEntryChange("lessonSummary", e.target.value)}
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
                onChange={(e) => handleNewEntryChange("difficulties", e.target.value)}
              />
            </td>
            <td>
              <textarea
                className="w-full p-2 border border-[#009688] rounded"
                placeholder="Plan"
                rows={2}
                value={newEntry.planToImprove}
                onChange={(e) => handleNewEntryChange("planToImprove", e.target.value)}
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
          </tr>
        </tbody>
      </table>

      <button
        onClick={handleAddEntry}
        className="mt-4 px-4 py-2 bg-teal-600 text-white rounded flex items-center gap-2 hover:bg-teal-700 transition"
      >
        <Plus size={16} />
        Add Entry
      </button>
    </div>
  )
}

export default StudyPlanTable
