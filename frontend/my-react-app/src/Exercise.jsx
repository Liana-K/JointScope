import React, { useEffect, useState } from "react";
import "./exercise.css";
import logo from "./logo.png";

export default function Exercises() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // Replace this with your real exercise.js logic or API call
    // Example mock data:
    setExercises([
      { id: 1, name: "Knee Flexion", reps: "3 sets of 10" },
      { id: 2, name: "Quad Strengthening", reps: "3 sets of 12" },
      { id: 3, name: "Hamstring Stretch", reps: "Hold 30 sec x 3" },
    ]);
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="header">
        <a href="/dashboard">
          <img src={logo} className="header-logo" alt="Logo" />
        </a>
      </header>

      {/* main content */}
      <main className="exercise-container">
        <h1>Your Recovery Exercises</h1>

        {/* list of exercises */}
        <div id="exercise-list">
          {exercises.length === 0 ? (
            <p>No exercises assigned yet.</p>
          ) : (
            exercises.map((exercise) => (
              <div key={exercise.id} className="exercise-card">
                <h3>{exercise.name}</h3>
                <p>{exercise.reps}</p>
              </div>
            ))
          )}
        </div>

        {/* back Button to the Recovery Test*/}
        <button
          className="back-btn"
          onClick={() => (window.location.href = "/record-test")}
        >
          Back to Recovery Test
        </button>
      </main>
    </div>
  );
}