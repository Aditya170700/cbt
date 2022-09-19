import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/Dashboard/Index.vue"),
    },
  ],
});

export default router;
