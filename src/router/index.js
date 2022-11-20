import { createRouter, createWebHistory } from "vue-router";
import dashboard from "@/router/dashboard";
import dashboardNonPnbp from "@/router/dashboard-non-pnbp/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/peserta",
      name: "peserta",
      meta: {
        page: "peserta",
        group: "peserta",
        role: "peserta",
      },
      component: () => import("@/views/Peserta.vue"),
    },
    {
      path: "/instruktur",
      name: "instruktur",
      meta: {
        page: "instruktur",
        group: "instruktur",
        role: "instruktur",
      },
      component: () => import("@/views/Instruktur.vue"),
    },
    ...dashboard,
    ...dashboardNonPnbp,
  ],
});

export default router;
