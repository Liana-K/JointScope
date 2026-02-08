import { useState } from "react";
import { startRecoveryTest } from "./pose/recoveryPose";

export default function RecoveryTest() {
  const [currentAngle, setCurrentAngle] = useState(null);
  const [maxAngle, setMaxAngle] = useState(null);

  const startTest = () => {
    startRecoveryTest(
      (live) => {
        setCurrentAngle(live.currentAngle);
        setMaxAngle(live.maxAngle);
      },
      (finalMax) => {
        alert(`Final Max Knee Angle: ${finalMax.toFixed(1)}°`);
      }
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Knee Recovery Test</h1>

      <div
        id="camera-container"
        style={{ width: "640px", margin: "auto" }}
      ></div>

      <br />

      <button onClick={startTest} style={{ marginTop: "15px" }}>
        Start Test
      </button>

      {currentAngle && <p>Current Angle: {currentAngle.toFixed(1)}°</p>}
      {maxAngle && <p>Max Angle: {maxAngle.toFixed(1)}°</p>}
    </div>
  );
}