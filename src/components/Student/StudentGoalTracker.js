"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import GoalList from "./StudentGoalList"
import CreateGoalForm from "./StudentCreateFormGoal"
import GoalStats from "./StudentGoalStats"
import { GoalStatus } from "../../types/goal"
import {
  fetchGoals,
  createGoal,
  updateGoalStatus,
  deleteGoal as apiDeleteGoal,
  editGoal as apiEditGoal,
} from "../../service/api"

export default function GoalTracker() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch goals from API
  useEffect(() => {
    const token = localStorage.getItem("token")
    fetchGoals(token)
      .then((res) => {
        setGoals(res.data.data)
        // console.log("Goals from API:", res.data)
      })
      .catch((err) => {
        setError("Error fetching goals")
        console.error("Error fetching goals:", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const addGoal = async (goal) => {
    try {
      const token = localStorage.getItem("token")
      const res = await createGoal(goal, token)
      setGoals((prev) => [...prev, res.data.data])
    } catch (err) {
      console.error("Failed to add goal:", err)
    }
  }

  const updateGoalStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token")
      const res = await updateGoalStatus(id, status, token)
      setGoals(goals.map((goal) => (goal.goalID === id ? res.data.data : goal)))
    } catch (err) {
      console.error("Failed to update status:", err)
    }
  }

  const deleteGoal = async (id) => {
      try {
      const token = localStorage.getItem("token")
      await apiDeleteGoal(id, token)
      setGoals(goals.filter((goal) => goal.goalID !== id))
    } catch (err) {
      console.error("Failed to delete goal:", err)
    }
  }


  const editGoal = async (updatedGoal) => {
      try {
      const token = localStorage.getItem("token")
      const res = await apiEditGoal(updatedGoal, token)
      setGoals(goals.map((goal) => (goal.goalID === updatedGoal.goalID ? res.data.data : goal)))
    } catch (err) {
      console.error("Failed to edit goal:", err)
    }
  }

  // Statistics
  const semesterGoals = goals.filter((goal) => goal.semester === "2025-1")
  const completedGoals = semesterGoals.filter((goal) => goal.status === GoalStatus.Completed)
  const inProgressGoals = semesterGoals.filter((goal) => goal.status === GoalStatus.InProgress)
  const notStartedGoals = semesterGoals.filter((goal) => goal.status === GoalStatus.NotStarted)
  const completionRate =
    semesterGoals.length > 0 ? Math.round((completedGoals.length / semesterGoals.length) * 100) : 0

  if (loading) return <div>Loading goals...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="row mb-4">
        <div className="col-12">
          <GoalStats
            totalGoals={semesterGoals.length}
            completedGoals={completedGoals.length}
            inProgressGoals={inProgressGoals.length}
            notStartedGoals={notStartedGoals.length}
            completionRate={completionRate}
          />
        </div>
      </div>
      <div className="row gap-4">
        <div className="col-12 col-lg-8">
          <GoalList
            goals={goals}
            updateGoalStatus={updateGoalStatus}
            deleteGoal={deleteGoal}
            editGoal={editGoal}
          />
        </div>
        <div className="col-12 col-lg-4">
          <CreateGoalForm addGoal={addGoal} />
        </div>
      </div>
    </div>
  )
}