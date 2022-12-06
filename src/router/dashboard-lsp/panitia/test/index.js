import mAuth from "@/middleware/authPanitia.js";

let routes = [
  {
    path: "/dashboard-lsp/panitia/test",
    name: "dashboard-lsp-panitia-test",
    meta: {
      page: "panitia",
      group: "dashboard-lsp-panitia-test",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Panitia/Test/Index.vue"),
  },
  {
    path: "/dashboard-lsp/panitia/test/:id_test/show/:table",
    name: "dashboard-lsp-panitia-test-show",
    meta: {
      page: "panitia",
      group: "dashboard-lsp-panitia-test",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Panitia/Test/Show.vue"),
  },
  {
    path: "/dashboard-lsp/panitia/test/:id_test/nilai/:table",
    name: "dashboard-lsp-panitia-test-nilai",
    meta: {
      page: "panitia",
      group: "dashboard-lsp-panitia-test",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Panitia/Test/Nilai.vue"),
  },
  {
    path: "/dashboard-lsp/panitia/test/:id_test/nilai/:table/input/:id_peserta",
    name: "dashboard-lsp-panitia-test-nilai-input",
    meta: {
      page: "panitia",
      group: "dashboard-lsp-panitia-test",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Panitia/Test/InputNilai.vue"),
  },
];

export default routes;
