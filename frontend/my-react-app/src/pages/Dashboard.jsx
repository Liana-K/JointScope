import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Record from "./pages/Record";
import History from "./pages/History";
import RecoveryTest from "./RecoveryTest";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/record" element={<Record />} />
        <Route path="/history" element={<History />} />
        <Route path="/recovery-test" element={<RecoveryTest />} />
      </Routes>
    </Router>
  );
}
