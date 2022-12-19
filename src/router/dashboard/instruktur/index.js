import test from '@/router/dashboard/instruktur/test/index.js';
import soal from '@/router/dashboard/instruktur/soal/index.js';
import template from '@/router/dashboard/instruktur/template/index.js';
import mAuth from "@/middleware/authInstruktur.js";

let routes = [
  {
    path: "/dashboard/instruktur",
    name: "dashboard-instruktur",
    meta: {
      page: "instruktur",
      group: "dashboard-instruktur",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Instruktur/Index.vue"),
  },
  ...test,
  ...soal,
  ...template,
];

export default routes;
