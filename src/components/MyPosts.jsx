import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { FaEye, FaHeart } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdEditDocument } from "react-icons/md";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import NavbarPage from "./Navbar";
import Comment from "./comment";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState({});
  const [likesCount, setLikesCount] = useState({});
  const navigate = useNavigate();

  const fetchMyPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://socialmediaapp-backend-0ewi.onrender.com/api/v1/post/posts", {
        headers: { token: `Bearer ${token}` },
      });

      const loginUser = localStorage.getItem("username");

      const filteredPosts = res.data.filter(
        (post) => post.author?.user === loginUser
      );

      setPosts(filteredPosts);

      const likesObj = {};
      filteredPosts.forEach((post) => {
        likesObj[post._id] = post.likes ? post.likes.length : 0;
      });

      setLikesCount(likesObj);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`https://socialmediaapp-backend-0ewi.onrender.com/api/v1/post/delete/${id}`, {
        headers: { token: `Bearer ${token}` },
      });

      alert("Post deleted successfully!");
      fetchMyPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLike = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `https://socialmediaapp-backend-0ewi.onrender.com/api/v1/post/like/${id}`,
        {},
        {
          headers: { token: `Bearer ${token}` },
        }
      );

      setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));

      setLikesCount((prev) => ({
        ...prev,
        [id]: res.data?.likes?.length || 0,
      }));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "20rem" }}>
        <ImSpinner9 />
      </h2>
    );
  }

  return (
    <>
      <NavbarPage />

      <div
        style={{
          minHeight: "100vh",
          padding: "5rem 1rem 2rem",
          background: "linear-gradient(135deg, #eef2f3, #dfe9f3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Title */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(1.6rem, 3vw, 2rem)",
            fontWeight: "600",
            marginBottom: "1.5rem",
          }}
        >
          My Posts
        </h2>

        {posts.length === 0 ? (
          <h3>No Posts Yet</h3>
        ) : (
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {posts.map((post) => (
              <div
                key={post._id}
                style={{
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  padding: "1rem",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Username */}
                <small style={{ fontWeight: "600", marginBottom: "4px" }}>
                  @{post.author?.user}
                </small>

                {/* Image */}
                <img
                  src={post.image}
                  alt="post"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    margin: "0.5rem 0",
                  }}
                />

                {/* Caption */}
                <p
                  style={{
                    fontSize: "0.9rem",
                    marginBottom: "0.6rem",
                    color: "#333",
                  }}
                >
                  {post.caption}
                </p>

                {/* Actions */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FaEye style={{ cursor: "pointer" }} />

                  <FaDeleteLeft
                    style={{ cursor: "pointer" }}
                    onClick={() => deletePost(post._id)}
                  />

                  <MdEditDocument
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/editpost/${post._id}`)}
                  />

                  {/* Like */}
                  <div style={{ position: "relative" }}>
                    <FaHeart
                      onClick={() => toggleLike(post._id)}
                      style={{
                        cursor: "pointer",
                        color: likedPosts[post._id] ? "red" : "#333",
                      }}
                    />

                    <span
                      style={{
                        position: "absolute",
                        top: "-6px",
                        right: "-10px",
                        background: "red",
                        color: "#fff",
                        borderRadius: "50%",
                        fontSize: "10px",
                        padding: "2px 6px",
                      }}
                    >
                      {likesCount[post._id] || 0}
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <Comment post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyPosts;