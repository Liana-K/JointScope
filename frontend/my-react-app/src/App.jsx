import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Record from "./pages/Record.jsx";
import History from "./pages/History.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Splash" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/record" element={<Record />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
