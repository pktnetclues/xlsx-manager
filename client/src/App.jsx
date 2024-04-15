import { Toaster } from "sonner";
import "./App.css";
import UploadXlsx from "./components/UploadXlsx";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ShowData from "./components/ShowData";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<UploadXlsx />} />
        <Route path="/show" element={<ShowData />} />
      </Routes>
    </Router>
  );
}

export default App;
