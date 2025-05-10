// filepath: d:\CodeSync\frontend\src\pages\student\StudentGoal.js
"use client"

import React from "react"
import GoalTracker from "../../components/Student/StudentGoalTracker"
import "../../assets/css/StudentGoal.css";
import Header from "../../components/header"
import Footer from "../../components/footer"
import Navbar from "../../components/Student/StudentNavBar"; 
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