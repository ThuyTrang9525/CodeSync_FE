"use client"
import { useState, useEffect, useMemo, useRef } from "react"
import { useParams,useNavigate } from "react-router-dom"
import axios from "axios"

 export default function ChatBox({ userName, onClose }) {
  const { studentId } = useParams();
  const currentUserId = localStorage.getItem("user");
  const userId = studentId; 
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let classId = localStorage.getItem("classID");
  useEffect(() => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    axios
      .get(`http://localhost:8000/api/comments/history/${userId}/${classId}`)
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
    console.log(classId)
    setMessages((prev) => [...prev, tempMessage]);
    setInput("");

    axios
      .post("http://localhost:8000/api/comments/send", {
        receiverID: userId,
        content: messageContent,
        classID: classId,
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