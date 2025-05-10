// filepath: d:\CodeSync\frontend\src\pages\student\StudentGoal.js
"use client"

import React from "react"
import GoalTracker from "../../components/Student/goal-tracker"
import "../../assets/css/student-goal.css";
import Header from "../../components/header"
import Footer from "../../components/footer"
import Navbar from "../../components/Student/nav-bar"; 
export default function StudentGoal() {
  return (
    <div>
      <Header />
      <Navbar />
      <GoalTracker />
      <Footer />
      
    </div>
    
  )
}