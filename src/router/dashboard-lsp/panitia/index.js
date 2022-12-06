import test from '@/router/dashboard-lsp/panitia/test/index.js';
import soal from '@/router/dashboard-lsp/panitia/soal/index.js';
import mAuth from "@/middleware/authPanitia.js";

let routes = [
  {
    path: "/dashboard-lsp/panitia",
    name: "dashboard-lsp-panitia",
    meta: {
      page: "panitia",
      group: "dashboard-lsp-panitia",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Panitia/Index.vue"),
  },
  ...test,
  ...soal,
];

export default routes;
