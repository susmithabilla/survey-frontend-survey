
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import { Icon } from "@iconify/vue";
import VueApexCharts from "vue3-apexcharts";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";

// import "flowbite";
import "./assets/tailwind.css";
import "./assets/animate.css";
import "./assets/sass/css/windzo.css";

const app = createApp(App);
app.use(router, Icon);
app.use(VueApexCharts);
app.use(PerfectScrollbar);
app.use(store);
app.mount("#app");

// router.beforeEach((to, from, next) => {
//     console.log("beforeeeeeee",location.href);
//     console.log("tooooooo",to.query);
//   document.querySelector(".flex-sidebar").classList.add("hidden");
//   next();
// });

