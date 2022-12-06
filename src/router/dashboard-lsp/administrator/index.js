import test from '@/router/dashboard-lsp/administrator/test/index.js';
import soal from '@/router/dashboard-lsp/administrator/soal/index.js';
import mAuth from "@/middleware/authAdministratorPelatihan.js";

let routes = [
  {
    path: "/dashboard-lsp/administrator",
    name: "dashboard-lsp-administrator",
    meta: {
      page: "administrator",
      group: "dashboard-lsp-administrator",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Administrator/Index.vue"),
  },
  ...test,
  ...soal,
];

export default routes;
