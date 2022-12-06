import diklat from '@/router/dashboard-lsp/peserta/diklat/index.js';
import mAuth from "@/middleware/authPeserta.js";

let routes = [
  {
    path: "/dashboard-lsp/peserta",
    name: "dashboard-lsp-peserta",
    meta: {
      page: "peserta",
      group: "dashboard-lsp-peserta",
      role: "peserta",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Peserta/Index.vue"),
  },
  ...diklat,
];

export default routes;
