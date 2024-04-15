import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import "./App.css";
import UploadXlsx from "./components/UploadXlsx";
import ShowData from "./components/ShowData";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<UploadXlsx />} />
        <Route path="/show" element={<ShowData />} />
      </Routes>
    </Router>
  );
}

export default App;
