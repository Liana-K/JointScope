
const exercisesByWeek = {
  week1: [
    { name: "Quad Set", 
      reps: 10,
      video: "https://youtu.be/5TUK4uT2nnw?si=feDRyW7Pqjb1wQL"
    },

    { name: "Heel Slides", 
      reps: 12,
      video: "https://youtu.be/A7fcobCVppc?si=K2KBi3dt5hvEnF31"
    },
  ],
  week2: [
    { name: "Straight Leg Raise", 
      reps: 12,
      video: "https://youtu.be/U4L_6JEv9Jg?si=1nj4OcZK2ule-OwV"    
    },
    { name: "Mini Squats", 
      reps: 10,
      video: "https://youtu.be/0YAFlev6AYg?si=Bjds01XyO6owI3iF" },
  ],
  week3: [
    { name: "Seated Knee Extension", 
      reps: 15,
    video: "https://youtu.be/VuJZ6dqMf8M?si=ktv3WAC5AtF_kPoY"
    },
    { name: "Step-Ups",
      reps: 10,
    video: "https://youtu.be/wfhXnLILqdk?si=TbccXEm6Y26cWn36"
    },
  ]
};


function getWeekFromAngle(angle) {
  if (angle < 20) return 1;
  if (angle < 40) return 2;
  return 3;
}

const recoveryAngles = [];

function saveRecoveryTest(angle) {
  recoveryAngles.push(angle);
  return recoveryAngles.length - 1; // this is the week number
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
