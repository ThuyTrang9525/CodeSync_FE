"use client"

import { useState } from "react"
import { GoalStatus } from "../../types/goal"
import GoalItem from "./StudentGoalItem"

export default function GoalList({ goals, updateGoalStatus, deleteGoal, editGoal }) {
  const [activeTab, setActiveTab] = useState("all")

  const semesterGoals = goals.filter((goal) => goal.semester === "Sem 2/2025")
  const completedGoals = semesterGoals.filter((goal) => goal.status === GoalStatus.Completed)
  const inProgressGoals = semesterGoals.filter((goal) => goal.status === GoalStatus.InProgress)
  const notStartedGoals = semesterGoals.filter((goal) => goal.status === GoalStatus.NotStarted)

  const getFilteredGoals = () => {
    switch (activeTab) {
      case "completed":
        return completedGoals
      case "in-progress":
        return inProgressGoals
      case "not-started":
        return notStartedGoals
      default:
        return semesterGoals
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Semester goals</h5>
      </div>

      <div className="card-body p-0">
        <ul className="nav nav-tabs nav-fill px-3 pt-3">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
              All
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "completed" ? "active" : ""}`}
              onClick={() => setActiveTab("completed")}
            >
              Completed ({completedGoals.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "in-progress" ? "active" : ""}`}
              onClick={() => setActiveTab("in-progress")}
            >
              In Progress ({inProgressGoals.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "not-started" ? "active" : ""}`}
              onClick={() => setActiveTab("not-started")}
            >
              Not Started ({notStartedGoals.length})
            </button>
          </li>
        </ul>

        <div className="p-4">
          {getFilteredGoals().length > 0 ? (
            getFilteredGoals().map((goal) => (
              <GoalItem
                key={goal.id}
                goal={goal}
                updateGoalStatus={updateGoalStatus}
                deleteGoal={deleteGoal}
                editGoal={editGoal}
              />
            ))
          ) : (
            <div className="text-center py-4 text-muted">
              <p>No goals found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}