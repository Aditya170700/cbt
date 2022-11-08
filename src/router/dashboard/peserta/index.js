import diklat from '@/router/dashboard/peserta/diklat/index.js';

let routes = [
  {
    path: "/dashboard/peserta",
    name: "dashboard-peserta",
    meta: {
      page: "peserta",
      group: "dashboard-peserta",
      role: "peserta",
    },
    component: () => import("@/views/Dashboard/Peserta/Index.vue"),
  },
  ...diklat,
];

export default routes;
