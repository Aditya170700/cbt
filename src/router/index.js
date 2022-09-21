import { createRouter, createWebHistory } from "vue-router";
import dashboard from "@/router/dashboard";
import dashboardQuestionBank from '@/router/dashboard/question-bank';
import exam from '@/router/exam';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    ...dashboard,
    ...dashboardQuestionBank,
    ...exam,
  ],
});

export default router;
