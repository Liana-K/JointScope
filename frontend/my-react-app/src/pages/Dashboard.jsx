import { useNavigate } from "react-router-dom";
import Logo from "../Components/Logo";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="page logo-page">
      <Logo size={120} />

      <div className="dashboard-actions">
        <button onClick={() => navigate("/record")}>
          Record Recovery Test
        </button>

        <button onClick={() => navigate("/history")}>
          View History
        </button>
      </div>
    </div>
  );
}