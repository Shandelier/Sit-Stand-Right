<template>
  <div>
    <v-row justify="center" class=" mt-8">
      <v-col class="d-flex align-center">
        <v-divider role="presentation"></v-divider>
      </v-col>
      <v-col cols="6" md="4">
        <v-row align="center" justify="space-around">
          <v-hover v-slot="{ hover }">
            <v-btn icon href="https://twitter.com/KarolCodes" target="_blank">
              <v-icon large :color="hover ? 'primary' : ''">mdi-twitter</v-icon>
            </v-btn>
          </v-hover>
          <v-hover v-slot="{ hover }">
            <v-btn icon href="https://github.com/Shandelier" target="_blank">
              <v-icon large :color="hover ? 'primary' : ''">mdi-github</v-icon>
            </v-btn>
          </v-hover>
          <v-hover v-slot="{ hover }">
            <v-btn
              icon
              href="https://linkedin.com/in/KarolCodes"
              target="_blank"
            >
              <v-icon large :color="hover ? 'primary' : ''"
                >mdi-linkedin</v-icon
              >
            </v-btn>
          </v-hover>
        </v-row>
      </v-col>
      <v-col class="d-flex align-center">
        <v-divider role="presentation"></v-divider>
      </v-col>
    </v-row>
    <div class="my-12"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.v-divider {
  border-width: thin 0 1px 0 !important;
  padding: 0;
  margin: 0;
}
</style>
