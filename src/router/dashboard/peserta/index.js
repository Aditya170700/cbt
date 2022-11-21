import diklat from '@/router/dashboard/peserta/diklat/index.js';
import mAuth from "@/middleware/auth.js";

let routes = [
  {
    path: "/dashboard/peserta",
    name: "dashboard-peserta",
    meta: {
      page: "peserta",
      group: "dashboard-peserta",
      role: "peserta",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Peserta/Index.vue"),
  },
  ...diklat,
];

export default routes;
