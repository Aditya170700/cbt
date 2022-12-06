import mAuth from "@/middleware/authAdministratorPelatihan.js";

let routes = [
  {
    path: "/dashboard-lsp/administrator/soal",
    name: "dashboard-lsp-administrator-soal",
    meta: {
      page: "administrator",
      group: "dashboard-lsp-administrator-soal",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Administrator/Soal/Index.vue"),
  },
  {
    path: "/dashboard-lsp/administrator/soal/create-multiple-choice",
    name: "dashboard-lsp-administrator-soal-create-multiple-choice",
    meta: {
      page: "administrator",
      group: "dashboard-lsp-administrator-soal",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Administrator/Soal/MultipleChoice/Create.vue"),
  },
  {
    path: "/dashboard-lsp/administrator/soal/edit-multiple-choice/:id_soal",
    name: "dashboard-lsp-administrator-soal-edit-multiple-choice",
    meta: {
      page: "administrator",
      group: "dashboard-lsp-administrator-soal",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Administrator/Soal/MultipleChoice/Edit.vue"),
  },
  {
    path: "/dashboard-lsp/administrator/soal/create-essay",
    name: "dashboard-lsp-administrator-soal-create-essay",
    meta: {
      page: "administrator",
      group: "dashboard-lsp-administrator-soal",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Administrator/Soal/Essay/Create.vue"),
  },
  {
    path: "/dashboard-lsp/administrator/soal/edit-essay/:id_soal",
    name: "dashboard-lsp-administrator-soal-edit-essay",
    meta: {
      page: "administrator",
      group: "dashboard-lsp-administrator-soal",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Administrator/Soal/Essay/Edit.vue"),
  },
];

export default routes;
