import mAuth from "@/middleware/authInstruktur.js";

let routes = [
  {
    path: "/dashboard-lsp/instruktur/test",
    name: "dashboard-lsp-instruktur-test",
    meta: {
      page: "instruktur",
      group: "dashboard-lsp-instruktur-test",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Instruktur/Test/Index.vue"),
  },
  {
    path: "/dashboard-lsp/instruktur/test/:id_test/show/:table",
    name: "dashboard-lsp-instruktur-test-show",
    meta: {
      page: "instruktur",
      group: "dashboard-lsp-instruktur-test",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Instruktur/Test/Show.vue"),
  },
  {
    path: "/dashboard-lsp/instruktur/test/:id_test/nilai/:table",
    name: "dashboard-lsp-instruktur-test-nilai",
    meta: {
      page: "instruktur",
      group: "dashboard-lsp-instruktur-test",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Instruktur/Test/Nilai.vue"),
  },
  {
    path: "/dashboard-lsp/instruktur/test/:id_test/nilai/:table/input/:id_peserta",
    name: "dashboard-lsp-instruktur-test-nilai-input",
    meta: {
      page: "instruktur",
      group: "dashboard-lsp-instruktur-test",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Instruktur/Test/InputNilai.vue"),
  },
];

export default routes;
