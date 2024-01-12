import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Aos from "aos";
import "aos/dist/aos.css";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Favorites from "./pages/Favorites.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/favorites", name: "favorites", component: Favorites },
];
const Router = createRouter({
  history: createWebHistory(),
  routes,
});
const app = createApp(App, Aos.init());
app.use(autoAnimatePlugin);
app.use(Router);
app.mount("#app");
