// recoveryPose.js
export function startRecoveryTest(onComplete) {
  // 1️⃣ Create video element for webcam
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.playsInline = true;

  // 2️⃣ Create canvas to draw video + landmarks
  const canvasElement = document.createElement("canvas");
  const canvasCtx = canvasElement.getContext("2d");

  // Add video + canvas to page (assume a container exists)
  document.getElementById("camera-container").appendChild(videoElement);
  document.getElementById("camera-container").appendChild(canvasElement);

  // Variables to track max angle and test state
  let maxAngle = 0;
  let testing = true;

  // 3️⃣ Helper function: calculate angle between 3 points
  function calculateAngle(a, b, c) {
    const radians =
      Math.atan2(c.y - b.y, c.x - b.x) -
      Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs(radians * (180 / Math.PI));
    if (angle > 180) angle = 360 - angle;
    return angle;
  }

  // 4️⃣ Initialize MediaPipe Pose
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

  // 5️⃣ When pose results are ready
  pose.onResults((results) => {
    if (!testing) return;

    // Draw the video frame
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    // If landmarks detected, calculate knee angle
    if (results.poseLandmarks) {
      const hip = results.poseLandmarks[23];   // left hip
      const knee = results.poseLandmarks[25];  // left knee
      const ankle = results.poseLandmarks[27]; // left ankle

      const angle = calculateAngle(hip, knee, ankle);

      if (angle > maxAngle) {
        maxAngle = angle;
      }

      // Optional: show current angle on canvas
      canvasCtx.fillStyle = "red";
      canvasCtx.font = "20px Arial";
      canvasCtx.fillText(`Current ROM: ${angle.toFixed(1)}°`, 10, 30);
    }
  });

  // 6️⃣ Setup camera to send frames to MediaPipe
  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await pose.send({ image: videoElement });
    },
    width: 640,
    height: 480,
  });
  camera.start();

  // 7️⃣ Stop test after 8 seconds and return max angle
  setTimeout(() => {
    testing = false;
    onComplete(maxAngle);  // sends max ROM to caller
    videoElement.remove();
    canvasElement.remove();
  }, 8000);
}
