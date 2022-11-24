import test from '@/router/dashboard/administrator/test/index.js';
import soal from '@/router/dashboard/administrator/soal/index.js';
import mAuth from "@/middleware/authAdministratorPelatihan.js";

let routes = [
  {
    path: "/dashboard/administrator",
    name: "dashboard-administrator",
    meta: {
      page: "administrator",
      group: "dashboard-administrator",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Administrator/Index.vue"),
  },
  ...test,
  ...soal,
];

export default routes;
