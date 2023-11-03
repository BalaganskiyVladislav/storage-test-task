import { RouteRecordRaw } from "vue-router";
import HomePage from "@/views/HomePage.vue";

type pagesRoutes = Record<string | number | symbol, RouteRecordRaw>;

export const pagesRoutes: pagesRoutes = {
  home: {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  error: {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
};

export const routesConfig: Array<RouteRecordRaw> = [];

Object.keys(pagesRoutes).forEach((key) => {
  routesConfig.push(pagesRoutes[key as keyof pagesRoutes]);
});
