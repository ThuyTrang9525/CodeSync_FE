import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentsSection = ({ planID, planType }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const USER_ID = localStorage.getItem("userID");
  const TOKEN = localStorage.getItem("token");
const [showComments, setShowComments] = useState(false);
  const [selectedPlanID, setSelectedPlanID] = useState(null);
  const [selectedPlanType, setSelectedPlanType] = useState(null);

  const handleToggleComments = (planID, planType) => {
    setSelectedPlanID(planID);
    setSelectedPlanType(planType);
    setShowComments(prev => !prev);
  };

   useEffect(() => {
     console.log("Fetching comments for:", planID, planType);
     if (!planID || !planType) return;

     axios.get(`http://localhost:8000/api/comments`, {
       params: {
         planID,
         planType,
       },
       headers: { Authorization: `Bearer ${TOKEN}` }
     })
     .then(res => {
       console.log("Fetched comments:", res.data);
       setComments(res.data);
     })
     .catch(err => console.error("Fetch error:", err));
   }, [planID, planType]);
   
const handleResolveComment = (commentID) => {
  axios.put(`http://localhost:8000/api/comments/${commentID}/resolve`, {}, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  })
  .then(() => {
    setComments(comments.filter(c => c.commentID !== commentID));
  })
  .catch(err => {
    console.error("Error resolving comment:", err);
  });
};
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    axios.post("http://localhost:8000/api/comments", {
      planID,
      planType,
      senderID: USER_ID,
      content: newComment,
    }, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
    .then(res => {
      setComments([res.data, ...comments]);
      setNewComment("");
    })
    .catch(err => {
      if (err.response) {
        console.error("Error response:", err.response.data);
      } else {
        console.error("Error:", err.message);
      }
    });
  };

     return (
     <div className="comments-section">
       <h4>Bình luận</h4>
       <textarea
         value={newComment}
         onChange={(e) => setNewComment(e.target.value)}
         rows={3}
         placeholder="Viết bình luận..."
       />
       <button onClick={handleAddComment}>Gửi</button>

       {comments.length === 0 ? (
         <p>Không có bình luận nào.</p>
       ) : (
         <ul className="comment-list">
           {comments.map((c) => (
             <li key={c.commentID} className="comment-item">
               <span className="comment-content">{c.content}</span>
               <button
                 onClick={() => handleResolveComment(c.commentID)}
                 className="resolve-button"
               >
                 ✔️
               </button>
             </li>
           ))}
         </ul>
       )}
     </div>
   );
}
export default CommentsSection;
