"use client"

import React, { useState } from "react"
import { GoalStatus } from "../../types/goal"
import { Calendar, BookOpen, Flag, Clock, BarChart2, FileText, Tag, PlusCircle } from "lucide-react"

export default function CreateGoalForm({ addGoal }) {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    semester: "Sem 2/2025",
    deadline: "",
    priority: "2",
    details: "",
    category: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    addGoal({
      ...formData,
      status: GoalStatus.NotStarted,
    })

    // Reset form
    setFormData({
      title: "",
      subject: "",
      semester: "Sem 2/2025",
      deadline: "",
      priority: "2",
      details: "",
      category: "",
    })
  }

  return (
    <div className="card create-goal-card">
      <div className="card-header">
        <h5 className="mb-0">Create Goal</h5>
      </div>

      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Goal title
            </label>
            <div className="input-with-icon">
              <Flag size={18} className="input-icon" />
              <input
                type="text"
                className="form-control pl-10"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter goal title"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <div className="input-with-icon">
              <BookOpen size={18} className="input-icon" />
              <input
                type="text"
                className="form-control pl-10"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <div className="input-with-icon">
              <Tag size={18} className="input-icon" />
              <input
                type="text"
                className="form-control pl-10"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="E.g., Assignment, Project, Reading"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="semester" className="form-label">
              Semester
            </label>
            <div className="input-with-icon">
              <Calendar size={18} className="input-icon" />
              <select
                className="form-select pl-10"
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleSelectChange}
              >
                <option value="Sem 1/2025">Sem 1/2025</option>
                <option value="Sem 2/2025">Sem 2/2025</option>
                <option value="Sem 1/2026">Sem 1/2026</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="deadline" className="form-label">
              Deadline
            </label>
            <div className="input-with-icon">
              <Clock size={18} className="input-icon" />
              <input
                type="text"
                className="form-control pl-10"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                placeholder="DD/MM/YYYY"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <div className="input-with-icon">
              <BarChart2 size={18} className="input-icon" />
              <select
                className="form-select pl-10"
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleSelectChange}
              >
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              </select>
            </div>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="details" className="form-label">
              Details
            </label>
            <div className="input-with-icon textarea-container">
              <FileText size={18} className="input-icon" style={{ top: "12px" }} />
              <textarea
                className="form-control pl-10"
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Enter goal details"
                rows={3}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 create-goal-btn">
            <PlusCircle size={18} />
            <span>Create New Goal</span>
          </button>
        </form>
      </div>
    </div>
  )
}