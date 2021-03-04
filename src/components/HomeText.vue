<template>
  <div>
    <vs-row>
      <vs-col offset="2" w="8">
        <h1 class="headline fadein">
          Hi, I'm Karol.<br />
          versatile Developer, <br />
          Hackathons Enthusiast,<br />
          and master's Student at PWr.
        </h1>

        <img class="pic" src="@/assets/Karol-pano.jpg" />

        <p>
          At this site you can try my new application -<br />
          <b>Sit Stand Right</b>
          or find my other projects and contact.
        </p>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  name: "HomeText"
};
</script>

<style lang="scss">
@import "@/styles/typo.scss";

h1 {
  font-size: 36px !important;
}

p {
  text-align: left;
}

b {
  font-weight: 900 !important;
  font-size: 1rem !important;
}
</style>
