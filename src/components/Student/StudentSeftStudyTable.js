import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

import {
  getSelfStudyPlans,
  createSelfStudyPlan,
  updateSelfStudyPlan,
  deleteSelfStudyPlan,
} from "../../service/api"
const USER_ID = 1; // Cập nhật theo user đăng nhập thực tế

const SelfStudyTable = ({ semester, week }) => {
  const [selfStudyData, setSelfStudyData] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: "",
    skill: "",
    lesson: "",
    time_allocation: "",
    resources: "",
    activities: "",
    evaluation: "",
    notes: "",
    concentration: "",
  });
  const [editingCell, setEditingCell] = useState({ id: null, field: null });
  const [editValue, setEditValue] = useState("");

   useEffect(() => {
    const token = localStorage.getItem("token")
    getSelfStudyPlans(semester, token)
      .then((response) => {
        setSelfStudyData(response.data.filter(item => String(item.week) === String(week)))
      })
      .catch((error) => {
        console.error("Failed to fetch data", error)
      })
  }, [semester, week])

  const handleNewEntryChange = (field, value) => {
    setNewEntry({ ...newEntry, [field]: value });
  };

const handleAddEntry = () => {
  if (!newEntry.date || !newEntry.skill) {
    console.warn("Missing required fields: date or skill");
    return;
  }
    const token = localStorage.getItem("token")
  const dataToSend = {
    userID: USER_ID,
    semester,
    week,
    date: newEntry.date,
    skill: newEntry.skill,
    lessonSummary: newEntry.lesson,
    time_allocation: newEntry.time_allocation,
    resources: newEntry.resources,
    activities: newEntry.activities,
    evaluation: newEntry.evaluation,
    concentration: "",
    notes: "",
  };
createSelfStudyPlan(dataToSend, token)
      .then((response) => {
        setSelfStudyData([...selfStudyData, response.data])
        setNewEntry({
          date: "",
          skill: "",
          lesson: "",
          time_allocation: "",
          resources: "",
          activities: "",
          evaluation: "",
          notes: "",
          concentration: "",
        })
      })
      .catch((error) => {
        if (error.response) {
          console.error("Server responded with error:", error.response.data)
        } else if (error.request) {
          console.error("Request made but no response received:", error.request)
        } else {
          console.error("Error setting up request:", error.message)
        }
      })
  }
 
 

  const handleEdit = (id, field, value) => {
    setEditingCell({ id, field });
    setEditValue(value);
  };

  const handleSave = (id, field) => {
    const updatedItem = selfStudyData.find((item) => item.planID === id)
    if (!updatedItem) return
    const token = localStorage.getItem("token")
    const updatedValue = {
      ...updatedItem,
      [field]: editValue,
    }
    updateSelfStudyPlan(id, updatedValue, token)
      .then(() => {
        setSelfStudyData(
          selfStudyData.map((item) => (item.planID === id ? updatedValue : item))
        )
        setEditingCell({ id: null, field: null })
      })
      .catch((error) => {
        console.error("Failed to update entry", error)
      })
  }
  const handleDelete = (id) => {
    const token = localStorage.getItem("token")
    deleteSelfStudyPlan(id, token)
      .then(() => {
        setSelfStudyData(selfStudyData.filter((item) => item.planID !== id))
      })
      .catch((error) => {
        console.error("Failed to delete entry", error)
      })
  }

 const renderCell = (item, field) => {
    const value = item[field]
    if (editingCell.id === item.planID && editingCell.field === field) {
      return (
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => handleSave(item.planID, field)}
          autoFocus
        />
      )
    }
    return (
      <div onClick={() => handleEdit(item.planID, field, value)}>{value}</div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100 text-xs text-left">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Skill/Module</th>
            <th className="p-2 border">My Lesson</th>
            <th className="p-2 border">Time Allocation</th>
            <th className="p-2 border">Resources</th>
            <th className="p-2 border">Activities</th>
            <th className="p-2 border">Evaluation</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {selfStudyData.map((item) => (
            <tr key={item.planID} className="border-t hover:bg-gray-50">
              <td className="p-2 border">{renderCell(item, "date")}</td>
              <td className="p-2 border">{renderCell(item, "skill")}</td>
              <td className="p-2 border">{renderCell(item, "lessonSummary")}</td>
              <td className="p-2 border">{renderCell(item, "time_allocation")}</td>
              <td className="p-2 border">{renderCell(item, "resources")}</td>
              <td className="p-2 border">{renderCell(item, "activities")}</td>
              <td className="p-2 border">{renderCell(item, "evaluation")}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(item.planID)}
                  className="text-red-500 hover:underline text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
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
                onChange={(e) => handleNewEntryChange("time_allocation", e.target.value)}
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
      </table>
    </div>
  );
};

export default SelfStudyTable;
