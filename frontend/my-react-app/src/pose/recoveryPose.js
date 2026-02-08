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
  videoElement.width = 1280;
  videoElement.height = 680;

  //creates a canvas
  const canvasElement = document.createElement("canvas");
  canvasElement.width = videoElement.width;
  canvasElement.height = videoElement.height;
  const canvasCtx = canvasElement.getContext("2d");

  //container.appendChild(videoElement);
  videoElement.style.display = "none";
  container.appendChild(canvasElement);

  let maxAngle = 0;
  let testing = true;

  function calculateAngle(a, b, c) {
    const radians =
      Math.atan2(c.y - b.y, c.x - b.x) -
      Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs(radians * (180 / Math.PI));
    //if (angle > 180) 
    angle = 180 - (360 - angle);
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

  // Clear and draw video
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

  if (results.poseLandmarks) {
    // Draw all connectors (the default MediaPipe skeleton)
    drawingUtils.drawConnectors(
      results.poseLandmarks,
      PoseLandmark.POSE_CONNECTIONS, // connects all keypoints
      { color: "lime", lineWidth: 4 }
    );

    // Optionally draw landmarks themselves
    drawingUtils.drawLandmarks(results.poseLandmarks, { color: "red", radius: 5 });

    // Example: draw your knee angle line manually
    const hip = results.poseLandmarks[23];
    const knee = results.poseLandmarks[25];
    const ankle = results.poseLandmarks[27];

    if (hip && knee && ankle) {
      const angle = calculateAngle(hip, knee, ankle);
      maxAngle = Math.max(maxAngle, angle);

      // Draw your custom knee line separately (optional)
      canvasCtx.strokeStyle = "red";
      canvasCtx.lineWidth = 3;
      canvasCtx.beginPath();
      canvasCtx.moveTo(hip.x * canvasElement.width, hip.y * canvasElement.height);
      canvasCtx.lineTo(knee.x * canvasElement.width, knee.y * canvasElement.height);
      canvasCtx.lineTo(ankle.x * canvasElement.width, ankle.y * canvasElement.height);
      canvasCtx.stroke();

      // Draw angle text
      canvasCtx.fillStyle = "white";
      canvasCtx.font = "40px Arial";
      canvasCtx.fillText(`Knee Angle: ${angle.toFixed(1)}°`, 20, 40);
    }
  }
});


  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await pose.send({ image: videoElement });
    },
    width: canvasElement.width,
    height: canvasElement.height,
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

function drawLine(ctx, p1, p2, color = "lime", width = 4) {
  ctx.beginPath();
  ctx.moveTo(p1.x * canvasElement.width, p1.y * canvasElement.height);
  ctx.lineTo(p2.x * canvasElement.width, p2.y * canvasElement.height);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

function drawAngleArc(ctx, hip, knee, ankle) {
  const kx = knee.x * canvasElement.width;
  const ky = knee.y * canvasElement.height;

  const angle1 = Math.atan2(
    hip.y - knee.y,
    hip.x - knee.x
  );
  const angle2 = Math.atan2(
    ankle.y - knee.y,
    ankle.x - knee.x
  );

  ctx.beginPath();
  ctx.arc(kx, ky, 30, angle1, angle2);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;
  ctx.stroke();
}
