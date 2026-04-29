import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Like() {

    const { id } = useParams();
    const token = localStorage.getItem("token");

    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    const toggleLike = async () => {

        try {

            const res = await axios.post(
                `https://socialmediaapp-backend-0ewi.onrender.com/api/v1/post/like/${id}`,
                {},
                {
                    headers: { token: `Bearer ${token}` }
                }
            );

            setLikes(res.data.likes);
            setLiked(res.data.liked);

        } catch (error) {
            console.log(error.message);
        }

    };

    return (

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

            <Button
                onClick={toggleLike}
                style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "22px"
                }}
            >
                {liked ? "❤️" : "🤍"}
            </Button>

            <span>{likes}</span>

        </div>

    );
}

export default Like;