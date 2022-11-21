import mAuth from "@/middleware/auth.js";

let routes = [
  {
    path: "/dashboard-non-pnbp/peserta/diklat",
    name: "dashboard-non-pnbp-peserta-diklat",
    meta: {
      page: "peserta-non-pnbp",
      group: "dashboard-non-pnbp-peserta-diklat",
      role: "peserta",
      middleware: [mAuth],
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
      middleware: [mAuth],
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
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardNonPnbp/Peserta/Diklat/Jadwal/Test.vue"),
  },
  {
    path: "/dashboard-non-pnbp/peserta/diklat/:id_diklat/jadwal/:id_jadwal/test/:id_test/do/:table",
    name: "dashboard-non-pnbp-peserta-diklat-jadwal-test-do",
    meta: {
      page: "peserta-non-pnbp",
      group: "dashboard-non-pnbp-peserta-diklat",
      role: "peserta",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardNonPnbp/Peserta/Diklat/Jadwal/Do.vue"),
  },
  {
    path: "/dashboard-non-pnbp/peserta/diklat/:id_diklat/jadwal/:id_jadwal/test/:id_test/jawaban/:table",
    name: "dashboard-non-pnbp-peserta-diklat-jadwal-test-jawaban",
    meta: {
      page: "peserta-non-pnbp",
      group: "dashboard-non-pnbp-peserta-diklat",
      role: "peserta",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardNonPnbp/Peserta/Diklat/Jadwal/Jawaban.vue"),
  },
];

export default routes;
