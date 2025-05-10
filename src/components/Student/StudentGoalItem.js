"use client"

import React, { useState } from "react"
import { GoalStatus } from "../../types/goal"
import { Calendar, ChevronDown, ChevronUp } from "lucide-react"

export default function GoalItem({ goal, updateGoalStatus, deleteGoal, editGoal }) {
  const [expanded, setExpanded] = useState(false)
  const [showModal, setShowModal] = useState(false)
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

  const handleStatusChange = (e) => {
    if (e.target.checked) {
      updateGoalStatus(goal.id, GoalStatus.Completed)
    } else {
      updateGoalStatus(goal.id, GoalStatus.InProgress)
    }
  }

  const handleDelete = () => {
    deleteGoal(goal.id)
    setShowModal(false)
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
              id={`goal-${goal.id}`}
            />
            <label className="form-check-label visually-hidden" htmlFor={`goal-${goal.id}`}>
              Mark as completed
            </label>
          </div>

          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-2 mb-1">
              <h6 className="mb-0">{goal.title}</h6>
              <span className={`badge ${getStatusBadgeClass()}`}>{getStatusText()}</span>
            </div>

            <div className="d-flex align-items-center gap-3 text-muted" style={{ fontSize: "0.875rem" }}>
              <span>{goal.subject}</span>
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
            aria-controls={`goal-details-${goal.id}`}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {expanded && (
          <div id={`goal-details-${goal.id}`} className="mt-3 pt-3 border-top">
            <div className="text-muted" style={{ fontSize: "0.875rem" }}>
              <p>
                <strong>Details:</strong> {goal.details}
              </p>
              <p className="mb-1">
                <strong>Semester:</strong> {goal.semester}
              </p>
              <p className="mb-1">
                <strong>Priority:</strong> {goal.priority === "1" ? "High" : goal.priority === "2" ? "Medium" : "Low"}
              </p>
              {goal.category && (
                <p className="mb-0">
                  <strong>Category:</strong> {goal.category}
                </p>
              )}
            </div>

            <div className="mt-3 d-flex gap-2">
              <button className="btn btn-sm btn-outline-primary" onClick={() => editGoal(goal)}>
                Edit
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}