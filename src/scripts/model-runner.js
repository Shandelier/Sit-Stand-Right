let model, webcam, predictionCallback, context;
let state = true;
let drawSkeleton = false;
import * as tmPose from "@teachablemachine/pose";

// This function sets up the model trained in Teachable Machine.
// it takes in the URL to the model, and a function to be run
// each time the model makes a new prediction.
export async function setupModel(URL, predictionCB) {
  //store the prediction callback function
  predictionCallback = predictionCB;
  // the model.json file stores a reference to the trained model
  const modelURL = `${URL}model.json`;
  // the metatadata.json file contains the text labels of your model and additional information
  const metadataURL = `${URL}metadata.json`;

  // Load the model using the tmPose library
  model = await tmPose.load(modelURL, metadataURL);

  // this function from the tmImage library returns a video element that
  // shows a video feed from the webcam
  webcam = new tmPose.Webcam(200, 200, true); //width, height, flipped
  await webcam.setup(); // request access to the webcam
  document.getElementById("webcam-wrapper").appendChild(webcam.webcam);
  let wc = document.getElementsByTagName("video")[0];
  wc.setAttribute("playsinline", true); // written with "setAttribute" bc. iOS buggs otherwise :-)
  wc.muted = "true";
  wc.id = "webcamVideo";

  await webcam.play();

  // get our canvas that we will draw the webcam and pose to
  const canvas = document.getElementById("webcam-pose-canvas");
  canvas.width = 200;
  canvas.height = 200;
  context = canvas.getContext("2d");

  // kick off the model prediction loop
  requestAnimationFrame(loop);
}

// This function will run forever in a loop
async function loop() {
  // update the webcam frame
  webcam.update();
  // make a prediction using the model
  await predict();
  // then call loop again
  if (state) {
    requestAnimationFrame(loop);
  }
}

// This function uses the model we loaded to
// get pose data from the webcam data, then make a prediction on that data
async function predict() {
  // Prediction #1: run the webcam through posenet
  // estimatePose can take in an image, video or canvas html element
  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
  // Prediction 2: run pose data through teachable machine model
  const prediction = await model.predict(posenetOutput);

  // Update the visualization on the canvas
  drawWebcamAndPose(pose);

  // Call the prediction callback function now that we have new prediction data
  predictionCallback(prediction);
}

function drawWebcamAndPose(pose) {
  // draw the webcam image to the canvas
  context.drawImage(webcam.canvas, 0, 0);

  // draw the keypoints and skeleton to the canvas
  // from the pose prediction of our model
  if (pose && drawSkeleton) {
    const minPartConfidence = 0.2;
    const keypointSize = 2;
    const lineWidth = 1;
    const fillColor = "#fe3464";
    tmPose.drawKeypoints(
      pose.keypoints,
      minPartConfidence,
      context,
      keypointSize,
      fillColor,
      fillColor
    );
    tmPose.drawSkeleton(
      pose.keypoints,
      minPartConfidence,
      context,
      lineWidth,
      fillColor
    );
  }
}

export function cameraState() {
  state = !state;
  if (!state) {
    webcam.pause();
    return;
  } else {
    webcam.play();
    requestAnimationFrame(loop);
    return;
  }
}

export function drawSkeletonState() {
  drawSkeleton = !drawSkeleton;
}
