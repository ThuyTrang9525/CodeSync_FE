"use client"
// import axios from "axios"
import React, { useState } from "react"
// import { GoalStatus } from "../../types/goal"
import { createGoal } from "../../service/api"
import "../../assets/css/StudentFormGoal.css"
import { Calendar, BookOpen, Flag, Clock, BarChart2, FileText, Tag, PlusCircle } from "lucide-react"

export default function CreateGoalForm({ addGoal }) {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    week: "",
    semester: "Sem 2/2025",
    deadline: "",
    priority: "2",
    description: "",
    category: "",
  })
 const token = localStorage.getItem("token")
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Form data being sent:', formData);
  try {
    const response = await createGoal(formData, token);

    console.log('Full Response:', response);

    if (response.status === 201 && response.data.data) {
      console.log('Goal created:', response.data.data);
      // Call addGoal or other success handling logic here
    } else {
      throw new Error('Goal creation returned unexpected response');
    }
  } catch (error) {
    console.error('Create goal failed:', error.response ? error.response.data : error.message);
    alert('There was an issue creating your goal. Please try again later.');
  }
};


 return (
    <div>
      <form onSubmit={handleSubmit} className="custom-form">
      <h1>Create Goal</h1>
        <div className="form-group">
          <label htmlFor="title">Goal title</label>
          <div className="input-with-icon">
            <Flag size={18} className="input-icon" />
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter goal title"
              required
              className="pl-10"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <div className="input-with-icon">
            <BookOpen size={18} className="input-icon" />
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              required
              className="pl-10"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="week">Week</label>
          <div className="input-with-icon">
            <BookOpen size={18} className="input-icon" />
            <input
              type="text"
              id="week"
              name="week"
              value={formData.week}
              onChange={handleChange}
              placeholder="Enter week"
              required
              className="pl-10"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <div className="input-with-icon">
            <Tag size={18} className="input-icon" />
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="E.g., Assignment, Project, Reading"
              className="pl-10"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="semester">Semester</label>
          <div className="input-with-icon">
            <Calendar size={18} className="input-icon" />
            <select
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleSelectChange}
              className="pl-10"
            >
              <option value="Sem 1/2025">2025-1</option>
              <option value="Sem 2/2025">2025-2</option>
              <option value="Sem 1/2026">2026-1</option>
              <option value="Sem 2/2026">2026-2</option>
              <option value="Sem 1/2027">2027-1</option>
              <option value="Sem 2/2027">2027-2</option>
              <option value="Sem 1/2028">2028-1</option>
              <option value="Sem 2/2028">2028-2</option>
              <option value="Sem 1/2029">2029-1</option>
              <option value="Sem 2/2029">2029-2</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <div className="input-with-icon">
            <Clock size={18} className="input-icon" />
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="pl-10"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <div className="input-with-icon">
            <BarChart2 size={18} className="input-icon" />
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleSelectChange}
              className="pl-10"
            >
              <option value="1">High</option>
              <option value="2">Medium</option>
              <option value="3">Low</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <div className="input-with-icon">
            <FileText size={18} className="input-icon" style={{ top: "12px" }} />
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter goal description"
              rows={3}
              required
              className="pl-10"
            />
          </div>
        </div>

        <button type="submit">
          <PlusCircle size={18} />
          <span style={{ marginLeft: "8px" }}>Create New Goal</span>
        </button>
      </form>
    </div>
  );
};
