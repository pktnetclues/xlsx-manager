import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import "./App.css";
import Navbar from "./components/Dashboard/Navbar";
import PostCard from "./components/Dashboard/Card";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <Router>
      <CssBaseline />

      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<PostCard />} />
      </Routes>
      <Navbar />
    </Router>
  );
}

export default App;
