import test from "@/router/dashboard-non-pnbp/instruktur/test/index.js";
import soal from "@/router/dashboard-non-pnbp/instruktur/soal/index.js";

let routes = [
  {
    path: "/dashboard-non-pnbp/instruktur",
    name: "dashboard-non-pnbp-instruktur",
    meta: {
      page: "instruktur-non-pnbp",
      group: "dashboard-non-pnbp-instruktur",
      role: "instruktur",
    },
    component: () => import("@/views/DashboardNonPnbp/Instruktur/Index.vue"),
  },
  ...test,
  ...soal,
];

export default routes;
