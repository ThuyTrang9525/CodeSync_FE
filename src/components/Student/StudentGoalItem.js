"use client"

import React, { useState, useEffect } from "react"
import { GoalStatus } from "../../types/goal"
import { updateGoalStatus , deleteGoal, editGoal} from "../../service/api"
import { Calendar, ChevronDown, ChevronUp } from "lucide-react"

export default function GoalItem({ goal: initialGoal }) {
  const [goal, setGoal] = useState(initialGoal)
  const [expanded, setExpanded] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editData, setEditData] = useState(initialGoal)
  const token = localStorage.getItem("token")

  useEffect(() => {
    setGoal(initialGoal)
    setEditData(initialGoal)
  }, [initialGoal])

  const handleStatusChange = async () => {
    let newStatus
    switch (goal.status) {
      case GoalStatus.NotStarted:
        newStatus = GoalStatus.InProgress
        break
      case GoalStatus.InProgress:
        newStatus = GoalStatus.Completed
        break
      case GoalStatus.Completed:
        newStatus = GoalStatus.InProgress
        break
      default:
        newStatus = GoalStatus.NotStarted
    }
    try {
      const res = await updateGoalStatus(goal.goalID, { ...goal, status: newStatus }, token)
      setGoal(res.data.data)
    } catch (error) {
      console.error("Failed to update goal status:", error)
    }
  }

  const handleDelete = () => {
    deleteGoal(goal.goalID)
  }

  // Xử lý lưu chỉnh sửa
  const handleEditSave = async (e) => {
    e.preventDefault()
    try {
      await editGoal(editData, token)// editGoal là prop từ cha, cha sẽ gọi API và cập nhật lại state goals
      setShowEdit(false)
    } catch (err) {
      alert("Có lỗi khi lưu goal. Vui lòng thử lại.")
    }
  }

  // Form chỉnh sửa đầy đủ trường
  const renderEditForm = () => (
    <form onSubmit={handleEditSave} className="p-3 border rounded bg-light mb-3">
      <div className="mb-2">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={editData.title}
          onChange={e => setEditData({ ...editData, title: e.target.value })}
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          value={editData.description}
          onChange={e => setEditData({ ...editData, description: e.target.value })}
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Semester</label>
        <input
          className="form-control"
          value={editData.semester}
          onChange={e => setEditData({ ...editData, semester: e.target.value })}
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Week</label>
        <input
          className="form-control"
          value={editData.week}
          onChange={e => setEditData({ ...editData, week: e.target.value })}
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Deadline</label>
        <input
          type="date"
          className="form-control"
          value={editData.deadline}
          onChange={e => setEditData({ ...editData, deadline: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Priority</label>
        <select
          className="form-control"
          value={editData.priority}
          onChange={e => setEditData({ ...editData, priority: e.target.value })}
        >
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>
      </div>
      <div className="d-flex gap-2 mt-2">
        <button type="submit" className="btn btn-primary btn-sm">Save</button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowEdit(false)}>Cancel</button>
      </div>
    </form>
  )

  const getStatusBadgeClass = () => {
    switch (goal.status) {
      case GoalStatus.Completed:
        return "badge-success"
      case GoalStatus.InProgress:
        return "badge-warning"
      case GoalStatus.NotStarted:
        return "badge-secondary"
      default:
        return ""
    }
  }

  const getStatusText = () => {
    switch (goal.status) {
      case GoalStatus.Completed:
        return "Completed"
      case GoalStatus.InProgress:
        return "In Progress"
      case GoalStatus.NotStarted:
        return "Not Started"
      default:
        return ""
    }
  }

  const getItemClass = () => {
    const baseClass = "goal-item card mb-3"
    switch (goal.status) {
      case GoalStatus.Completed:
        return `${baseClass} completed`
      case GoalStatus.InProgress:
        return `${baseClass} in-progress`
      case GoalStatus.NotStarted:
        return `${baseClass} not-started`
      default:
        return baseClass
    }
  }

  return (
    <div className={getItemClass()}>
      <div className="card-body p-3">
        <div className="d-flex align-items-center gap-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={goal.status === GoalStatus.Completed}
              onChange={handleStatusChange}
              id={`goal-${goal.goalID}`}
            />
            <label className="form-check-label visually-hidden" htmlFor={`goal-${goal.goalID}`}>
              {goal.status === GoalStatus.Completed ? "Unmark as completed" : "Mark as completed"}
            </label>
          </div>
          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-2 mb-1">
              <h6 className="mb-0">{goal.title}</h6>
              <span className={`badge ${getStatusBadgeClass()}`}>{getStatusText()}</span>
            </div>
            <div className="d-flex align-items-center gap-3 text-muted" style={{ fontSize: "0.875rem" }}>
              <span>{goal.semester}</span>
              <span>{goal.week}</span>
              <span className="d-flex align-items-center gap-1">
                <Calendar size={14} />
                {goal.deadline}
              </span>
            </div>
          </div>
          <button
            className="btn btn-sm btn-light p-1"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls={`goal-details-${goal.goalID}`}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        {expanded && (
          <div id={`goal-details-${goal.goalID}`} className="mt-3 pt-3 border-top">
            {showEdit ? (
              renderEditForm()
            ) : (
              <>
                <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                  <p>
                    <strong>Details:</strong> {goal.description}
                  </p>
                  <p className="mb-1">
                    <strong>Semester:</strong> {goal.semester}
                  </p>
                  <p className="mb-1">
                    <strong>Week:</strong> {goal.week}
                  </p>
                  <p className="mb-1">
                    <strong>Deadline:</strong> {goal.deadline}
                  </p>
                  <p className="mb-1">
                    <strong>Priority:</strong> {goal.priority === "1" ? "High" : goal.priority === "2" ? "Medium" : "Low"}
                  </p>
                </div>
                <div className="mt-3 d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => setShowEdit(true)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}