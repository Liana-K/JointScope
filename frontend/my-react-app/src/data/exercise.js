export const exercisesByWeek = {
  knee: {
    low: {
      week1: [
        {
          name: "Quad Set",
          jointAngles: {
            knee: { min: 0, max: 20 }
          },
          reps: 10,
          speed: "slow"
        }
      ],

      week2: [
        {
          name: "Straight Leg Raise",
          jointAngles: {
            hip: { min: 30, max: 50 },
            knee: { min: 160, max: 180 }
          },
          reps: 12,
          speed: "medium"
        }
      ],

      week3: [
        {
          name: "Seated Knee Extension",
          jointAngles: {
            knee: { min: 30, max: 70 }
          },
          reps: 15,
          speed: "medium"
        }
      ]
    }
  }
};
