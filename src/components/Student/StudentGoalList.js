import { useState, useEffect } from "react";
import axios from "axios";
import GoalItem from "./StudentGoalItem";
import { updateGoalStatus } from "../../service/api"

export default function GoalList({ goals, updateGoalStatus, deleteGoal, editGoal }) {
  const [activeTab, setActiveTab] = useState("all");

  // Filter goals by status
  const completedGoals = goals.filter((goal) => goal.status === "completed");
  const inProgressGoals = goals.filter((goal) => goal.status === "in-progress");
  const notStartedGoals = goals.filter((goal) => goal.status === "not-started");

  const getFilteredGoals = () => {
    switch (activeTab) {
      case "completed":
        return completedGoals;
      case "in-progress":
        return inProgressGoals;
      case "not-started":
        return notStartedGoals;
      default:
        return goals;
    }
  };

  // Hàm cập nhật trạng thái goal
   const handleChangeStatus = (goalId, newStatus) => {
    if (!goalId) {
      console.error('Goal ID is missing')
      return
    }
    const token = localStorage.getItem("token")
    updateGoalStatus(goalId, newStatus, token)
      .then(response => {
        console.log('Goal updated successfully:', response.data.data)
        // Cập nhật UI nếu cần
      })
      .catch(error => {
        console.error('Failed to update goal:', error)
      })
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
                key={goal.goalID}  // Đảm bảo 'id' được sử dụng làm key duy nhất cho mỗi goal
                goal={goal}
                updateGoalStatus={handleChangeStatus}  // Truyền đúng hàm handleChangeStatus
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
  );
}
