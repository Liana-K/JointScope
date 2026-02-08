import React, { useState } from "react";
import "./exercise.css";
import logo from "./logo.png";

// Define your exercisesByWeek here
const exercisesByWeek = {
  week1: [
    { 
      name: "Quad Set", 
      reps: 10,
      video: "https://youtu.be/5TUK4uT2nnw?si=feDRyW7Pqjb1wQL"
    },
    { 
      name: "Heel Slides", 
      reps: 12,
      video: "https://youtu.be/A7fcobCVppc?si=K2KBi3dt5hvEnF31"
    },
  ],
  week2: [
    { 
      name: "Straight Leg Raise", 
      reps: 12,
      video: "https://youtu.be/U4L_6JEv9Jg?si=1nj4OcZK2ule-OwV"    
    },
    { 
      name: "Mini Squats", 
      reps: 10,
      video: "https://youtu.be/0YAFlev6AYg?si=Bjds01XyO6owI3iF" 
    },
  ],
  week3: [
    { 
      name: "Seated Knee Extension", 
      reps: 15,
      video: "https://youtu.be/VuJZ6dqMf8M?si=ktv3WAC5AtF_kPoY"
    },
    { 
      name: "Step-Ups",
      reps: 10,
      video: "https://youtu.be/wfhXnLILqdk?si=TbccXEm6Y26cWn36"
    },
  ]
};

export default function Exercises() {
  const [currentWeek, setCurrentWeek] = useState("week1"); // start with week1
  const exercises = exercisesByWeek[currentWeek]; // get exercises for that week

  return (
    <div>
      {/* Header */}
      <header className="header">
        <a href="/dashboard">
          <img src={logo} className="header-logo" alt="Logo" />
        </a>
      </header>

      {/* Main content */}
      <main className="exercise-container">
        <h1>Your Recovery Exercises</h1>

        {/* Week Selector */}
        <div className="week-selector">
          {Object.keys(exercisesByWeek).map((week) => (
            <button
              key={week}
              className={week === currentWeek ? "active-week" : ""}
              onClick={() => setCurrentWeek(week)}
            >
              {week.toUpperCase()}
            </button>
          ))}
        </div>

        {/* List of exercises */}
        <div id="exercise-list">
          {exercises.length === 0 ? (
            <p>No exercises assigned yet.</p>
          ) : (
            exercises.map((exercise, index) => (
              <div key={index} className="exercise-card">
                <h3>{exercise.name}</h3>
                <p>Reps: {exercise.reps}</p>
                <a href={exercise.video} target="_blank" rel="noreferrer">
                  Watch Video
                </a>
              </div>
            ))
          )}
        </div>

        {/* Back Button */}
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
