export default function Login({ goTo }) {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header" />

        <div className="login-left">
          <h3>Login</h3>
          <input placeholder="Email" />
          <input placeholder="Password" />
          <button>Login</button>
        </div>

        <div className="login-right">
          <button
            className="guest-btn"
            onClick={() => goTo("dashboard")}
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}