import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";

export function startRecoveryTest(onComplete) {
  const container = document.getElementById("camera-container");

  if (!container) {
    console.error("camera-container not found!");
    return;
  }

  container.innerHTML = "";

  //creates a video
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.playsInline = true;
  videoElement.width = 640;
  videoElement.height = 480;

  //creates a canvas
  const canvasElement = document.createElement("canvas");
  canvasElement.width = 640;
  canvasElement.height = 480;
  const canvasCtx = canvasElement.getContext("2d");

  container.appendChild(videoElement);
  container.appendChild(canvasElement);

  let maxAngle = 0;
  let testing = true;

  function calculateAngle(a, b, c) {
    const radians =
      Math.atan2(c.y - b.y, c.x - b.x) -
      Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs(radians * (180 / Math.PI));
    if (angle > 180) angle = 360 - angle;
    return angle;
  }

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

  pose.onResults((results) => {
    if (!testing) return;

    canvasCtx.clearRect(0, 0, 640, 480);
    canvasCtx.drawImage(results.image, 0, 0, 640, 480);

    if (results.poseLandmarks) {
      const hip = results.poseLandmarks[23];
      const knee = results.poseLandmarks[25];
      const ankle = results.poseLandmarks[27];

      if (hip && knee && ankle) {
        const angle = calculateAngle(hip, knee, ankle);
        maxAngle = Math.max(maxAngle, angle);

        canvasCtx.fillStyle = "red";
        canvasCtx.font = "20px Arial";
        canvasCtx.fillText(`Knee Angle: ${angle.toFixed(1)}°`, 20, 40);
      }
    }
  });

  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await pose.send({ image: videoElement });
    },
    width: 640,
    height: 480,
  });

  camera.start().catch(err => {
    console.error("Camera failed:", err);
    alert("Camera permission blocked — allow it in browser");
  });

  setTimeout(() => {
    testing = false;
    camera.stop();
    container.innerHTML = "";
    onComplete(maxAngle);
  }, 30000);
}