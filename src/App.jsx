import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './components/Profile'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyPosts from "./components/MyPosts"
import CreatePage from './components/CreatePage'
import EditPost from './components/EditPost'
import Like from './components/Like.jsx'
import Comment from './components/Comment.jsx'
import PostDetails from "./components/Postdetails.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/myposts' element={<MyPosts />} />
        <Route path='/createpost' element={<CreatePage />} />
        <Route path='/editpost/:id' element={<EditPost />} />
        <Route path='/like/:id' element={<Like />} />
        <Route path='/comment/:postId' element={<Comment />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path='*' element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App