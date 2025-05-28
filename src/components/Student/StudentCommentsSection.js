import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  fetchComments,
  addComment,
  resolveComment,
} from "../../service/api";
const CommentsSection = ({ planID, planType }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const USER_ID = localStorage.getItem("userID");
  const TOKEN = localStorage.getItem("token");

  useEffect(() => {
    if (!planID || !planType) return;
    fetchComments(planID, planType, TOKEN)
      .then(res => {
        setComments(res.data);
      })
      .catch(err => {
        console.error("Fetch error:", err);
      });
  }, [planID, planType, TOKEN]);

  const handleResolveComment = (commentID) => {
    resolveComment(commentID, TOKEN)
      .then(() => {
        setComments(comments.filter(c => c.commentID !== commentID));
      })
      .catch(err => {
        console.error("Error resolving comment:", err);
      });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    addComment(
      {
        planID,
        planType,
        senderID: USER_ID,
        content: newComment,
      },
      TOKEN
    )
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
