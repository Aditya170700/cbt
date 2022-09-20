import { createRouter, createWebHistory } from "vue-router";
import dashboard from "@/router/dashboard";
import questionBank from '@/router/dashboard/question-bank';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    ...dashboard,
    ...questionBank,
  ],
});

export default router;
