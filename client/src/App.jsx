import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import "./App.css";
import Navbar from "./components/Dashboard/Navbar";
import PostCard from "./components/Dashboard/Card";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/card" element={<PostCard />} />
      </Routes>
      <Navbar />
    </Router>
  );
}

export default App;
