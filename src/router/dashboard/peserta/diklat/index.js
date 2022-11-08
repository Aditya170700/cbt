let routes = [
  {
    path: "/dashboard/peserta/diklat",
    name: "dashboard-peserta-diklat",
    meta: {
      page: "peserta",
      group: "dashboard-peserta-diklat",
      role: "peserta",
    },
    component: () => import("@/views/Dashboard/Peserta/Diklat/Index.vue"),
  },
  {
    path: "/dashboard/peserta/diklat/:id_diklat/show",
    name: "dashboard-peserta-diklat-show",
    meta: {
      page: "peserta",
      group: "dashboard-peserta-diklat",
      role: "peserta",
    },
    component: () => import("@/views/Dashboard/Peserta/Diklat/Show.vue"),
  },
];

export default routes;
