import React from "react";
import "./dashboard.css";
import logo from "./logo.png";

export default function Dashboard() {
  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <a href="/main" className="logo-link">
            <img src={logo} alt="JointScope Logo" className="header-logo" />
          </a>
        </div>
      </header>

      {/* layout for dashboard*/}
      <main className="dashboard-grid">
        {/* left side of teh screen: History */}
        <a href="/history" className="card history-card">
          <h2>History</h2>
          <p>View your past recovery tests and progress</p>
        </a>

        {/* top right of the screen: Doctor Info */}
        <div className="card doctor-card">
          <h2>Your Doctor</h2>
          <p><strong>Name:</strong> Dr. Jane Smith</p>
          <p><strong>Specialty:</strong> Orthopedics</p>
          <p><strong>Contact:</strong> jane.smith@clinic.com</p>
        </div>

        {/* bottom right of the screen: Record Test */}
        <a href="/record-test" className="card record-card">
          <h2>Record Recovery Test</h2>
        </a>
      </main>
    </div>
  );
}