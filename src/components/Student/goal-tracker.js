"use client"

import { useState } from "react"

import GoalList from "./goal-list"
import CreateGoalForm from "./create-goal-form"
import GoalStats from "./goal-stats"
import { GoalStatus } from "../../types/goal"

export default function GoalTracker() {
  const [goals, setGoals] = useState([
    {
      id: "1",
      title: "Review before the test",
      subject: "IT English",
      semester: "Sem 2/2025",
      deadline: "15/04/2025",
      status: GoalStatus.Completed,
      priority: "1",
      details: "Review all materials from chapters 1-5 before the final exam",
      category: "Exam Preparation",
    },
    {
      id: "2",
      title: "Finish reading ABC docs",
      subject: "IT English",
      semester: "Sem 2/2025",
      deadline: "20/04/2025",
      status: GoalStatus.InProgress,
      priority: "2",
      details: "Complete reading the documentation for the ABC framework",
      category: "Reading",
    },
    {
      id: "3",
      title: "Submit reflection report",
      subject: "IT English",
      semester: "Sem 2/2025",
      deadline: "25/04/2025",
      status: GoalStatus.NotStarted,
      priority: "3",
      details: "Write and submit a 2-page reflection on the course material",
      category: "Assignment",
    },
    {
      id: "4",
      title: "Complete programming assignment",
      subject: "Java Programming",
      semester: "Sem 2/2025",
      deadline: "18/04/2025",
      status: GoalStatus.InProgress,
      priority: "1",
      details: "Finish the Java programming assignment on data structures",
      category: "Assignment",
    },
    {
      id: "5",
      title: "Prepare presentation slides",
      subject: "Business Communication",
      semester: "Sem 2/2025",
      deadline: "22/04/2025",
      status: GoalStatus.NotStarted,
      priority: "2",
      details: "Create presentation slides for the final project",
      category: "Project",
    },
  ])

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Math.random().toString(36).substring(2, 9),
    }
    setGoals([...goals, newGoal])
  }

  const updateGoalStatus = (id, status) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, status } : goal)))
  }

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const editGoal = (updatedGoal) => {
    setGoals(goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)))
  }

  // Calculate statistics
  const semesterGoals = goals.filter((goal) => goal.semester === "Sem 2/2025")
  const completedGoals = semesterGoals.filter((goal) => goal.status === GoalStatus.Completed)
  const inProgressGoals = semesterGoals.filter((goal) => goal.status === GoalStatus.InProgress)
  const notStartedGoals = semesterGoals.filter((goal) => goal.status === GoalStatus.NotStarted)

  const completionRate = semesterGoals.length > 0 ? Math.round((completedGoals.length / semesterGoals.length) * 100) : 0

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
            <GoalList goals={goals} updateGoalStatus={updateGoalStatus} deleteGoal={deleteGoal} editGoal={editGoal} />
          </div>
          <div className="col-12 col-lg-4">
            <CreateGoalForm addGoal={addGoal} />
          </div>
        </div>
      
      
    </div>
  )
}