"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

export default function SelfStudyTable() {
  const [selfStudyData, setSelfStudyData] = useState([]);
  const [semester, setSemester] = useState(1); // hoặc giá trị mặc định phù hợp
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingCell, setEditingCell] = useState({ id: null, field: null });
  const [editValue, setEditValue] = useState("");
  const [newEntry, setNewEntry] = useState({
    date: "",
    skill: "",
    lesson: "",
    timeAllocation: "",
    learningResources: "",
    learningActivity: "",
    evaluation: "",
  });

  const token = localStorage.getItem("token");

  // Lấy dữ liệu từ API khi load hoặc đổi semester
  useEffect(() => {
    const fetchSelfStudyPlans = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/student/study-plans/semester/${semester}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        // Nếu API trả về {data: [...]}, dùng response.data.data
        setSelfStudyData(Array.isArray(response.data) ? response.data : response.data.data);
      } catch (err) {
        setError("Lỗi khi lấy dữ liệu từ server");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSelfStudyPlans();
  }, [semester, token]);

  // Bắt đầu chỉnh sửa
  const handleEdit = (id, field, value) => {
    setEditingCell({ id, field });
    setEditValue(value);
  };

  // Lưu chỉnh sửa lên server
  const handleSave = async (id, field) => {
    const updatedItem = selfStudyData.find((item) => item.id === id);
    if (!updatedItem) return;
    const updated = { ...updatedItem, [field]: editValue };
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
      );
      setSelfStudyData(
        selfStudyData.map((item) => (item.id === id ? updated : item))
      );
    } catch (err) {
      setError("Lỗi khi cập nhật");
      console.error(err);
    }
    setEditingCell({ id: null, field: null });
    setEditValue("");
  };

  // Xử lý thay đổi input khi thêm mới
  const handleNewEntryChange = (field, value) => {
    setNewEntry({
      ...newEntry,
      [field]: value,
    });
  };

  // Thêm mới lên server
  const handleAddEntry = async (e) => {
    e.preventDefault();
    if (!newEntry.date || !newEntry.skill) return;
    try {
      const response = await axios.post(
        "http://localhost:8000/api/student/study-plans",
        { ...newEntry, semester },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      // Nếu API trả về object mới, thêm vào state
      setSelfStudyData([...selfStudyData, response.data]);
      setNewEntry({
        date: "",
        skill: "",
        lesson: "",
        timeAllocation: "",
        learningResources: "",
        learningActivity: "",
        evaluation: "",
      });
    } catch (err) {
      setError("Lỗi khi thêm mới");
      console.error(err);
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>{error}</div>;

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
                className={editingCell.id === item.id && editingCell.field === "learningResources" ? "" : "editable-cell"}
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
                className={editingCell.id === item.id && editingCell.field === "learningActivity" ? "" : "editable-cell"}
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
  );
}