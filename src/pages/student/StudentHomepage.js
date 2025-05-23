import StudentHomeContent from "../../components/Student/StudentHomeContent"
import Header from "../../components/header"
import Footer from "../../components/footer"
import Navbar from "../../components/Student/StudentNavBar";
import "../../assets/css/StudentHomepage.css"

export default function StudentHomepage() {
    return(
    <div className="student-homepage ">
      <Header />
      <Navbar />
      <StudentHomeContent />
      <Footer />
    </div>
    )
}