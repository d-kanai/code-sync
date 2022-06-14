import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Coding from "@/views/Coding.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Coding",
    component: Coding,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
