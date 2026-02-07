// src/pose/exercisePoseLogic.js

import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";

/**
 * Start an exercise session
 * @param {Object} exercise - exercise definition (angles, speed, reps)
 * @param {Function} onUpdate - live updates (angle, speed, feedback)
 * @param {Function} onComplete - final results
 */
export function startExerciseSession(exercise, onUpdate, onComplete) {
  // -------------------------
  // Camera + Canvas setup
  // -------------------------
  const video = document.createElement("video");
  video.autoplay = true;
  video.playsInline = true;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const container = document.getElementById("camera-container");

  if (!container) {
    throw new Error("camera-container not found");
  }

  container.appendChild(video);
  container.appendChild(canvas);


  canvas.width = 640;
  canvas.height = 480;

  // -------------------------
  // Exercise state
  // -------------------------
  let lastAngle = null;
  let lastTime = Date.now();

  let repCount = 0;
  let inTargetZone = false;
  let sessionEnded = false;

  // -------------------------
  // Helper: angle calculation
  // -------------------------
  function calculateAngle(a, b, c) {
    const radians =
      Math.atan2(c.y - b.y, c.x - b.x) -
      Math.atan2(a.y - b.y, a.x - b.x);

    let angle = Math.abs((radians * 180) / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return angle;
  }

  // -------------------------
  // MediaPipe Pose setup
  // -------------------------
  const pose = new Pose({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
  });

  pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  // -------------------------
  // Pose results (MAIN LOOP)
  // -------------------------
  pose.onResults((results) => {
    if (sessionEnded) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    if (!results.poseLandmarks) return;

    // -------------------------
    // Get joint points
    // -------------------------
    const landmarks = results.poseLandmarks;

    const jointMap = {
      hip: landmarks[23],
      knee: landmarks[25],
      ankle: landmarks[27],
    };

    const [p1, p2, p3] = exercise.jointAngle.points.map(
      (joint) => jointMap[joint]
    );

    if (!p1 || !p2 || !p3) return;

    // -------------------------
    // Angle
    // -------------------------
    const angle = calculateAngle(p1, p2, p3);

    // -------------------------
    // Speed
    // -------------------------
  const now = Date.now();
  const timeDiff = (now - lastTime) / 1000;

  let speed = 0;
  if (lastAngle !== null && timeDiff > 0) {
    speed = Math.abs(angle - lastAngle) / timeDiff;
  }


    lastAngle = angle;
    lastTime = now;

    // -------------------------
    // Angle + speed checks
    // -------------------------
    const angleOk =
      angle >= exercise.jointAngle.angleRange.min &&
      angle <= exercise.jointAngle.angleRange.max;

    const speedOk =
      speed >= exercise.speedRange.min &&
      speed <= exercise.speedRange.max;

    // -------------------------
    // Rep counting logic
    // -------------------------
  if (angleOk && speedOk) {
    if (!inTargetZone) {
      inTargetZone = true;
    }
  } else {
    if (inTargetZone && angle < exercise.jointAngle.angleRange.max) {
      repCount += 1;
      inTargetZone = false;
    }
  }


    // -------------------------
    // Feedback text
    // -------------------------
    let feedback = "Good form";

    if (!angleOk) {
      feedback = "Adjust your angle";
    } else if (!speedOk) {
      feedback =
        speed < exercise.speedRange.min
          ? "Move a bit faster"
          : "Slow down";
    }

    // -------------------------
    // Draw UI text
    // -------------------------
    ctx.fillStyle = "red";
    ctx.font = "18px Arial";
    ctx.fillText(`Angle: ${angle.toFixed(1)}°`, 10, 30);
    ctx.fillText(`Speed: ${speed.toFixed(1)}°/s`, 10, 60);
    ctx.fillText(`Reps: ${repCount}`, 10, 90);
    ctx.fillText(feedback, 10, 120);

    // -------------------------
    // Send live update to React
    // -------------------------
    onUpdate({
      angle,
      speed,
      reps: repCount,
      feedback,
    });

    // -------------------------
    // End condition
    // -------------------------
    if (!sessionEnded && repCount >= exercise.reps) {
      sessionEnded = true;
      cleanup();
      onComplete({ reps: repCount, success: true });
    }
  }); //closes pose.onresults


  // -------------------------
  // Camera start
  // -------------------------
  const camera = new Camera(video, {
    onFrame: async () => {
      await pose.send({ image: video });
    },
    width: 640,
    height: 480,
  });

  camera.start();

  // -------------------------
  // Cleanup
  // -------------------------
  function cleanup() {
    try {
      camera.stop();
    } 
    catch {}
    video.remove();
    canvas.remove();
    let repCount = 0;
  }
}

