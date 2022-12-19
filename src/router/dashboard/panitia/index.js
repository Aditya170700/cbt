import test from '@/router/dashboard/panitia/test/index.js';
import soal from '@/router/dashboard/panitia/soal/index.js';
import template from '@/router/dashboard/panitia/template/index.js';
import mAuth from "@/middleware/authPanitia.js";

let routes = [
  {
    path: "/dashboard/panitia",
    name: "dashboard-panitia",
    meta: {
      page: "panitia",
      group: "dashboard-panitia",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Panitia/Index.vue"),
  },
  ...test,
  ...soal,
  ...template,
];

export default routes;
