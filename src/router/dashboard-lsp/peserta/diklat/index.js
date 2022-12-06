import mAuth from "@/middleware/authPeserta.js";

let routes = [
  {
    path: "/dashboard-lsp/peserta/diklat",
    name: "dashboard-lsp-peserta-diklat",
    meta: {
      page: "peserta",
      group: "dashboard-lsp-peserta-diklat",
      role: "peserta",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Peserta/Diklat/Index.vue"),
  },
  {
    path: "/dashboard-lsp/peserta/diklat/:id_diklat/test",
    name: "dashboard-lsp-peserta-diklat-test",
    meta: {
      page: "peserta",
      group: "dashboard-lsp-peserta-diklat",
      role: "peserta",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Peserta/Diklat/Test.vue"),
  },
  {
    path: "/dashboard-lsp/peserta/diklat/:id_diklat/jawaban/:id_test/:table",
    name: "dashboard-lsp-peserta-diklat-jawaban",
    meta: {
      page: "peserta",
      group: "dashboard-lsp-peserta-diklat",
      role: "peserta",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Peserta/Diklat/Jawaban.vue"),
  },
  {
    path: "/dashboard-lsp/peserta/diklat/:id_diklat/test/:id_test/do/:table",
    name: "dashboard-lsp-peserta-diklat-test-do",
    meta: {
      page: "peserta",
      group: "dashboard-lsp-peserta-diklat",
      role: "peserta",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Peserta/Diklat/Do.vue"),
  },
];

export default routes;
