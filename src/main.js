import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuesax from "vuesax";
import boxicons from "boxicons";
// import "@/styles/reset.css";
// import "@/styles/graph-style.css";
// import "vuesax/dist/vuesax.css"; //Vuesax styles
// import "@/styles/typo.scss";
import "@/styles/typebase.scss";
import vuetify from "./plugins/vuetify";
// import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

Vue.use(Vuesax, {
  // options here
});

new Vue({
  router,
  vuetify,
  boxicons,
  render: h => h(App)
}).$mount("#app");
