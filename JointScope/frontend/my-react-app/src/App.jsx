import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Splash from "./Pages/Splash";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Record from "./Pages/Record";
import History from "./Pages/History";
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
