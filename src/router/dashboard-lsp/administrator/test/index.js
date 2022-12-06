import mAuth from "@/middleware/authAdministratorPelatihan.js";

let routes = [
  {
    path: "/dashboard-lsp/administrator/test",
    name: "dashboard-lsp-administrator-test",
    meta: {
      page: "administrator",
      group: "dashboard-lsp-administrator-test",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Administrator/Test/Index.vue"),
  },
  {
    path: "/dashboard-lsp/administrator/test/:id_test/show/:table",
    name: "dashboard-lsp-administrator-test-show",
    meta: {
      page: "administrator",
      group: "dashboard-lsp-administrator-test",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Administrator/Test/Show.vue"),
  },
  {
    path: "/dashboard-lsp/administrator/test/:id_test/nilai/:table",
    name: "dashboard-lsp-administrator-test-nilai",
    meta: {
      page: "administrator",
      group: "dashboard-lsp-administrator-test",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Administrator/Test/Nilai.vue"),
  },
  {
    path: "/dashboard-lsp/administrator/test/:id_test/nilai/:table/input/:id_peserta",
    name: "dashboard-lsp-administrator-test-nilai-input",
    meta: {
      page: "administrator",
      group: "dashboard-lsp-administrator-test",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Administrator/Test/InputNilai.vue"),
  },
];

export default routes;
