import React, { useState } from "react"; 
import Dashboard from "./Dashboard";
import "./style.css";
import logo from "./logo.png";

export default function SplashLogin() {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedIn(true); //switches to dashboard
  };

  //if the user is logged in (after submit),
  if (loggedIn){
    return <Dashboard /> //...move over to (render) the dashboard
  }

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
