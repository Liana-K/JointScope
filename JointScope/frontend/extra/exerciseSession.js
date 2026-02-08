import { useState, useEffect } from "react";
import { startExerciseSession } from "../pose/exercisePoseLogic";
import { exercisesByWeek } from "../data/exercises";

export default function ExerciseSession({ injury, intensity, week }) {

  const exercises = getExercisesUpToWeek(injury, intensity, week);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRest, setShowRest] = useState(false);
  const [liveData, setLiveData] = useState(null);

  function startExercise() {
    startExerciseSession(
      exercises[currentIndex],
      (data) => setLiveData(data),
      () => {
        setLiveData(null);
        setShowRest(true);

        setTimeout(() => {
          setShowRest(false);
          setCurrentIndex((prev) => prev + 1);
        }, 60000);
      }
    );
  }

  useEffect(() => {
    if (currentIndex < exercises.length && !showRest && !liveData) {
      startExercise();
    }
  }, [currentIndex, showRest, liveData]);

  return (
    <div>
      <h2>{`Physio Session – ${week}`}</h2>

      <div id="camera-container" />

      {showRest && <h3>Rest for 1 minute</h3>}

      {liveData && (
        <>
          <p>Exercise: {exercises[currentIndex].name}</p>
          <p>Angle: {liveData.angle.toFixed(1)}°</p>
          <p>Reps: {liveData.reps}</p>
          <p>{liveData.feedback}</p>
        </>
      )}

      {currentIndex >= exercises.length && (
        <h3>Session complete 🎉</h3>
      )}
    </div>
  );
}



function getExercisesUpToWeek(injury, intensity, week) {
  const weekNumber = parseInt(week.replace("week", ""));
  const allWeeks = exercisesByWeek[injury][intensity];

  let selected = [];

  for (let i = 1; i <= weekNumber; i++) {
    const wk = `week${i}`;
    if (allWeeks[wk]) {
      selected.push(...allWeeks[wk]);
    }
  }

  return selected;
}
