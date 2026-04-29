import { useState, useRef } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import NavbarPage from "./Navbar";
import { useNavigate } from "react-router-dom";

function CreatePage() {

  const [caption, setCaption] = useState("")
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  async function CreatePost(e) {
    e.preventDefault()

    try {

      const token = localStorage.getItem("token")

      if (!token) {
        alert("Please login first")
        return
      }

      const formData = new FormData()
      formData.append("caption", caption)
      formData.append("image", image)

      await axios.post(
        "https://socialmediaapp-backend-0ewi.onrender.com/api/v1/post/createPost",
        formData,
        {
          headers: {
            token: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      )

      alert("Post Created Successfully!")

      navigate("/dashboard")

      setCaption("")
      setImage(null)
      setPreview(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

    } catch (error) {

      console.log(error)
      alert(error.response?.data?.message || "Something went wrong")

    }
  }

  return (
    <>

      <NavbarPage />

      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          background: "linear-gradient(135deg, #eef2f3, #dfe9f3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem 1rem",
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
            onSubmit={CreatePost}
            style={{
              width: "100%",
              maxWidth: "400px",
              backgroundColor: "#ffffff",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                marginBottom: "1.5rem",
                fontWeight: "600",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              }}
            >
              Create Post
            </h2>

            {/* Image Upload */}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "600" }}>Image</Form.Label>

              <Form.Control
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  style={{
                    width: "90px",
                    marginTop: "10px",
                    borderRadius: "8px",
                  }}
                />
              )}
            </Form.Group>

            {/* Caption */}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "600" }}>Caption</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={caption}
                placeholder="Add caption here..."
                onChange={(e) => setCaption(e.target.value)}
                style={{ resize: "none" }}
              />
            </Form.Group>

            {/* Button */}
            <Button
              type="submit"
              variant="success"
              style={{
                marginTop: "0.5rem",
                fontSize: "15px",
                width: "100%",
              }}
            >
              Create Post
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default CreatePage