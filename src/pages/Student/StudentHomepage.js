import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Navbar from '../../components/Student/StudentNavBar';
import StudentHomeContent from '../../components/Student/StudentHomeContent';

import Calendar from './StudentCalendarView'; // ✅ Đúng thư mục
import SupportRequestFormBody from '../../components/Student/SupportRequestFormBody';

import '../../assets/css/StudentHomepage.css';

const StudentHomepage = () => {
  return (
    <div className="student-homepage">
      <Header />
      <Navbar />

      <div className="section">
        <StudentHomeContent />
      </div>

      <div className="section">
        <Calendar />
      </div>

      <div className="section">
        <SupportRequestFormBody /> {/* ✅ Đã sửa đúng tên component */}
      </div>

      <Footer />
    </div>
  );
};

export default StudentHomepage;
