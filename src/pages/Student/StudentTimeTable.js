// filepath: d:\CodeSync\frontend\src\pages\student\StudentGoal.js
"use client"

import React from "react"
import Calendar from "../../components/Student/StudentCalendarView"
import "../../assets/css/StudentGoal.css";
import Header from "../../components/header"
import Footer from "../../components/footer"
import Navbar from "../../components/Student/StudentNavBar"; 
export default function StudentTimeTable() {
  
  return (
    <div >
      
      <Header />
      <Navbar />
      <Calendar  />
      <Footer />
      
    </div>
    
  )
}