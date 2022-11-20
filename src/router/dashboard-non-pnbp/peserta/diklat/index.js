let routes = [
  {
    path: "/dashboard-non-pnbp/peserta/diklat",
    name: "dashboard-non-pnbp-peserta-diklat",
    meta: {
      page: "peserta-non-pnbp",
      group: "dashboard-non-pnbp-peserta-diklat",
      role: "peserta",
    },
    component: () => import("@/views/DashboardNonPnbp/Peserta/Diklat/Index.vue"),
  },
  {
    path: "/dashboard-non-pnbp/peserta/diklat/:id_diklat/jadwal",
    name: "dashboard-non-pnbp-peserta-diklat-jadwal",
    meta: {
      page: "peserta-non-pnbp",
      group: "dashboard-non-pnbp-peserta-diklat",
      role: "peserta",
    },
    component: () => import("@/views/DashboardNonPnbp/Peserta/Diklat/Jadwal.vue"),
  },
  {
    path: "/dashboard-non-pnbp/peserta/diklat/:id_diklat/jadwal/:id_jadwal/test",
    name: "dashboard-non-pnbp-peserta-diklat-jadwal-test",
    meta: {
      page: "peserta-non-pnbp",
      group: "dashboard-non-pnbp-peserta-diklat",
      role: "peserta",
    },
    component: () => import("@/views/DashboardNonPnbp/Peserta/Diklat/Jadwal/Test.vue"),
  },
  {
    path: "/dashboard-non-pnbp/peserta/diklat/:id_diklat/jadwal/:id_jadwal/test/:id_test/:table",
    name: "dashboard-non-pnbp-peserta-diklat-jadwal-test-do",
    meta: {
      page: "peserta-non-pnbp",
      group: "dashboard-non-pnbp-peserta-diklat",
      role: "peserta",
    },
    component: () => import("@/views/DashboardNonPnbp/Peserta/Diklat/Jadwal/Do.vue"),
  },
];

export default routes;
