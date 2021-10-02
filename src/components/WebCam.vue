<template>
  <v-flex>
    <!-- <vs-card type="1">
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
    </vs-card> -->

    <section id="model">
      <v-card elevation="6">
        <div id="webcam-wrapper">
          <div class="loader"></div>
          <canvas
            id="webcam-pose-canvas"
            :class="webcamState ? '' : 'webcam-paused'"
          />
        </div>

        <v-row
          align="center"
          justify="space-around"
          class="ma-0"
          style="max-width: 300px"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="changeWebcamState()"
                v-bind="attrs"
                v-on="on"
                :class="webcamStateStyle()"
                class="icon glow"
              >
                {{ webcamPauseIcon }}
              </v-icon>
            </template>
            <span>{{ pauseTooltip }}</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="changeSkeletonState()"
                v-bind="attrs"
                v-on="on"
                :class="skeletonStateStyle()"
                class="icon glow"
              >
                mdi-vector-polyline
              </v-icon>
            </template>
            <span>{{ skeletonTooltip }}</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="changeSkeletonState()"
                v-bind="attrs"
                v-on="on"
                :class="skeletonStateStyle()"
                class="icon glow"
              >
                mdi-help
              </v-icon>
            </template>
            <span>How to use?</span>
          </v-tooltip>
        </v-row>

        <h3 class="ma-4 hug mx-8">
          {{ PostureMessage }}
        </h3>

        <div></div>
      </v-card>

      <v-row style="height: 86px" class="mb-16">
        <v-col :style="getPageHeight">
          <v-card id="sticky" class="d-flex justify-center my-6" elevation="6">
            <div id="graph-wrapper"></div>
          </v-card>
        </v-col>
      </v-row>
    </section>
  </v-flex>
</template>

<script>
import {
  setupModel,
  cameraState,
  drawSkeletonState
} from "../scripts/model-runner.js";
import { setupBarGraph, updateBarGraph } from "../scripts/bar-graph.js";
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
      straightFrames: Number,
      pageHeight: Number,
      VPHeight: Number
    };
  },
  mounted() {
    // timer for how long user have to slouch to be notified about it (in miliseconds)
    this.consecutiveSlouchingTime = 20000;
    this.consecutiveFrames = 200;
    this.slouchFrames = 0;
    // this.predictionTimestamps = new Array();
    // setupBarGraph is defined in the js/bar-graph.js file
    setupBarGraph(this.URL);
    this.pageHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight
    );
    this.VPHeight = document.documentElement.clientHeight;
    // setupModel is defined in the js/model-runner.js file
    // we pass in another function: updateBarGraph (defined in the js/bar-graph.js file)
    // setupModel will store the updateBarGraph function,
    // and call it every time it has new prediction data from the model
    setupModel(this.URL, (data) => {
      this.prediction = data.reduce((max, prediction) =>
        max.probability > prediction.probability ? max : prediction
      ).className;
      this.postureDiagnosis();
      data[2] = {
        className: "health",
        probability:
          (this.consecutiveFrames - this.slouchFrames) / this.consecutiveFrames
      };
      updateBarGraph(data);
    });
  },
  methods: {
    postureDiagnosis() {
      this.predictionTimestamps.push(new Date().getTime());

      if (this.predictionTimestamps.length >= 50) {
        this.countFramerate();
        this.consecutiveFrames = this.consecutiveSlouchingTime / this.framerate;
      }

      if (this.prediction == "straight" && this.slouchFrames > 0) {
        this.straightFrames += 1;
        this.slouchFrames -= 1;
      } else if (
        this.prediction == "slouch" &&
        this.slouchFrames + 1 < this.consecutiveFrames
      ) {
        this.slouchFrames += 2;
        this.straightFrames = 0;
      }

      if (this.slouchFrames < 0) this.slouchFrames = 0;
      else if (this.slouchFrames > this.consecutiveFrames)
        this.slouchFrames = this.consecutiveFrames;

      if (this.slouchFrames >= this.consecutiveFrames) {
        this.isSlouching = true;
        this.$emit("slouchEvent", true);
      } else {
        this.isSlouching = false;
        this.$emit("slouchEvent", false);
      }
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
      return this.webcamState ? "icon glow" : "icon";
    },
    skeletonStateStyle() {
      return this.skeletonState ? "icon" : "icon glow";
    },
    changeSkeletonState() {
      this.skeletonState = !this.skeletonState;
      drawSkeletonState();
    }
  },
  computed: {
    getPageHeight() {
      return "height: " + (this.pageHeight - this.VPHeight) + "px;";
    },
    webcamPauseIcon() {
      if (this.webcamState) {
        return "mdi-pause";
      } else {
        return "mdi-play";
      }
    },
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
        return "Pause drawing skeleton";
      } else {
        return "Draw skeleton";
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
  }
};
</script>

<style lang="scss">
@import "../styles/graph-style.css";

.webcam-paused {
  filter: blur(1.2px);
}

#sticky {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 32px;
  z-index: 10;
}

// https://codepen.io/arturoalviar/pen/GZxrmp
</style>
