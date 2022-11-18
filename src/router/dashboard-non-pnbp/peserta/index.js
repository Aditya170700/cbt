let routes = [
  {
    path: "/dashboard-non-pnbp/peserta",
    name: "dashboard-non-pnbp-peserta",
    meta: {
      page: "peserta-non-pnbp",
      group: "dashboard-non-pnbp-peserta",
      role: "peserta",
    },
    component: () => import("@/views/DashboardNonPnbp/Peserta/Index.vue"),
  },
];

export default routes;
