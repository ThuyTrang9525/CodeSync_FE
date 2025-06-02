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
  const currentUserId = localStorage.getItem("userID");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
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
  const getWeeklyGoals = () => {
    return student.goals?.filter(goal => goal.semester == semester && goal.week == week) || []
  }
  const getInClass = () => {
    return student.self_study_plans?.filter(self_study_plans => 
    self_study_plans.semester == semester && 
      self_study_plans.week == week
    ) || []
  }
  const getSelfStudyPlans = () => {
    return student.study_plans?.filter(plan =>
      plan.semester == semester && plan.week == week
    ) || []
  }

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

    const styles = {
      profileContainer: {
        padding: 20,
        maxWidth: 1200,
        margin: "0 auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      },
      profileHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30,
        borderBottom: "1px solid #ddd",
        paddingBottom: 20,
      },
      userInfo: {
        display: "flex",
        alignItems: "center",
      },
      avatar: {
        marginRight: 16,
      },
      avatarInner: {
        width: 70,
        height: 70,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 48,
        backgroundColor: "#e0e0e0",
        borderRadius: "50%",
        overflow: "hidden",
      },
      achievementImg: {
        width: "80px",
        height: "80px",
        objectFit: "cover",
        borderRadius: "50%",
      },
      avatarIcon: {
        fontSize: 48,
      },
      userDetails: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      },
      userName: {
        fontSize: 24,
        margin: 0,
      },
      userEmail: {
        fontSize: 14,
        color: "gray",
        marginTop: 4,
      },
      profileContent: {
        marginTop: 20,
      },
      sectionTitle: {
        fontSize: 24,
        marginBottom: 16,
      },
      achievementsSection: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
      },
      achievementsHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
      },
      achievementsTitle: {
        display: "flex",
        alignItems: "center",
        gap: 8,
      },
      trophyIcon: {
        fontSize: 24,
      },
      congratsText: {
        marginTop: 10,
      },
      certificatesGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16,
        marginTop: 20,
      },
      certificateCard: {
        backgroundColor: "#f5f5f5",
        padding: 16,
        borderRadius: 10,
        textAlign: "center",
      },
      certificateTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 12,
      },
      certificateDescription: {
        fontSize: 14,
        color: "#555",
      },
    };

    return (
      <div style={styles.profileContainer}>
        {/* Header Section */}
        <div style={styles.profileHeader}>
          <div style={styles.userInfo}>
            <div style={styles.avatar}>
              <div style={styles.avatarInner}>
                {p.avatarURL ? (
                  <img
                    src={p.avatarURL}
                    alt="Avatar"
                    style={styles.achievementImg}
                  />
                ) : (
                  <div style={styles.avatarIcon}>👤</div>
                )}
              </div>
            </div>
            <div style={styles.userDetails}>
              <h2 style={styles.userName}>{p.name}</h2>
              <p style={styles.userEmail}>{p.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div style={styles.profileContent}>
          <h1 style={styles.sectionTitle}>My Profile</h1>

          <div style={styles.achievementsSection}>
            <div style={styles.achievementsHeader}>
              <div style={styles.achievementsTitle}>
                <span style={styles.trophyIcon}>🏆</span>
                <h2>Achievements</h2>
              </div>
            </div>

            <p style={styles.congratsText}>
              Congratulations on completing this challenge!
            </p>

            <div style={styles.certificatesGrid}>
              {certificates.map((cert) => (
                <div style={styles.certificateCard} key={cert.id}>
                  <div className="certificate-image">
                    <img
                      src={cert.imageUrl || "/placeholder.svg"}
                      alt={cert.title}
                      style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
                    />
                  </div>
                  <div className="certificate-content">
                    <h3 style={styles.certificateTitle}>{cert.title}</h3>
                    <p style={styles.certificateDescription}>{cert.description}</p>
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
  const renderGoals = () => {
    const goals = getFilteredGoals();

    return (
      <div className="card shadow border-0 rounded-3">
        <div className="card-header text-white d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <i className="bi bi-flag-fill me-2"></i>
            <h5 className="mb-0 text-secondary ">Semester Goals</h5>
          </div>
          <h4 className="badge bg-light text-secondary">
            {goals.length} {goals.length === 1 ? "goal" : "goals"}
          </h4>
        </div>

        <div className="card-body p-0" >
          <div className="p-3">
            {goals.length > 0 ? (
              <div className="row g-3">
                {goals.map((goal) => (
                  <div key={goal.goalID} className="col-md-6">
                    <div className="border rounded p-3 d-flex align-items-start h-100">
                      <i className="bi bi-bullseye me-3 text-primary fs-4"></i>
                      <div className="flex-grow-1">
                        <GoalItem goal={goal} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted fst-italic">
                <p>No goals found in this category.</p>
              </div>
            )}
          </div>
        </div>

        <div className="card-footer bg-light">
          <ChatWidget />
        </div>
      </div>
    );
  };

  const renderWeekGoals = () => {
    const weeklyGoals = getWeeklyGoals();
    const handleSetDeadline = async (goalID, deadline, classID, userID) => {
    try {
      await handleSetDeadline(goalID, deadline, classID, userID);
      setMessage("Deadline updated successfully!");
      setShowMessage(true);

      setTimeout(() => setShowMessage(false), 3000);
    } catch (error) {
      setMessage("Failed to update deadline.");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };
    return (
      <div>
      {weeklyGoals.length > 0 ? (
      <div>
      <h4 className="text-base font-semibold mb-2">Weekly Goals</h4>
      {weeklyGoals?.length ? (
        <div className="overflow-x-auto">
          {showMessage && (
              <div className="alert alert-success p-1 mb-2 rounded text-sm text-center">
                {message}
              </div>
            )}
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
              {weeklyGoals.map((goal, idx) => (
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
                        handleSetDeadline(goal.goalID, e.target.value, student.classID,currentUserId)
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
        ) : (
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
            </table>
        )}
      </div>
    );
  }
  const renderStudyPlans = () => {
    const selfStudyPlans = getSelfStudyPlans();
    return (
      <div>
      {selfStudyPlans.length > 0 ? (
      <div>
      <h4 className="mb-2 font-semibold text-lg">In-Class</h4>
      {selfStudyPlans?.length ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Date</th>
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
            {selfStudyPlans.map((plan) => (
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
        ) : (
           <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Date</th>
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
              <tr className="hover:bg-gray-50">
                <td className="p-2 border text-center"></td>
                <td className="p-2 border text-center"></td>
                <td className="p-2 border text-center"></td>
                <td className="p-2 border text-center"></td>
                <td className="p-2 border text-center"></td>
                <td className="p-2 border text-center"></td>
                <td className="p-2 border text-center"></td>
                <td className="p-2 border text-center"></td>
              </tr>
          </tbody>
        </table>
        )}
      </div>
      );
   }
  const renderSelfStudyPlans = () => {
    const InClass = getInClass();
    return (
    <div>
      {InClass.length > 0 ? (
      <div>
        <h4 className="text-base font-semibold mb-2">Self-Study Plan</h4>
        {InClass?.length ? (
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
                {InClass.map((plan, idx) => (
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
      ) : (
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
                {InClass.map((plan, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="p-2 border"></td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border"></td>
                    <td className="p-2 border text-center">
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
      )}
    </div>
    );
  };

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
  <div className="card mt-4 shadow border-0 rounded-3">
    {/* Tabs Header */}
    <div className="card-header bg-light border-bottom-0 p-0">
      <ul className="nav nav-tabs nav-fill">
        {["← Back", "profile", "goals", "learning_journal"].map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link text-capitalize ${
                activeTab === tab ? "active fw-bold" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "← Back"
                ? tab
                : tab
                    .split("_")
                    .map((w) => w[0].toUpperCase() + w.slice(1))
                    .join(" ")}
            </button>
          </li>
        ))}
      </ul>
    </div>

    {/* Tab Content */}
    <div className="card-body">{renderContent()}</div>
  </div>
);

}
