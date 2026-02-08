import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Top blue header bar */}
        <div className="login-header" />

        {/* Left side: login form */}
        <div className="login-left">
          <h3>Login</h3>

          <input
            type="email"
            placeholder="Email"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button>
            Login
          </button>
        </div>

        {/* Right side: continue as guest */}
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
