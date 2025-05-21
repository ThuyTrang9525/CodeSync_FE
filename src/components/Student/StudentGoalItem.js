"use client"

import React, { useState } from "react"
import { useEffect } from "react"; // Import useEffect từ React
import axios from "axios"; // Import axios để thực hiện các yêu cầu HTTP
import { GoalStatus } from "../../types/goal"
import { fetchGoals, updateGoalStatus } from "../../service/api"
import { Calendar, ChevronDown, ChevronUp } from "lucide-react"
export default function GoalItem({ goal: initialGoal, deleteGoal, editGoal }) {
  const [goal, setGoal] = useState(initialGoal)
  const [expanded, setExpanded] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const token = localStorage.getItem("token")
 useEffect(() => {
    const getGoal = async () => {
      try {
        const res = await fetchGoals(token)
        const updatedGoal = res.data.data.find((g) => g.goalID === initialGoal.goalID)
        if (updatedGoal && updatedGoal.status !== goal.status) {
          setGoal(updatedGoal)
        }
      } catch (error) {
        console.error("Failed to fetch goal from API:", error)
      }
    }
    getGoal()
  }, [initialGoal.goalID])
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
      console.log("Goal updated successfully:", res.data.data)
    } catch (error) {
      console.error("Failed to update goal status:", error)
    }
  }

  const handleDelete = () => {
    deleteGoal(goal.id)
    setShowModal(false)
  }

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
              Mark as completed
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
          <div id={`goal-details-${goal.id}`} className="mt-3 pt-3 border-top">
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
                <strong>Priority:</strong> {goal.priority === "1" ? "High" : goal.priority === "2" ? "Medium" : "Low"}
              </p>
             
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