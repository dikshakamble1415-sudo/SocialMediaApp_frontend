import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import { Button } from "react-bootstrap";
import NavbarPage from "./Navbar";
import { Form } from "react-bootstrap";




function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        user: "",
        email: ""
    });


    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("No token found");
                setLoading(false);
                return;
            }

            const result = await axios.get("https://socialmediaapp-backend-0ewi.onrender.com/api/v1/post/profile", {
                headers: { token: `Bearer ${token}` },
            });

            const data = result.data.message

            setUser(data);

            setFormData({
                name: data.name,
                user: data.user,
                email: data.email
            });

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };



    const updateProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const result = await axios.put(
                `https://socialmediaapp-backend-0ewi.onrender.com/api/v1/post/editProfile`,
                formData,
                {
                    headers: { token: `Bearer ${token}` }
                }
            );


            const updateUser = result.data.message
            setUser(updateUser);

            alert("Changes done!")


            localStorage.setItem("username", updateUser.user);

            setEditMode(false);

        } catch (error) {

            console.log(error);

        }

    };






    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) return <p>Loading profile...</p>;
    if (!user) return <p>No user data found.</p>;



    return (
        <>

            <NavbarPage />


            <div
                style={{
                    minHeight: "100vh",
                    padding: "5rem 1rem 2rem",
                    background: "linear-gradient(135deg, #eef2f3, #dfe9f3)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "500px",
                        borderRadius: "15px",
                        backgroundColor: "#ffffff",
                        padding: "1.5rem",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderBottom: "1px solid #ccc",
                            paddingBottom: "0.8rem",
                        }}
                    >
                        <h2
                            style={{
                                fontWeight: "600",
                                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                                margin: "0 auto",
                            }}
                        >
                            Profile
                        </h2>

                        {!editMode && (
                            <Button
                                onClick={() => {
                                    setEditMode(true);
                                    setFormData(user);
                                }}
                                style={{
                                    backgroundColor: "#198754",
                                    border: "none",
                                    fontSize: "1.2rem",
                                }}
                            >
                                <FaUserEdit />
                            </Button>
                        )}
                    </div>

                    {/* Content */}
                    <div style={{ marginTop: "1rem", fontSize: "0.95rem" }}>
                        {editMode ? (
                            <div>
                                <Form.Group className="mb-2">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="user"
                                        value={formData.user}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Button
                                    onClick={updateProfile}
                                    style={{
                                        marginTop: "10px",
                                        backgroundColor: "#198754",
                                        border: "none",
                                        width: "100%",

                                    }}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        ) : (
                            <>
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Username:</strong> {user.user}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>


        </>
    );
}

export default Profile;