import test from "@/router/dashboard-non-pnbp/admin-lemdik/test/index.js";
import soal from "@/router/dashboard-non-pnbp/admin-lemdik/soal/index.js";
import template from "@/router/dashboard-non-pnbp/admin-lemdik/template/index.js";
import mAuth from "@/middleware/authAdminLemdik.js";

let routes = [
  {
    path: "/dashboard-non-pnbp/admin-lemdik/:id_lemdik",
    name: "dashboard-non-pnbp-admin-lemdik",
    meta: {
      page: "admin-lemdik-non-pnbp",
      group: "dashboard-non-pnbp-admin-lemdik",
      role: "admin-lemdik",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardNonPnbp/AdminLemdik/Index.vue"),
  },
  ...test,
  ...soal,
  ...template,
];

export default routes;
