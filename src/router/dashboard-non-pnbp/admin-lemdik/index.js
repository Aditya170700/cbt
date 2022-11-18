import test from "@/router/dashboard-non-pnbp/admin-lemdik/test/index.js";
import soal from "@/router/dashboard-non-pnbp/admin-lemdik/soal/index.js";

let routes = [
  {
    path: "/dashboard-non-pnbp/admin-lemdik/:id_lemdik",
    name: "dashboard-non-pnbp-admin-lemdik",
    meta: {
      page: "admin-lemdik-non-pnbp",
      group: "dashboard-non-pnbp-admin-lemdik",
      role: "admin-lemdik",
    },
    component: () => import("@/views/DashboardNonPnbp/AdminLemdik/Index.vue"),
  },
  ...test,
  ...soal,
];

export default routes;
