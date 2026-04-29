import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const Comment = ({ post }) => {

  const [commentText, setcommentText] = useState({});
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchComments();
  }, [post._id]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `https://socialmediaapp-backend-0ewi.onrender.com/api/v1/post/comments/${post._id}`
      );

      setComments(res.data.comments);

    } catch (error) {
      console.log(error);
    }
  };

  const handleComments = async (postId) => {
    try {

      if (!commentText[postId]) return;

      const res = await axios.post(
        `https://socialmediaapp-backend-0ewi.onrender.com/api/v1/post/comment/${postId}`,
        { text: commentText[postId] },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );

      setComments((prev) => [...prev, res.data.comment]);

      setcommentText({
        ...commentText,
        [postId]: "",
      });

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  if (!post) return null;

  return (
    <>
      <div className="insta-comments-list">
        {comments.length > 0 ? (
          comments.map((c) => (
            <div key={c._id}>
              <strong>{c.user?.user}:</strong> {c.text}
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>

      <input
        type="text"
        placeholder="Add comment"
        value={commentText[post._id] || ""}
        onChange={(e) =>
          setcommentText({
            ...commentText,
            [post._id]: e.target.value,
          })
        }
      />

      <button
        style={{
          background: "#198754",
          color: "#fff",
          border: "none",
          padding: "5px 10px",
          borderRadius: "4px",
        }}
        onClick={() => handleComments(post._id)}
      >
        Post
      </button>
    </>
  );
};

export default Comment;