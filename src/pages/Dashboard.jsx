import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { FaEye } from "react-icons/fa";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo_SocialApp from "../assets/Logo_SocialApp.png"
import { Form } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'

function Dashboard() {
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const user = localStorage.getItem("username")

    const getPosts = async () => {
        const token = localStorage.getItem("token")
        if (!token) return console.log("No token found");

        try {
            setLoading(true)
            const result = await axios.get(`https://socialmediaapp-backend-0ewi.onrender.com/api/v1/post/posts`, {
                headers: { token: `Bearer ${token}` }
            });

            setPosts(result.data);

        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        delete axios.defaults.headers.common["token"]
        navigate("/login")
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(search.trim());
    };

    const filteredPosts = searchQuery === ""
        ? posts
        : posts.filter((post) => {
            const searchText = searchQuery.toLowerCase()

            const caption = post.caption?.toLowerCase() || ""
            const user = post.author?.user?.toLowerCase() || ""

            return (
                caption.includes(searchText) ||
                user.includes(searchText)
            )
        })

    const handleReset = () => {
        setSearch("")
        setSearchQuery("")
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <>
            {/* NAVBAR */}
            <Navbar
                expand="lg"
                fixed="top"
                style={{
                    background: "linear-gradient(135deg, #eef2f3, #dfe9f3)",
                    padding: "0.5rem 1rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
            >
                <Navbar.Brand
                    as={Link}
                    to="/dashboard"
                    style={{
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={Logo_SocialApp}
                        alt="logo"
                        style={{ height: "32px", marginRight: "6px" }}
                    />
                    SocialApp
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav
                        className="me-auto"
                        style={{
                            marginLeft: "0.8rem",
                            gap: "0.8rem",
                            fontSize: "0.95rem",
                            flexWrap: "wrap",
                        }}
                    >
                        <Nav.Link as={Link} to="/dashboard">Home</Nav.Link>
                        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                        <Nav.Link as={Link} to="/createpost">Create Posts</Nav.Link>
                        <Nav.Link as={Link} to="/myposts">My Posts</Nav.Link>

                        {/* Search */}
                        <Form
                            className="d-flex"
                            onSubmit={handleSearch}
                            style={{ gap: "6px", flexWrap: "wrap" }}
                        >
                            <Form.Control
                                type="search"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    borderRadius: "20px",
                                    width: "140px",
                                    fontSize: "0.85rem",
                                }}
                            />

                            <Button variant="outline-primary" type="submit" style={{ borderRadius: "20px", fontSize: "0.8rem" }}>
                                Search
                            </Button>

                            <Button
                                variant="outline-secondary"
                                type="button"
                                onClick={handleReset}
                                style={{ borderRadius: "20px", fontSize: "0.8rem" }}
                            >
                                Reset
                            </Button>
                        </Form>
                    </Nav>

                    {/* Right Section */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            flexWrap: "wrap",
                            marginTop: "0.4rem",
                        }}
                    >
                        <Nav.Link
                            as={Link}
                            to="/profile"
                            style={{ fontWeight: "500", fontSize: "0.9rem" }}
                        >
                            Welcome, {user}
                        </Nav.Link>

                        <Button
                            variant="outline-danger"
                            onClick={handleLogout}
                            style={{
                                borderRadius: "20px",
                                fontSize: "0.85rem",
                                padding: "4px 10px",
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Navbar>

            {/* POSTS */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1.2rem",
                    width: "100%",
                    maxWidth: "500px",
                    margin: "0 auto",
                    paddingTop: "6rem"
                }}
            >
                {loading ? (
                    <div style={{ textAlign: "center", padding: "2rem" }}>
                        <Spinner animation="border" />
                    </div>
                ) : (
                    filteredPosts.map((post) => (
                        <Card
                            key={post._id}
                            style={{
                                width: "100%",
                                position: "relative",
                                borderRadius: "12px",
                                overflow: "hidden",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                                backgroundColor: "#ffffff",
                            }}
                        >
                            <Card.Img
                                variant="top"
                                src={post.image || "placeholder.jpg"}
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    objectFit: "cover",
                                }}
                            />

                            <Button
                                style={{
                                    position: "absolute",
                                    bottom: "8px",
                                    right: "8px",
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "50%",
                                    backgroundColor: "black",
                                    border: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onClick={() => navigate(`/post/${post._id}`)}
                            >
                                <FaEye />
                            </Button>
                        </Card>
                    ))
                )}
            </div>
        </>
    )
}

export default Dashboard;