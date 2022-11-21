import diklat from "@/router/dashboard-non-pnbp/peserta/diklat/index.js";
import mAuth from "@/middleware/auth.js";

let routes = [
  {
    path: "/dashboard-non-pnbp/peserta",
    name: "dashboard-non-pnbp-peserta",
    meta: {
      page: "peserta-non-pnbp",
      group: "dashboard-non-pnbp-peserta",
      role: "peserta",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardNonPnbp/Peserta/Index.vue"),
  },
  ...diklat,
];

export default routes;
