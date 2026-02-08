import React from "react";
import "./style.css";
import logo from "./logo.png";

export default function SplashLogin() {
  const handleSubmit = (e) => {
    e.preventDefault();
    //replace with navigation logic (React Router, etc.)
    window.location.href = "/dashboard";
  };

  return (
    <div>
      {/*logo animation*/}
      <div className="center-wrapper">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
      </div>

      {/*login box*/}
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          required
        />

        <input
          type="password"
          placeholder="Password"
          required
        />

        <button type="submit">Enter</button>
      </form>
    </div>
  );
}
