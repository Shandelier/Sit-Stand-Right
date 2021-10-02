import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Sit Stand Right",
    component: () => import("../views/MainApp.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/betaapp",
    name: "Beta App",
    component: () => import("../views/BetaApp.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
