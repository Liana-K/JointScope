import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header" />

        <div className="login-left">
          <h3>Login</h3>

          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button>Login</button>
        </div>

        <div className="login-right">
          <button
            className="guest-btn"
            onClick={() => navigate("/dashboard")}
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
