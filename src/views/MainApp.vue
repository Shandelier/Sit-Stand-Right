<template>
  <div class="home">
    <v-row align="center" justify="center">
      <v-col
        xs="12"
        cols="10"
        align="center"
        justify="center"
        style="max-width: 1000px"
      >
        <section id="model" class="mx-4">
          <web-cam @slouchEvent="isSlouching = $event"></web-cam>
          <!-- <h1>CURVA - your healthy posture</h1> -->
          <!-- <h2>Tilt your head to try it out.</h2> -->
        </section>

        <section id="article">
          <posture-article :isSlouching="computedIsSlouching"></posture-article>
        </section>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PostureArticle from "../components/PostureArticle.vue";
import WebCam from "../components/WebCam.vue";
export default {
  data() {
    return {
      isSlouching: ""
    };
  },
  components: {
    PostureArticle,
    WebCam
  },
  computed: {
    computedIsSlouching() {
      return this.isSlouching;
    }
  }
};
</script>

<style lang="scss" scoped></style>
