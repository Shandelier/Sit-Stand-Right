import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuesax from "vuesax";
import "@/styles/reset.css";
import "@/styles/graph-style.css";
import "vuesax/dist/vuesax.css"; //Vuesax styles
import "@/styles/typebase.css";

Vue.config.productionTip = false;

Vue.use(Vuesax, {
  // options here
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
