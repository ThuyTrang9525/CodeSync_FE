"use client"
import { useState, useEffect, useMemo, useRef } from "react"
import { useParams,useNavigate } from "react-router-dom"
import { Plus, MessageSquare } from "lucide-react"; 
import GoalItem from "../../components/Student/StudentGoalItem"
import ChatWidget from "../../components/Teacher/TeacherChatBox"
import CommentsSection from "../../components/Student/StudentCommentsSection";
import { StudentById } from "../../service/api"
import { handleSetDeadline } from "../../service/api"
import SemesterWeekSelector from "../../components/Student/StudentWeekSelector"


export default function StudentDetailView() {
  const { studentId } = useParams()
  const [activeTab, setActiveTab] = useState("profile")
  const [student, setStudent] = useState(null)
  const [showCommentsFor, setShowCommentsFor] = useState(null);
  const commentButtonRefs = useRef({});
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [commentCounts, setCommentCounts] = useState({});
  const [semester, setSemester] = useState("2025-1")
  const [week, setWeek] = useState("1")
  const currentUserEmail = localStorage.getItem("email");
  const navigate = useNavigate();
   const toggleComments = (planID) => {
    if (showCommentsFor === planID) {
      setShowCommentsFor(null);
    } else {
      const btn = commentButtonRefs.current[planID];
      if (btn) {
        const rect = btn.getBoundingClientRect();
        setPopupPosition({
          top: rect.bottom + window.scrollY + 5, 
          left: rect.left + window.scrollX,
        });
      }
      setShowCommentsFor(planID);
    }
  };
   useEffect(() => {
    const loadStudent = async () => {
      if (studentId) {
        try {
          const data = await StudentById(studentId);
          setStudent(data);
          console.log("API data:", data);
        } catch (err) {
        }
      }
    };

    loadStudent();
  }, [studentId]);

  const completedGoals = useMemo(() => {
    return student?.goals?.filter((g) => g.status === "completed") || []
  }, [student])

  const inProgressGoals = useMemo(() => {
    return student?.goals?.filter((g) => g.status === "in-progress") || []
  }, [student])

  const notStartedGoals = useMemo(() => {
    return student?.goals?.filter((g) => g.status === "not-started") || []
  }, [student])

  const getFilteredGoals = () => {
    switch (activeTab) {
      case "completed":
        return completedGoals
      case "in-progress":
        return inProgressGoals
      case "not-started":
        return notStartedGoals
      default:
        return student?.goals || []
    }
  }

   const certificates = [
        {
            id: 1,
            title: "Certificate Google AI Essentials",
            description:
                'Certificate of completion for the "Google AI Essentials" course awarded to Nguyen Thi Ha Sang on April 15, 2023 through Coursera, verifying foundational knowledge in Artificial Intelligence.',
            imageUrl: "https://fagopet.vn/storage/8p/hw/8phwlfug4xt1aa568qdmadttvcz2_gia-meo-anh-long-dai-trang-1.webp",
        },
        {
            id: 2,
            title: "Microsoft Azure Fundamentals",
            description:
                'Certificate of completion for the "Microsoft Azure Fundamentals" course awarded to Nguyen Thi Ha Sang on June 10, 2023, validating essential skills in cloud computing and Microsoft Azure services.',
            imageUrl: "https://fagopet.vn/storage/8p/hw/8phwlfug4xt1aa568qdmadttvcz2_gia-meo-anh-long-dai-trang-1.webp",
        },
        {
            id: 3,
            title: "AWS Cloud Practitioner",
            description:
                'Certificate of completion for the "AWS Cloud Practitioner" certification earned by Nguyen Thi Ha Sang on August 22, 2023, demonstrating comprehensive understanding of AWS cloud infrastructure and services.',
            imageUrl: "https://fagopet.vn/storage/8p/hw/8phwlfug4xt1aa568qdmadttvcz2_gia-meo-anh-long-dai-trang-1.webp",
        },
    ];

  if (!student) return <p>Loading...</p>

  const renderProfile = () => {
  const p = student.profile || {};

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <div className="user-info">
          <div className="avatar">
            <div className="avatar-inner">
              {p.avatarURL ? (
                <img
                  src={p.avatarURL}
                  alt="Avatar"
                  className="achievement-img rounded-full"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
              ) : (
                <div className="avatar-icon">👤</div>
              )}
            </div>
          </div>
          <div className="user-details">
            <h2 className="user-name">{p.name}</h2>
            <p className="user-email">{p.email}</p>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        <h1 className="section-title">My Profile</h1>

        <div className="achievements-section">
          <div className="achievements-header">
            <div className="achievements-title">
              <span className="trophy-icon">🏆</span>
              <h2>Achievements</h2>
            </div>
          </div>

          <p className="congrats-text">Congratulations on completing this challenge!</p>

          <div className="certificates-grid">
            {certificates.map((cert) => (
              <div className="certificate-card" key={cert.id}>
                <div className="certificate-image">
                  <img
                    src={cert.imageUrl || "/placeholder.svg"}
                    alt={cert.title}
                    className="achievement-img"
                  />
                </div>
                <div className="certificate-content">
                  <h3 className="certificate-title">{cert.title}</h3>
                  <p className="certificate-description">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ChatWidget />
    </div>
  );
};

  
  const renderGoals = () => (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Semester Goals</h5>
      </div>

      <div className="card-body p-0">
        <div className="p-4">
          {getFilteredGoals().length > 0 ? (
            getFilteredGoals().map((goal) => <GoalItem key={goal.goalID} goal={goal} />)
          ) : (
            <div className="text-center py-4 text-muted">
              <p>No goals found in this category.</p>
            </div>
          )}
        </div>
      </div>
      <ChatWidget />
    </div>
    
  )
const renderWeekGoals = () => (
  <div>
    <h4 className="text-base font-semibold mb-2">Weekly Goals</h4>
    {student.goals?.length ? (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100 text-xs text-left">
              <th className="p-2 border">Week</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Deadline</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {student.goals.map((goal, idx) => (
              <tr key={goal.goalID || idx} className="border-t hover:bg-gray-50">
                <td className="p-2 border text-center">{goal.week}</td>
                <td className="p-2 border">{goal.subject}</td>
                <td className="p-2 border">{goal.title}</td>
                <td className="p-2 border">{goal.description}</td>
                <td className="p-2 border">
                  <input
                    type="date"
                    defaultValue={goal.deadline ? goal.deadline.slice(0, 10) : ""}
                    onChange={(e) =>
                      handleSetDeadline(goal.goalID, e.target.value, student.classID)
                    }
                    className="border rounded px-1 py-0.5 text-sm"
                  />
                </td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      goal.status === "completed"
                        ? "bg-green-600"
                        : goal.status === "in-progress"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {goal.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p>No goals available</p>
    )}
  </div>
);

const renderStudyPlans = () => (
  <div>
    <h4 className="mb-2 font-semibold text-lg">Self-Study Plan</h4>
    {student.study_plans?.length ? (
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Skill/ Module</th>
            <th className="border border-gray-300 p-2">My Lesson</th>
            <th className="border border-gray-300 p-2">Self - assessment (1-3)</th>
            <th className="border border-gray-300 p-2">My difficult</th>
            <th className="border border-gray-300 p-2">My plan</th>
            <th className="border border-gray-300 p-2">Problem solved</th>
            <th className="border border-gray-300 p-2">Comment</th>
          </tr>
        </thead>
        <tbody>
          {student.study_plans.map((plan) => (
            <tr key={plan.planID} className="hover:bg-gray-50">
              {[
                "date",
                "skill",
                "lessonSummary",
                "selfAssessment",
                "difficulties",
                "planToImprove",
                "problemSolved",
              ].map((field) => (
                <td key={`${plan.planID}-${field}`} className="border border-gray-300 p-2">
                  {plan[field]}
                </td>
              ))}
              <td className="p-2 border text-center">
                <button
                  ref={(el) => (commentButtonRefs.current[plan.planID] = el)}
                  onClick={() => toggleComments(plan.planID)}
                  className="flex items-center justify-center gap-1 text-blue-600 hover:text-blue-800"
                  title="Toggle comments"
                >
                  <MessageSquare size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
         {showCommentsFor && (
            <div
              style={{
                position: "fixed", 
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)", 
                zIndex: 2000,
                wplanIDth: 600,
                maxHeight: 600,
                overflowY: "auto",
                backgroundColor: "white",
                border: "1px solplanID #ccc",
                borderRadius: 8,
                boxShadow:
                  "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
                padding: 12,
              }}
            >
              <CommentsSection planID={showCommentsFor} planType="in_class" />
              <div className="text-right mt-2">
                <button
                  className="text-gray-600 hover:text-gray-900 text-xs"
                  onClick={() => setShowCommentsFor(null)}
                   currentUserEmail={currentUserEmail}
                >
                  Close
                </button>
              </div>
            </div>
          )}
      </table>
    ) : (
      <p>No study plans available</p>
    )}
  </div>
)

 const renderSelfStudyPlans = () => (
  <div>
    <h4 className="text-base font-semibold mb-2">In-Class</h4>
    {student.self_study_plans?.length ? (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100 text-xs text-left">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Skill</th>
              <th className="p-2 border">Lesson Summary</th>
              <th className="p-2 border">Concentration</th>
              <th className="p-2 border">Resources</th>
              <th className="p-2 border">Activities</th>
              <th className="p-2 border">Evaluation</th>
              <th className="p-2 border">Notes</th>
              <th className="p-2 border">Time Allocation</th>
              <th className="p-2 border">Comment</th>
            </tr>
          </thead>
          <tbody>
            {student.self_study_plans.map((plan, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="p-2 border">{plan.date}</td>
                <td className="p-2 border">{plan.skill}</td>
                <td className="p-2 border">{plan.lessonSummary}</td>
                <td className="p-2 border">{plan.concentration ?? "N/A"}</td>
                <td className="p-2 border">{plan.resources}</td>
                <td className="p-2 border">{plan.activities}</td>
                <td className="p-2 border">{plan.evaluation}</td>
                <td className="p-2 border">{plan.notes ?? "N/A"}</td>
                <td className="p-2 border">{plan.time_allocation}</td>
                <td className="p-2 border text-center">
                  <button
                  ref={(el) => (commentButtonRefs.current[plan.planID] = el)}
                    onClick={() => toggleComments(plan.planID)}
                    className="flex items-center justify-center gap-1 text-blue-600 hover:text-blue-800"
                    title="Toggle comments"
                  >
                    <MessageSquare size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
            {showCommentsFor && (
            <div
              style={{
                position: "fixed", 
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)", 
                zIndex: 2000,
                wplanIDth: 600,
                maxHeight: 600,
                overflowY: "auto",
                backgroundColor: "white",
                border: "1px solplanID #ccc",
                borderRadius: 8,
                boxShadow:
                  "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
                padding: 12,
              }}
            >
              <CommentsSection planID={showCommentsFor} planType="in_class" />
              <div className="text-right mt-2">
                <button
                  className="text-gray-600 hover:text-gray-900 text-xs"
                  onClick={() => setShowCommentsFor(null)}
                   currentUserEmail={currentUserEmail}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </table>
      </div>
    ) : (
      <p>No self study plans available</p>
    )}
  </div>
);


  const renderLearningJournal = () => (
    <div>
       <SemesterWeekSelector
        currentSemester={semester}
        currentWeek={week}
        onSemesterChange={setSemester}
        onWeekChange={setWeek}
      />
      {renderWeekGoals()}
      <hr />
      {renderStudyPlans()}
      <hr />
      {renderSelfStudyPlans()}
      <ChatWidget />
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "← Back":
        return navigate(-1)
      case "goals":
        return renderGoals()
      case "learning_journal":
        return renderLearningJournal()
      case "profile":
      default:
        return renderProfile()
    }
  }

  return (
    <div className="card mt-3 d-flex justify-content-center">
      <div className="">
        <ul className="nav nav-tabs card-header">
          {["← Back","profile", "goals", "learning_journal"].map((tab) => (
            <li className="nav-item" key={tab}>
              <button className={`nav-link ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
                {tab
                  .split("_")
                  .map((w) => w[0].toUpperCase() + w.slice(1))
                  .join(" ")}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="card-body">{renderContent()}</div>
    </div>
  )
}
