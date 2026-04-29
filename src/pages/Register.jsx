import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'



function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState("")


    const navigate = useNavigate()


    async function registerFunction(e) {
        e.preventDefault()
        try {

            await axios.post('https://socialmediaapp-backend-0ewi.onrender.com/api/v1/auth/register', { name, email, password, user })
            alert("Registration Successful!")


            navigate('/login')


        } catch (error) {

            alert(error.response?.data?.message)
        }
    }



    return (
        <>
            <div
                style={{
                    minHeight: "100vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
                    background: "linear-gradient(135deg, #eef2f3, #dfe9f3)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "2rem",
                        width: "100%",
                        maxWidth: "1000px",
                    }}
                >
                    <Form
                        onSubmit={registerFunction}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            maxWidth: "400px",
                            backgroundColor: "#ffffff",
                            padding: "1.5rem",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                    >
                        <h2
                            style={{
                                textAlign: "center",
                                marginBottom: "1.2rem",
                                fontWeight: "600",
                                fontSize: "clamp(1.5rem, 2vw, 2rem)",
                            }}
                        >
                            Create Account
                        </h2>

                        {/* Name */}
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                value={name}
                                type="text"
                                placeholder="Enter your full name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        {/* Email */}
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                value={email}
                                type="email"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        {/* Password */}
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                value={password}
                                type="password"
                                placeholder="Create a password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        {/* Username */}
                        <Form.Group className="mb-4">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                value={user}
                                type="text"
                                placeholder="Choose a username"
                                onChange={(e) => setUser(e.target.value)}
                            />
                        </Form.Group>

                        {/* Buttons */}
                        <Button
                            variant="success"
                            type="submit"
                            style={{
                                marginBottom: "0.8rem",
                                fontSize: "15px",
                            }}
                        >
                            Register
                        </Button>

                        <Link to="/login" style={{ textAlign: "center", textDecoration: "none" }}>
                            <Button
                                variant="outline-danger"
                                style={{
                                    width: "100%",
                                    fontSize: "15px",
                                }}
                            >
                                Already have an account? Login
                            </Button>
                        </Link>
                    </Form>
                </div>
            </div>
        </>
    )
}


export default Register