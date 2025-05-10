import StudyPlanManagement from "../../components/Student/study-plan-management"
import "../../assets/css/student-management-study.css";
import Header from "../../components/header"
import Footer from "../../components/footer"
import Navbar from "../../components/Student/nav-bar";
export default function StudentManagementStudy() {
  return (
    <div>
       <Header />
      <Navbar />
       <StudyPlanManagement />
        <Footer />
    </div>
       

  )
}
