
const exercisesByWeek = {
  week1: [
    { name: "Quad Set", reps: 10 },
    { name: "Heel Slides", reps: 12 },
  ],
  week2: [
    { name: "Straight Leg Raise", reps: 12 },
    { name: "Mini Squats", reps: 10 },
  ],
  week3: [
    { name: "Seated Knee Extension", reps: 15 },
    { name: "Step-Ups", reps: 10 },
  ]
};


function getWeekFromAngle(angle) {
  if (angle < 30) return 1;
  if (angle < 60) return 2;
  return 3;
}


function getExercises(week) {
  const weekCount = Math.min(week, 3); // cap to max week 3

  const exercises = [];

  for (let i = 1; i <= weekCount; i++) {
    const weekKey = `week${i}`;
    exercises.push(...(exercisesByWeek[weekKey] || []));
  }

  return exercises;
}
