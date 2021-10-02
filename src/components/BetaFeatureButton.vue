<template>
  <div>
    <v-row justify="center" class="mt-8">
      <v-col cols="6" md="4">
        <v-row align="center" justify="space-around">
          <v-hover v-slot="{ hover }">
            <v-btn to="/betaapp" :color="hover ? 'primary' : ''">
              Beta Features
            </v-btn>
          </v-hover>
        </v-row>
      </v-col>
    </v-row>
    <div class="my-12"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.v-btn {
  transition: color 0.2s ease-in-out;
}
</style>
