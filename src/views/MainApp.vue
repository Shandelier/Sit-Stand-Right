<template>
  <div class="home">
    <vs-row>
      <vs-col offset="2" w="8">
        <section id="model">
          <!-- <h1>CURVA - your healthy posture</h1> -->
          <!-- <h2>Tilt your head to try it out.</h2> -->
          <vs-card type="1">
            <template #title>
              <h3 style="margin-bottom: 4px">
                {{ PostureMessage }}
              </h3>
            </template>
            <template #img>
              <div id="webcam-wrapper">
                <div class="loader"></div>
                <canvas
                  id="webcam-pose-canvas"
                  :class="webcamState ? '' : 'webcam-paused'"
                />
              </div>
            </template>
            <template #text>
              <b>posture feedback</b>
            </template>
            <template #interactions>
              <vs-tooltip>
                <vs-button @click="changeWebcamState()" primary icon>
                  <b :class="webcamStateStyle()"></b>
                </vs-button>
                <template #tooltip>
                  {{ pauseTooltip }}
                </template>
              </vs-tooltip>
              <vs-tooltip>
                <vs-button @click="changeSkeletonState()" primary icon>
                  <b :class="skeletonStateStyle()"></b>
                </vs-button>
                <template #tooltip>
                  {{ skeletonTooltip }}
                </template>
              </vs-tooltip>
            </template>
          </vs-card>

          <div id="graph-wrapper"></div>
        </section>

        <section id="article">
          <posture-article :isSlouching="computedIsSlouching"></posture-article>
        </section>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import {
  setupModel,
  cameraState,
  drawSkeletonState
} from "../scripts/model-runner.js";
import { setupBarGraph, updateBarGraph } from "../scripts/bar-graph.js";
import PostureArticle from "../components/PostureArticle.vue";
export default {
  data() {
    return {
      // URL: "https://teachablemachine.withgoogle.com/models/rpUwKWKb4/",
      // URL: "https://teachablemachine.withgoogle.com/models/lkWqoRjyR/",
      URL: "https://teachablemachine.withgoogle.com/models/ltPV1b67d/",
      webcamState: true,
      skeletonState: false,
      prediction: "",
      isSlouching: "",
      frames: Number,
      framerate: Number,
      consecutiveFrames: Number,
      consecutiveSlouchingTime: Number,
      predictionTimestamps: [],
      slouchFrames: Number,
      straightFrames: Number
    };
  },
  mounted() {
    // timer for how long user have to slouch to be notified about it (in miliseconds)
    this.consecutiveSlouchingTime = 350;
    // this.predictionTimestamps = new Array();
    // setupBarGraph is defined in the js/bar-graph.js file
    setupBarGraph(this.URL);
    // setupModel is defined in the js/model-runner.js file
    // we pass in another function: updateBarGraph (defined in the js/bar-graph.js file)
    // setupModel will store the updateBarGraph function,
    // and call it every time it has new prediction data from the model
    setupModel(this.URL, data => {
      updateBarGraph(data);
      this.prediction = data.reduce((max, prediction) =>
        max.probability > prediction.probability ? max : prediction
      ).className;
      this.postureDiagnosis();
    });
  },
  methods: {
    postureDiagnosis() {
      this.predictionTimestamps.push(new Date().getTime());

      if (this.predictionTimestamps.length >= 10) {
        this.countFramerate();
        this.consecutiveFrames = this.consecutiveSlouchingTime / this.framerate;
      }

      if (this.prediction == "straight") {
        this.straightFrames += 1;
        this.slouchFrames = 0;
      } else {
        this.slouchFrames += 1;
        this.straightFrames = 0;
      }

      if (this.slouchFrames >= this.consecutiveFrames) this.isSlouching = true;
      else this.isSlouching = false;
    },
    countFramerate() {
      var avg = 0;
      for (var i = 1; i < this.predictionTimestamps.length; i++) {
        // subtract first timestamp from every element to obtain sum of miliseconds
        avg += this.predictionTimestamps[i] - this.predictionTimestamps[i - 1];
      }
      // average time of predicting one frame
      this.framerate = avg / this.predictionTimestamps.length;
      // clean the list so the old pred times won't impact current framerate value
      this.predictionTimestamps = [];
    },
    changeWebcamState() {
      this.webcamState = !this.webcamState;
      cameraState();
    },
    webcamStateStyle() {
      return this.webcamState ? "bx bx-pause-circle" : "bx bx-play-circle";
    },
    skeletonStateStyle() {
      return this.skeletonState ? "bx bx-shape-polygon" : "bx bx-shape-polygon";
    },
    changeSkeletonState() {
      this.skeletonState = !this.skeletonState;
      drawSkeletonState();
    }
  },
  computed: {
    computedIsSlouching() {
      return this.isSlouching;
    },
    pauseTooltip() {
      if (this.webcamState) {
        return "Pause pose feedback";
      } else {
        return "Continue pose feedback ";
      }
    },
    skeletonTooltip() {
      if (this.skeletonState) {
        return "Draw skeleton";
      } else {
        return "Pause drawing skeleton ";
      }
    },
    PostureMessage() {
      let msg = "";
      switch (this.prediction) {
        case "straight":
          msg = "good 🍺";
          break;
        case "slouch":
          msg = "caveman 🍖";
          break;

        default:
          msg = "Loading Model 👩";
          break;
      }
      return msg;
    }
  },
  components: {
    PostureArticle
  }
};
</script>

<style lang="scss" scoped>
.bx {
  font-size: 1.2rem;
}

.webcam-paused {
  filter: blur(1.2px);
}
</style>
