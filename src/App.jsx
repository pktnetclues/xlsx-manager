import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";

// import "./App.css";
import Navbar from "./components/Navbar";
import PostCard from "./components/Card";
import { CssBaseline } from "@mui/material";
import PostForm from "./components/CreatePost";
import DetailedCard from "./components/CardDetail";
import Profile from "./components/Profile";
import MyPosts from "./components/MyPosts";

function App() {
  return (
    <Router>
      <CssBaseline />

      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<PostCard />} />
        <Route path="/post" element={<PostForm />} />
        <Route path="/post/1" element={<DetailedCard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my/posts" element={<MyPosts />} />
      </Routes>
      <Navbar />
    </Router>
  );
}

export default App;
