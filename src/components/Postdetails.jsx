import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaHeart } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdEditDocument } from "react-icons/md";
import NavbarPage from "./Navbar";

function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        try {
            const res = await axios.get(
                "https://socialmediaapp-backend-0ewi.onrender.com/api/v1/post/posts",
                {
                    headers: { token: `Bearer ${token}` },
                }
            );

            const singlePost = res.data.find((p) => p._id === id);

            setPost(singlePost);
            setLikesCount(singlePost?.likes?.length || 0);
        } catch (error) {
            console.log(error);
        }
    };

    const deletePost = async () => {
        try {
            await axios.delete(
                `https://socialmediaapp-backend-0ewi.onrender.com/api/v1/post/delete/${id}`,
                {
                    headers: { token: `Bearer ${token}` },
                }
            );

            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    const toggleLike = async () => {
        try {
            const res = await axios.post(
                `https://socialmediaapp-backend-0ewi.onrender.com/api/v1/post/like/${id}`,
                {},
                {
                    headers: { token: `Bearer ${token}` },
                }
            );

            setLiked(!liked);
            setLikesCount(res.data?.likes?.length || 0);
        } catch (error) {
            console.log(error);
        }
    };

    if (!post) return <h3 style={{ textAlign: "center" }}>Post not found</h3>;

    return (
        <>

            <NavbarPage />

            <div
                style={{
                    minHeight: "100vh",
                    padding: "5rem 1rem",
                    background: "linear-gradient(135deg, #eef2f3, #dfe9f3)",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "420px",
                        borderRadius: "12px",
                        backgroundColor: "#fff",
                        padding: "1rem",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                    }}
                >
                    {/* Username */}
                    <small style={{ fontWeight: "600" }}>
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
                    <p style={{ fontSize: "0.9rem", color: "#333" }}>
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
                        <FaEye />

                        <FaDeleteLeft
                            style={{ cursor: "pointer" }}
                            onClick={deletePost}
                        />

                        <MdEditDocument
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/editpost/${post._id}`)}
                        />

                        {/* Like */}
                        <div style={{ position: "relative" }}>
                            <FaHeart
                                onClick={toggleLike}
                                style={{
                                    cursor: "pointer",
                                    color: liked ? "red" : "#333",
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
                                {likesCount}
                            </span>
                        </div>
                    </div>

                    {/* Comment */}
                    <Comment post={post} />
                </div>
            </div>
        </>
    );
}

export default PostDetails;