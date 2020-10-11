/* eslint-disable prettier/prettier */
<template>
  <div class="CURVA">
    <section id="model">
      <!-- <h1>CURVA - your healthy posture</h1> -->
      <!-- <h2>Tilt your head to try it out.</h2> -->
      <vs-card type="1">
        <template #title>
          <h3 style="font-style: italic; margin-bottom: 4px">
            {{ PostureMessage }}
          </h3>
        </template>
        <template #img>
          <div id="webcam-wrapper">
            <div class="loader"></div>
            <canvas
              id="webcam-pose-canvas"
              :class="state ? '' : 'webcam-paused'"
            ></canvas>
          </div>
        </template>
        <template #text>
          <b>posture feedback</b>
        </template>
        <template #interactions>
          <vs-tooltip>
            <vs-button
              @click="webcamState()"
              primary
              icon
              style="margin-left: 20px;"
            >
              <b
                :class="state ? 'bx bx-pause-circle' : 'bx bx-play-circle'"
              ></b>
            </vs-button>
            <template #tooltip>
              {{ pauseTooltip }}
            </template>
          </vs-tooltip>
        </template>
      </vs-card>
      <div id="graph-wrapper"></div>
    </section>
  </div>
</template>

<script>
import { setupModel, cameraState } from "../scripts/model-runner.js";
import { setupBarGraph, updateBarGraph } from "../scripts/bar-graph.js";
export default {
  data() {
    return {
      // train your own model using [TODO_TM2_URL], and replace this URL with your own
      URL: "https://teachablemachine.withgoogle.com/models/rpUwKWKb4/",
      state: true,
      prediction: "",
    };
  },
  mounted() {
    // setupBarGraph is defined in the js/bar-graph.js file
    setupBarGraph(this.URL);
    // setupModel is defined in the js/model-runner.js file
    // we pass in another function: updateBarGraph (defined in the js/bar-graph.js file)
    // setupModel will store the updateBarGraph function,
    // and call it every time it has new prediction data from the model
    setupModel(this.URL, (data) => {
      updateBarGraph(data);
      this.prediction = data.reduce((max, prediction) =>
        max.probability > prediction.probability ? max : prediction
      ).className;
    });
  },
  methods: {
    webcamState() {
      this.state = !this.state;
      cameraState();
    },
  },
  computed: {
    pauseTooltip() {
      if (this.state) {
        return "Pause pose feedback";
      } else {
        return "Continue pose feedback ";
      }
    },
    PostureMessage() {
      let msg = "";
      switch (this.prediction) {
        case "straight":
          msg = "good posture 🍺";
          break;
        case "slouching-front":
          msg = "you're a caveman 🍖";
          break;
        case "slouch-right":
          msg = "you're leaning right 👉";
          break;
        case "slouch-left":
          msg = "you're leaning left 👈";
          break;

        default:
          msg = "Model Loading 👩";
          break;
      }
      return msg;
    },
  },
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
