const demo = document.querySelector('.detector-demo');
const video = document.querySelector('#detection-video');
const startButton = document.querySelector('#start-detection');
const stopButton = document.querySelector('#stop-detection');
const statusLabel = document.querySelector('#detection-status-label');
const scoreLabel = document.querySelector('#detection-score');
const stageLabel = document.querySelector('#camera-stage-label');
const detectionLog = document.querySelector('#detection-log');

const visionModuleUrl = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.32/vision_bundle.mjs';
const visionWasmUrl = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.32/wasm';
const faceModelUrl = 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';

let cameraStream = null;
let faceLandmarker = null;
let animationFrame = 0;
let sessionId = 0;
let lastVideoTime = -1;
let lastDetectionAt = 0;
let eyesClosedSince = null;
let mouthOpenSince = null;
let lastMessage = '';

function showMessage(message) {
  if (message === lastMessage) return;
  lastMessage = message;
  detectionLog.textContent = message;
}

function releaseCamera() {
  if (animationFrame) cancelAnimationFrame(animationFrame);
  animationFrame = 0;

  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }

  video.srcObject = null;
  video.classList.remove('is-visible');
  stageLabel.hidden = false;
}

function stopCamera(message = 'Camera stopped. Your video was not uploaded.', status = 'Camera is off') {
  sessionId += 1;
  releaseCamera();
  if (faceLandmarker) {
    faceLandmarker.close();
    faceLandmarker = null;
  }
  demo.classList.remove('is-alert', 'is-running');
  eyesClosedSince = null;
  mouthOpenSince = null;
  lastVideoTime = -1;
  lastDetectionAt = 0;
  startButton.disabled = false;
  stopButton.disabled = true;
  statusLabel.textContent = status;
  scoreLabel.textContent = 'LOCAL PROCESSING';
  showMessage(message);
}

function describeCameraError(error) {
  if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
    return 'Camera permission was denied. Allow camera access in your browser settings, then try again.';
  }
  if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
    return 'No camera was found. Connect a camera and try again.';
  }
  if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
    return 'The camera could not start. It may already be in use by another app.';
  }
  if (error instanceof TypeError && !navigator.mediaDevices?.getUserMedia) {
    return 'Camera access requires a secure page. Open this site on localhost or over HTTPS.';
  }
  return 'The camera demo could not start. Check camera access and your internet connection, then try again.';
}

function readBlendshapeScores(result) {
  const categories = result.faceBlendshapes?.[0]?.categories;
  if (!categories) return null;
  const scores = new Map(categories.map(item => [item.categoryName, item.score]));
  const leftEye = scores.get('eyeBlinkLeft');
  const rightEye = scores.get('eyeBlinkRight');
  const mouth = scores.get('jawOpen');
  if (leftEye === undefined || rightEye === undefined || mouth === undefined) return null;
  return { eyeClosure: (leftEye + rightEye) / 2, mouthOpen: mouth };
}

function processFrame(now) {
  if (!cameraStream || !faceLandmarker) return;

  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
    && video.currentTime !== lastVideoTime
    && now - lastDetectionAt >= 100) {
    let result;
    try {
      result = faceLandmarker.detectForVideo(video, now);
    } catch (error) {
      console.error('Face detection stopped unexpectedly:', error);
      stopCamera('Face detection stopped unexpectedly. Restart the demo to try again.', 'Demo stopped');
      return;
    }
    lastVideoTime = video.currentTime;
    lastDetectionAt = now;

    if (!result.faceLandmarks.length) {
      eyesClosedSince = null;
      mouthOpenSince = null;
      demo.classList.remove('is-alert');
      statusLabel.textContent = 'Looking for a face';
      scoreLabel.textContent = 'NO FACE';
      showMessage('No face detected. Face the camera and move into the frame.');
    } else {
      const scores = readBlendshapeScores(result);
      if (!scores) {
        statusLabel.textContent = 'Face detected';
        scoreLabel.textContent = 'NO SCORES';
        showMessage('A face was found, but expression scores are unavailable. Adjust your position and try again.');
      } else {
        scoreLabel.textContent = `EYE CUE ${scores.eyeClosure.toFixed(2)} · MOUTH ${scores.mouthOpen.toFixed(2)}`;
        eyesClosedSince = scores.eyeClosure >= 0.65 ? eyesClosedSince ?? now : null;
        mouthOpenSince = scores.mouthOpen >= 0.7 ? mouthOpenSince ?? now : null;

        if (eyesClosedSince && now - eyesClosedSince >= 1500) {
          demo.classList.add('is-alert');
          statusLabel.textContent = 'Possible prolonged eye closure';
          showMessage('Possible prolonged eye closure detected. This simplified browser demo is not a driver-safety system.');
        } else if (mouthOpenSince && now - mouthOpenSince >= 1000) {
          demo.classList.add('is-alert');
          statusLabel.textContent = 'Possible yawn';
          showMessage('Possible yawn detected. This simplified browser demo is not a driver-safety system.');
        } else {
          demo.classList.remove('is-alert');
          statusLabel.textContent = 'Face detected';
          showMessage('Face tracking is active. Blink or open your mouth to see the demo cues.');
        }
      }
    }
  }

  animationFrame = requestAnimationFrame(processFrame);
}

startButton.addEventListener('click', async () => {
  const currentSession = ++sessionId;
  startButton.disabled = true;
  statusLabel.textContent = 'Requesting camera permission';
  scoreLabel.textContent = 'WAITING';
  showMessage('Your browser will ask for camera permission. The camera is used only while this demo is running.');

  try {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new TypeError('Camera access is not available in this browser context.');
    }

    cameraStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
    });

    if (currentSession !== sessionId) {
      cameraStream.getTracks().forEach(track => track.stop());
      cameraStream = null;
      return;
    }

    video.srcObject = cameraStream;
    await video.play();
    video.classList.add('is-visible');
    stageLabel.hidden = true;
    stopButton.disabled = false;
    statusLabel.textContent = 'Loading face model';
    showMessage('Loading the face-landmark model. The first download may take a moment.');

    const { FaceLandmarker, FilesetResolver } = await import(visionModuleUrl);
    if (currentSession !== sessionId) return;

    const vision = await FilesetResolver.forVisionTasks(visionWasmUrl);
    if (currentSession !== sessionId) return;

    faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: { modelAssetPath: faceModelUrl },
      runningMode: 'VIDEO',
      numFaces: 1,
      outputFaceBlendshapes: true,
    });
    if (currentSession !== sessionId) {
      faceLandmarker.close();
      faceLandmarker = null;
      return;
    }

    demo.classList.add('is-running');
    statusLabel.textContent = 'Looking for a face';
    showMessage('Model ready. Face the camera to begin the local demo.');
    animationFrame = requestAnimationFrame(processFrame);
  } catch (error) {
    if (currentSession !== sessionId) return;
    console.error('Could not start the camera detection demo:', error);
    stopCamera(describeCameraError(error), 'Demo unavailable');
  }
});

stopButton.addEventListener('click', () => stopCamera());
window.addEventListener('pagehide', () => stopCamera('Camera stopped because you left the page.'));
