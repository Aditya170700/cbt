import mAuth from "@/middleware/authPeserta.js";

let routes = [
  {
    path: "/dashboard/peserta/diklat",
    name: "dashboard-peserta-diklat",
    meta: {
      page: "peserta",
      group: "dashboard-peserta-diklat",
      role: "peserta",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Peserta/Diklat/Index.vue"),
  },
  {
    path: "/dashboard/peserta/diklat/:id_diklat/test",
    name: "dashboard-peserta-diklat-test",
    meta: {
      page: "peserta",
      group: "dashboard-peserta-diklat",
      role: "peserta",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Peserta/Diklat/Test.vue"),
  },
  {
    path: "/dashboard/peserta/diklat/:id_diklat/jawaban/:id_test/:table",
    name: "dashboard-peserta-diklat-jawaban",
    meta: {
      page: "peserta",
      group: "dashboard-peserta-diklat",
      role: "peserta",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Peserta/Diklat/Jawaban.vue"),
  },
  {
    path: "/dashboard/peserta/diklat/:id_diklat/test/:id_test/do/:table",
    name: "dashboard-peserta-diklat-test-do",
    meta: {
      page: "peserta",
      group: "dashboard-peserta-diklat",
      role: "peserta",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Peserta/Diklat/Do.vue"),
  },
];

export default routes;
