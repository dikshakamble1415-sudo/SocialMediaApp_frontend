import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";


function Login() {

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")




    const navigate = useNavigate()


    async function registerFunction(e) {
        e.preventDefault()
        try {


            const result = await axios.post('https://socialmediaapp-backend-0ewi.onrender.com/api/v1/auth/login', { user, password })


            localStorage.setItem("username", user)
            localStorage.setItem('token', result.data.token)

            alert("Login Successful!")

            navigate('/dashboard')




        } catch (error) {

            alert(error.response?.data?.message || "Login failed")

        }


    }




    return (
        <>
            <div
                style={{
                    minHeight: "100vh",
                    width: "100%",
                    background: "linear-gradient(135deg, #e0e7ff, #c7d2fe)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
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
                        maxWidth: "1100px",
                    }}
                >
                    {/* Form Section */}
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
                                fontSize: "clamp(2rem, 4vw, 3rem)",
                                textAlign: "center",
                                marginBottom: "1.5rem",
                            }}
                        >
                            Login
                        </h2>

                        <div style={{ fontSize: "1rem", marginBottom: "1.5rem" }}>
                            {/* Username */}
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    value={user}
                                    type="text"
                                    placeholder="Enter your username"
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </Form.Group>

                            {/* Password */}
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    value={password}
                                    type="password"
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                        </div>

                        {/* Buttons */}
                        <Button
                            variant="success"
                            type="submit"
                            style={{
                                marginBottom: "1rem",
                                fontSize: "15px",
                                width: "100%",
                            }}
                        >
                            Login
                        </Button>

                        <Button
                            variant="outline-danger"
                            type="button"
                            onClick={() => navigate("/")}
                            style={{
                                fontSize: "15px",
                                width: "100%",
                            }}
                        >
                            New here? Create an account
                        </Button>
                    </Form>


                </div>
            </div>
        </>
    )
}


export default Login