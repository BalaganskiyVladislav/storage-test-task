import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { routesConfig } from "@/router/routes";

const routes: Array<RouteRecordRaw> = [...routesConfig];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
