import React, { useRef, useState } from "react";
import Exercise from "./Exercise";
import "./recovery-test.css";
import logo from "./logo.png";
import { startRecoveryTest } from "./pose/recoveryPose";

export default function RecoveryTest() {
  const cameraContainerRef = useRef(null);

  const [currentAngle, setCurrentAngle] = useState(null);
  const [maxAngle, setMaxAngle] = useState(null);

  const handleStartTest = () => {
    startRecoveryTest(
      cameraContainerRef.current,

      //handles live updates of angle
      (live) => {
        setCurrentAngle(live.currentAngle.toFixed(1));
        setMaxAngle(live.maxAngle.toFixed(1));
      },

      //prints final result
      (finalMax) => {
        alert(`Final Max Knee Angle: ${finalMax.toFixed(1)}°`);
      }
    );
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <a href="/dashboard">
          <img src={logo} alt="JointScope Logo" className="header-logo" />
        </a>
      </header>

      {/* page content */}
      <main className="recovery-container">
        <h1>Knee Recovery Test</h1>

        {/* camera handling*/}
        <div id="camera-container" ref={cameraContainerRef}></div>

        {/*start test */}
        <button id="start-test-btn" onClick={handleStartTest}>
          Start Test
        </button>

        {/* angle readouts/outputs */}
        {currentAngle && (
          <p id="current-angle">
            Current Angle: {currentAngle}°
          </p>
        )}

        {maxAngle && (
          <p id="max-angle">
            Max Angle: {maxAngle}°
          </p>
        )}

        {/* nav buttons */}
        <div className="nav-buttons">
          <button onClick={() => (window.location.href = "/dashboard")}>
            Back to Dashboard
          </button>

          <button onClick={() => (window.location.href = "/exercise")}>
            View Exercises
          </button>
        </div>
      </main>
    </div>
  );
}