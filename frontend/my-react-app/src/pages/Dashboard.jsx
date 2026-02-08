import { useNavigate } from "react-router-dom";
import Logo from "../Components/Logo";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="page logo-page">
      <Logo size={200} />

      <div className="dashboard-actions">
        <button onClick={() => navigate("/Record Recovery Progress")}>
          Record Recovery Test
        </button>

        <button onClick={() => navigate("/History")}>
          View History
        </button>
      </div>
    </div>
  );
}
