import StudyPlanManagement from "../../components/Student/StudentStudyPlanManagement"
import "../../assets/css/StudentManagementStudy.css";
import Header from "../../components/header"
import Footer from "../../components/footer"
import Navbar from "../../components/Student/StudentNavBar";
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
