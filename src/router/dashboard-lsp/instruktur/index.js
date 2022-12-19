import test from '@/router/dashboard-lsp/instruktur/test/index.js';
import soal from '@/router/dashboard-lsp/instruktur/soal/index.js';
import template from '@/router/dashboard-lsp/instruktur/template/index.js';
import mAuth from "@/middleware/authInstruktur.js";

let routes = [
  {
    path: "/dashboard-lsp/instruktur",
    name: "dashboard-lsp-instruktur",
    meta: {
      page: "instruktur",
      group: "dashboard-lsp-instruktur",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Instruktur/Index.vue"),
  },
  ...test,
  ...soal,
  ...template,
];

export default routes;
