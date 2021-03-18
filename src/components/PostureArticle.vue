<template>
  <v-card
    class="pa-8 card"
    :style="computedBlur"
    style="max-width: 680px"
    elevation="6"
  >
    <!-- <vs-button v-on:click="changeBlur()">Change Blur</vs-button> -->
    <h2 class="hug my-8">Healthy posture <b class="glow">Superpowers</b></h2>
    <h3>1. Better breathing</h3>
    <p>
      Research shows that poor posture negatively affects your ability to
      breathe deeply and fill your lungs. Slouching shortens the muscles at the
      front of your body and reduces your ability to breathe in fully. Standing
      up tall may actually improve your ability to bring in good old oxygen by
      as much as 30%.
    </p>
    <h3>2. Super self-confidence</h3>

    <p>
      When you stand up tall, you have a presence that’s noticed by others. You
      look confident, self-assured, and poised. Slouching and slumping
      communicate a sad demeanor and a lack of self-esteem.
    </p>
    <h3>3. Back relief</h3>
    <p>
      Your body is designed to stand in a “neutral” position in which your
      pelvis, head, and torso are in a stacked position. Forward head, tilted
      hips, and overly curved spines put stress on muscles in ways they aren’t
      designed to endure. And, over the long term, this stress causes pain –
      usually in your back. When you have good posture, you use the muscles that
      support your spine properly. Plus, the bones, joints, ligaments, and other
      connective tissue also all cooperate to keep the entirety of your back
      feeling less strained and stressed. Standing and sitting with good posture
      uses your muscles in the way they were designed, so your body – especially
      your back – feels better.
    </p>

    <h3>4. Improved mood</h3>

    <p>
      Your posture affects your mood. Think of how a person looks when depressed
      – slouched and slumped with shoulders that hunch and a head that hangs.
      When you feel relaxed and happy, you naturally find an upright, open
      posture. If you’re feeling down, stand up, pull your shoulders back, and
      lift your face. This simple action can help you feel more optimistic.
    </p>
    <h3>5. Optimal digestion</h3>
    <p>
      When you have good posture, your internal organs align well. That means
      less compression on your stomach, intestines, and liver, facilitating the
      free flow of food and digestive juices. A slouched posture inhibits the
      normal activity of your gastrointestinal system, which makes you
      vulnerable to digestive distress – including constipation and GERD.
    </p>
  </v-card>
</template>

<script>
export default {
  name: "PostureArticle",
  props: {
    isSlouching: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isSlouching() {
      this.changeBlur();
    }
  },
  data() {
    return {
      blur: "",
      pageHeight: 0
    };
  },
  computed: {
    computedBlur() {
      return this.blur;
    }
  },
  methods: {
    changeBlur() {
      this.isSlouching
        ? (this.blur =
            "filter: blur(1.2px); box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);")
        : (this.blur = " blur(0);");
    }
  }
};
</script>

<style lang="scss">
h3 {
  margin-top: 48px;
  margin-bottom: 16px;
}
</style>
