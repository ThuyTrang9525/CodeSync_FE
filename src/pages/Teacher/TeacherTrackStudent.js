"use client"
import { useState, useEffect, useMemo, useRef } from "react"
import { useParams,useNavigate } from "react-router-dom"
import GoalItem from "../../components/Student/StudentGoalItem"
import axios from "axios"

function ChatBox({ userName, onClose }) {
  const { studentId } = useParams();
  const currentUserId = localStorage.getItem("user");
  const userId = studentId; 
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    axios
      .get(`http://localhost:8000/api/comments/history/${userId}`)
      .then((res) => {
        setMessages(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải lịch sử chat:", err);
        setError("Failed to load chat history. Please try again.");
        setIsLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);

    const tempMessage = {
      tempId: Date.now(),
      content: input,
      createdAt: new Date().toISOString(),
      senderID: currentUserId,
    };

    const messageContent = input;

    setMessages((prev) => [...prev, tempMessage]);
    setInput("");

    axios
      .post("http://localhost:8000/api/comments/send", {
        receiverID: userId,
        content: messageContent,
        // planID, planType có thể truyền nếu có
      })
      .then((res) => {
        setMessages((prev) =>
          prev.filter((msg) => msg.tempId !== tempMessage.tempId).concat(res.data)
        );
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Send message error:", err.response?.data || err);
        setError("Failed to send message. Please try again.");
        setIsLoading(false);
        setMessages((prev) => prev.filter((msg) => msg.tempId !== tempMessage.tempId));
        setInput(messageContent);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "90px",
        left: "20px",
        width: "320px",
        height: "400px",
        backgroundColor: "#fff",
        borderRadius: 8,
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        zIndex: 10000,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "10px 15px",
          borderBottom: "1px solid #ddd",
          fontWeight: "bold",
          fontSize: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#0d6efd",
          color: "#fff",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        Chat with {userName}
        <button
          onClick={onClose}
          style={{
            cursor: "pointer",
            border: "none",
            background: "transparent",
            fontSize: 24,
            color: "#fff",
            lineHeight: 1,
          }}
          aria-label="Close chat"
        >
          &times;
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          padding: 10,
          backgroundColor: "#f8f9fa",
        }}
      >
        {error && (
          <div style={{ color: "red", textAlign: "center", margin: "10px 0" }}>
            {error}
          </div>
        )}

        {isLoading && messages.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>No messages yet</p>
        ) : null}

        {messages.map((msg) => {
          const isSentByCurrentUser = msg.senderID === currentUserId;
          return (
            <div
              key={msg.commentID || msg.tempId}
              style={{
                marginBottom: 8,
                textAlign: isSentByCurrentUser ? "right" : "left",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: 20,
                  backgroundColor: isSentByCurrentUser ? "#e2e3e5" : "#0d6efd",
                  color: isSentByCurrentUser ? "#000" : "#fff",
                  maxWidth: "80%",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  opacity: msg.tempId ? 0.7 : 1,
                }}
              >
                {msg.content}
                <div
                  style={{
                    fontSize: 10,
                    marginTop: 4,
                    opacity: 0.7,
                    textAlign: "right",
                  }}
                >
                  {msg.tempId
                    ? "Sending..."
                    : new Date(msg.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ padding: 10, borderTop: "1px solid #ddd" }}>
        <textarea
          rows={2}
          style={{
            width: "100%",
            resize: "none",
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          style={{
            marginTop: 6,
            width: "100%",
            backgroundColor: isLoading || !input.trim() ? "#6c757d" : "#0d6efd",
            color: "white",
            padding: 10,
            border: "none",
            borderRadius: 6,
            cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

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
      title: "Laravel Mastery",
      description: "Completed advanced Laravel course",
      imageUrl: "/cert1.png",
    },
    {
      id: 2,
      title: "React Basics",
      description: "Finished React fundamentals module",
      imageUrl: "/cert2.png",
    },
    {
      id: 3,
      title: "Team Collaboration",
      description: "Worked on a group project successfully",
      imageUrl: "/cert3.png",
    },
  ]

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
      <button
        onClick={() => setChatOpen((open) => !open)}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          fontSize: "24px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          zIndex: 1000,
        }}
        title="Chat"
      >
        💬
      </button>
      {chatOpen && <ChatBox userId={student.studentID} userName={student.name} onClose={() => setChatOpen(false)} />}
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
