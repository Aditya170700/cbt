import { createRouter, createWebHistory } from "vue-router";
import dashboard from "@/router/dashboard";
import dashboardNonPnbp from "@/router/dashboard-non-pnbp/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...dashboard, ...dashboardNonPnbp],
});

export default router;
