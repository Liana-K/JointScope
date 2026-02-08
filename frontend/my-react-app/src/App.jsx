
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Record from "./pages/Record";
import History from "./pages/History";

export default function App() {
  const [page, setPage] = useState("splash");

  if (page === "splash") return <Splash goTo={setPage} />;
  if (page === "login") return <Login goTo={setPage} />;
  if (page === "dashboard") return <Dashboard goTo={setPage} />;
  if (page === "record") return <Record goTo={setPage} />;
  if (page === "history") return <History goTo={setPage} />;

  return null;
}
