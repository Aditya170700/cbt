import mAuth from "@/middleware/authPanitia.js";

let routes = [
  {
    path: "/dashboard-lsp/panitia/soal",
    name: "dashboard-lsp-panitia-soal",
    meta: {
      page: "panitia",
      group: "dashboard-lsp-panitia-soal",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Panitia/Soal/Index.vue"),
  },
  {
    path: "/dashboard-lsp/panitia/soal/create-multiple-choice",
    name: "dashboard-lsp-panitia-soal-create-multiple-choice",
    meta: {
      page: "panitia",
      group: "dashboard-lsp-panitia-soal",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Panitia/Soal/MultipleChoice/Create.vue"),
  },
  {
    path: "/dashboard-lsp/panitia/soal/edit-multiple-choice/:id_soal",
    name: "dashboard-lsp-panitia-soal-edit-multiple-choice",
    meta: {
      page: "panitia",
      group: "dashboard-lsp-panitia-soal",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Panitia/Soal/MultipleChoice/Edit.vue"),
  },
  {
    path: "/dashboard-lsp/panitia/soal/create-essay",
    name: "dashboard-lsp-panitia-soal-create-essay",
    meta: {
      page: "panitia",
      group: "dashboard-lsp-panitia-soal",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Panitia/Soal/Essay/Create.vue"),
  },
  {
    path: "/dashboard-lsp/panitia/soal/edit-essay/:id_soal",
    name: "dashboard-lsp-panitia-soal-edit-essay",
    meta: {
      page: "panitia",
      group: "dashboard-lsp-panitia-soal",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Panitia/Soal/Essay/Edit.vue"),
  },
];

export default routes;
