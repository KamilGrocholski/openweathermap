import { createRouter, createWebHistory } from "vue-router";

import { publicRoutes } from "./public";

const routes = [...publicRoutes];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
