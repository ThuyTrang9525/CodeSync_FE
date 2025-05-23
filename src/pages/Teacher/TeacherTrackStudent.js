"use client"
import { useState, useEffect, useMemo, useRef } from "react"
import { useParams,useNavigate } from "react-router-dom"
import GoalItem from "../../components/Student/StudentGoalItem"
import ChatWidget from "../../components/Teacher/TeacherChatBox"
import axios from "axios"


export default function StudentDetailView() {
  const { studentId } = useParams()
  const [activeTab, setActiveTab] = useState("profile")
  const [student, setStudent] = useState(null)
  const [chatOpen, setChatOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (studentId) {
      axios
        .get(`http://localhost:8000/api/teacher/students/${studentId}`)
        .then((res) => {
          setStudent(res.data)
          console.log("API data:", res.data)
        })
        .catch((err) => {
          console.error("Error loading student data", err)
        })
    }
  }, [studentId])

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
    </div>
  );
};


  const renderGoals = () => (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Semester Goals</h5>
      </div>

      <div className="card-body p-0">
        {/* <ul className="nav nav-tabs nav-fill px-3 pt-3">
          {[
            { id: "all", label: "All" },
            { id: "completed", label: `Completed (${completedGoals.length})` },
            { id: "in-progress", label: `In Progress (${inProgressGoals.length})` },
            { id: "not-started", label: `Not Started (${notStartedGoals.length})` },
          ].map((tab) => (
            <li className="nav-item" key={tab.id}>
              <button
                className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul> */}

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
    </div>
  )

 const renderStudyPlans = () => (
  <div>
    <h4 className="mb-2 font-semibold text-lg">Study Plans</h4>
    {student.study_plans?.length ? (
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {/* Vì planID, type, semester, week bạn không yêu cầu, chỉ giữ các cột theo mẫu */}
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Skill/ Module</th>
            <th className="border border-gray-300 p-2">My Lesson</th>
            <th className="border border-gray-300 p-2">Self - assessment (1-3)</th>
            <th className="border border-gray-300 p-2">My difficult</th>
            <th className="border border-gray-300 p-2">My plan</th>
            <th className="border border-gray-300 p-2">Problem solved</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No study plans available</p>
    )}
  </div>
)


 const renderSelfStudyPlans = () => (
  <div>
    <h4 className="text-base font-semibold mb-2">Self Study Plans</h4>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p>No self study plans available</p>
    )}
  </div>
);


  const renderLearningJournal = () => (
    <div>
      {renderStudyPlans()}
      <hr />
      {renderSelfStudyPlans()}
      <ChatWidget />
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
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
       {/* <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
          ← Back
        </button> */}
      <div className="">
        <ul className="nav nav-tabs card-header">
          {["profile", "goals", "learning_journal"].map((tab) => (
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
