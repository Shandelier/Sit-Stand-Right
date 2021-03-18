<template>
  <v-container>
    <!-- <v-row>
      <v-col v-for="k in 4" :key="k" cols="12" md="4">
        <v-card class="pa-2" outlined tile>
          One of two columns
        </v-card>
      </v-col>
    </v-row> -->
    <!-- <v-card
      class="d-inline-flex px-2 ma-2"
      :class="t.color"
      v-for="t in tags"
      :key="t.text"
    >
      {{ t.text }}
    </v-card> -->

    
        <v-flex xs="12"  cols="10">
          <h1 class="fadein space" >
          Hi there, I'm{{'\xa0'}}Karol
        </h1>
        <h2 class="my-12">
          Versatile <b class="glow">_Developer</b>, Hackathons Enthusiast, and{{'\xa0'}}Master's
          Student.
        </h2>
        <v-row align="center" justify="center" >
          <v-img
          elevation="15"
          class="pic"
          src="@/assets/Karol-pano.jpg"
        />
        </v-row>
        <p class="mt-12">
          Long time ago I was amazed with Archimedes,
          Leonardo Da Vinci and Wright Brothers inventions, and thought
          <i>"everything to this time has been already invented. There is{{'\xa0'}}nothing new to make"</i>.
        </p>
        <p>
          Everything changed when I discovered programming. From there I{{'\xa0'}}started to explore ideas and practise skills to become like those{{'\xa0'}}great Inventors. I value their cotributon to{{'\xa0'}}culture and
          technology and so – my work is dedicated to the same values.
        </p>
        <p>
          Recently i'm focused on developing
          <router-link to="/app" class="link">Sit{{'\xa0'}}Stand{{'\xa0'}}Right</router-link> – Gentle
          reminder of healthy posture.
        </p>
        <p>
          Correct posture is essential for wellbeing of people who devote themselfs to their craft.
          <ul>
            <li>Artist</li>
            <li>Musicians</li>
            <li>Programmers</li>
            <li>Scientists</li>
            <li>Office Workers</li>
            <li>Writers</li>
            <li>Engineers</li>
            <li>...and so on</li>
          </ul>
        </p>
        <p>
            All which forgot about themselfs in flow of doing. If you're one of them -{{'\xa0'}}<b class="glow">this{{'\xa0'}}App{{'\xa0'}}is{{'\xa0'}}for{{'\xa0'}}You</b>
        </p>
        </v-flex>
        <social-media-icons></social-media-icons>

  </v-container>
</template>

<script>
import SocialMediaIcons from './SocialMediaIcons.vue';
export default {
  name: "HomeText",
  components: {
    SocialMediaIcons,
  },
};
</script>

<style lang="scss" scoped>
</style>
