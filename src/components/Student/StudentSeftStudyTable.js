import React, { useEffect, useState, useRef } from "react"
import { Plus, MessageSquare } from "lucide-react"; // Icon comment
import {
  getSelfStudyPlans,
  createSelfStudyPlan,
  updateSelfStudyPlan,
  deleteSelfStudyPlan,
} from "../../service/api";
import CommentsSection from "./StudentCommentsSection"; // Import component bình luận

const USER_ID = localStorage.getItem("userId");

const SelfStudyTable = ({ semester, week }) => {
  const [selfStudyData, setSelfStudyData] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: "",
    skill: "",
    lesson: "",
    time_allocation: "",
    concentration: "",
    resources: "",
    activities: "",
    evaluation: "",
    notes: "",
    concentration: "",
  });
  const [editingCell, setEditingCell] = useState({ planID: null, field: null });
  const [editValue, setEditValue] = useState("");
  
  // State để quản lý comment đang mở
  const [showCommentsFor, setShowCommentsFor] = useState(null);
  const commentButtonRefs = useRef({});
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [commentCounts, setCommentCounts] = useState({});
useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await getSelfStudyPlans(semester, token);
      const filteredData = response.data.filter(item => String(item.week) === String(week));
      setSelfStudyData(filteredData);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  fetchData();
}, [semester, week]);


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
    setNewEntry({ ...newEntry, [field]: value });
  };

  const handleAddEntry = () => {
    if (!newEntry.date || !newEntry.skill) {
      console.warn("Missing required fields: date or skill");
      return;
    }
    const token = localStorage.getItem("token");
    const dataToSend = {
      userID: USER_ID,
      semester,
      week,
      date: newEntry.date,
      skill: newEntry.skill,
      lessonSummary: newEntry.lesson,
      time_allocation: newEntry.time_allocation,
      concentration: newEntry.concentration,
      resources: newEntry.resources,
      activities: newEntry.activities,
      evaluation: newEntry.evaluation,

      notes: "",
    };
    createSelfStudyPlan(dataToSend, token)
      .then((response) => {
        setSelfStudyData([...selfStudyData, response.data]);
        setNewEntry({
          date: "",
          skill: "",
          lesson: "",
          time_allocation: "",
          concentration: "",
          resources: "",
          activities: "",
          evaluation: "",
          notes: "",
        });
      })
      .catch((error) => {
        if (error.response) {
          console.error("Server responded with error:", error.response.data);
        } else if (error.request) {
          console.error("Request made but no response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      });
  };

  const handleEdit = (planID, field, value) => {
    setEditingCell({ planID, field });
    setEditValue(value);
  };

const handleSave = async (planID, field) => {
  const updatedItem = selfStudyData.find((item) => item.planID === planID);
  if (!updatedItem) return;

  const token = localStorage.getItem("token");
  const updatedValue = {
    ...updatedItem,
    [field]: editValue,
  };

  try {
    const response = await updateSelfStudyPlan(planID, updatedValue, token);
    console.log("Update success:", response.data);
    setSelfStudyData(
      selfStudyData.map((item) => (item.planID === planID ? updatedValue : item))
    );
    setEditingCell({ planID: null, field: null });
  } catch (error) {
    if (error.response) {
      console.error("Server responded with error:", error.response.status, error.response.data);
      // Có thể thêm thông báo lỗi hiển thị UI ở đây
    } else {
      console.error("Failed to update entry", error.message);
    }
  }
};


  const handleDelete = (planID) => {
    const token = localStorage.getItem("token");
    deleteSelfStudyPlan(planID, token)
      .then(() => {
        setSelfStudyData(selfStudyData.filter((item) => item.planID !== planID));
      })
      .catch((error) => {
        console.error("Failed to delete entry", error);
      });
  };

  const renderCell = (item, field) => {
    const value = item[field];
    if (editingCell.planID === item.planID && editingCell.field === field) {
      return (
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => handleSave(item.planID, field)}
          autoFocus
          className="w-full text-xs"
        />
      );
    }
    return (
      <div onClick={() => handleEdit(item.planID, field, value)} className="cursor-pointer">
        {value}
      </div>
    );
  };
return (
    <div className="relative overflow-x-auto max-w-full">
      <table className="min-w-max border border-gray-300 text-sm table-fixed">
        <thead>
          <tr className="bg-gray-100 text-xs text-left">
            <th className="p-2 border w-24">Date</th>
            <th className="p-2 border w-32">Skill/Module</th>
            <th className="p-2 border w-40">My Lesson</th>
            <th className="p-2 border w-28">Time Allocation</th>
            <th className="p-2 border w-32">Concentration (.../10)</th>
            <th className="p-2 border w-32">Resources</th>
            <th className="p-2 border w-32">Activities</th>
            <th className="p-2 border w-28">Evaluation</th>
            <th className="p-2 border w-24 text-center">Comments</th>
            <th className="p-2 border w-16 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {selfStudyData.map((item) => (
            <tr key={item.planID} className="border-t hover:bg-gray-50 relative">
              <td className="p-2 border">{renderCell(item, "date")}</td>
              <td className="p-2 border">{renderCell(item, "skill")}</td>
              <td className="p-2 border">{renderCell(item, "lessonSummary")}</td>
              <td className="p-2 border">{renderCell(item, "time_allocation")}</td>
              <td className="p-2 border">{renderCell(item, "concentration")}</td>
              <td className="p-2 border">{renderCell(item, "resources")}</td>
              <td className="p-2 border">{renderCell(item, "activities")}</td>
              <td className="p-2 border">{renderCell(item, "evaluation")}</td>
              <td className="p-2 border text-center">
                <button
                  ref={(el) => (commentButtonRefs.current[item.planID] = el)}
                  onClick={() => toggleComments(item.planID)}
                  className="flex items-center justify-center gap-1 text-blue-600 hover:text-blue-800"
                  title="Toggle comments"
                >
                  <MessageSquare size={18} />
                  <span className="text-xs">{commentCounts[item.planID] || 0}</span>
                </button>
              </td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => handleDelete(item.planID)}
                  className="text-red-500 hover:underline text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {/* Dòng thêm mới */}
          <tr className="bg-gray-50">
            <td className="p-2 border">
              <input
                type="date"
                value={newEntry.date}
                onChange={(e) => handleNewEntryChange("date", e.target.value)}
                className="w-full text-xs"
              />
            </td>
            <td className="p-2 border">
              <input
                value={newEntry.skill}
                onChange={(e) => handleNewEntryChange("skill", e.target.value)}
                className="w-full text-xs"
              />
            </td>
            <td className="p-2 border">
              <input
                value={newEntry.lesson}
                onChange={(e) => handleNewEntryChange("lesson", e.target.value)}
                className="w-full text-xs"
              />
            </td>
            <td className="p-2 border">
              <input
                value={newEntry.time_allocation}
                onChange={(e) =>
                  handleNewEntryChange("time_allocation", e.target.value)
                }
                className="w-full text-xs"
              />
            </td>
            <td className="p-2 border">
              <input
                value={newEntry.concentration}
                onChange={(e) => handleNewEntryChange("concentration", e.target.value)}
                className="w-full text-xs"
              />
            </td>
            <td className="p-2 border">
              <input
                value={newEntry.resources}
                onChange={(e) => handleNewEntryChange("resources", e.target.value)}
                className="w-full text-xs"
              />
            </td>
            <td className="p-2 border">
              <input
                value={newEntry.activities}
                onChange={(e) => handleNewEntryChange("activities", e.target.value)}
                className="w-full text-xs"
              />
            </td>
            <td className="p-2 border">
              <input
                value={newEntry.evaluation}
                onChange={(e) => handleNewEntryChange("evaluation", e.target.value)}
                className="w-full text-xs"
              />
            </td>
            <td className="p-2 border"></td>
            <td className="p-2 border text-center">
              <button
                onClick={handleAddEntry}
                className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded"
              >
                <Plus size={14} />
              </button>
            </td>
          </tr>
      </tbody>

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

    </table>
    </div>
  );
};

export default SelfStudyTable;