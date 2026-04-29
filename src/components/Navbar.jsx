import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo_SocialApp from "../assets/Logo_SocialApp.png"
import { Link, useNavigate } from 'react-router-dom';
import MyPosts from './MyPosts';



function NavbarPage() {

    const [search, setSearch] = useState("")
    const [searchQuery, setSearchQuery] = useState("")

    const user = localStorage.getItem("username")
    const navigate = useNavigate()




    const handleLogout = () => {
        localStorage.removeItem("token")
        delete axios.defaults.headers.common["token"]
        navigate("/login")
    }



    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(search.trim());
    };







    const handleReset = () => {
        setSearch("")
        setSearchQuery("")
    }





    return (



        <>
            <Navbar
                expand="lg"
                fixed="top"
                style={{
                    background: "linear-gradient(135deg, #eef2f3, #dfe9f3)",
                    padding: "0.5rem 1rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
            >
                {/* Logo */}
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

                {/* Mobile Toggle */}
                <Navbar.Toggle aria-controls="navbar-content" />

                <Navbar.Collapse id="navbar-content">
                    {/* Navigation Links */}
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
                            style={{ fontWeight: "500", fontSize: "0.95rem" }}
                        >
                            Welcome, {user}
                        </Nav.Link>

                        <Button
                            variant="outline-danger"
                            onClick={handleLogout}
                            style={{
                                borderRadius: "20px",
                                fontSize: "0.9rem",
                                padding: "4px 10px",
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Navbar>

        </>
    )
}

export default NavbarPage;