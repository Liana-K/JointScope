import { useState } from "react";

import Splash from "./Pages/Splash";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Record from "./Pages/Record";
import History from "./Pages/History";

export default function App() {
  const [page, setPage] = useState("splash");

  if (page === "splash") return <Splash goTo={setPage} />;
  if (page === "login") return <Login goTo={setPage} />;
  if (page === "dashboard") return <Dashboard goTo={setPage} />;
  if (page === "record") return <Record goTo={setPage} />;
  if (page === "history") return <History goTo={setPage} />;

  return null;
}
