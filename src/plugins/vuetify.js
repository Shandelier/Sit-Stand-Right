import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#fd2459",
        secondary: "#fa7a4e",
        default: "#2c3e50"
      }
    }
  }
});

export default vuetify;
