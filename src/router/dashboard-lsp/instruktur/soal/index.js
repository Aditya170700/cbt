import mAuth from "@/middleware/authInstruktur.js";

let routes = [
  {
    path: "/dashboard-lsp/instruktur/soal",
    name: "dashboard-lsp-instruktur-soal",
    meta: {
      page: "instruktur",
      group: "dashboard-lsp-instruktur-soal",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Instruktur/Soal/Index.vue"),
  },
  {
    path: "/dashboard-lsp/instruktur/soal/create-multiple-choice",
    name: "dashboard-lsp-instruktur-soal-create-multiple-choice",
    meta: {
      page: "instruktur",
      group: "dashboard-lsp-instruktur-soal",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Instruktur/Soal/MultipleChoice/Create.vue"),
  },
  {
    path: "/dashboard-lsp/instruktur/soal/edit-multiple-choice/:id_soal",
    name: "dashboard-lsp-instruktur-soal-edit-multiple-choice",
    meta: {
      page: "instruktur",
      group: "dashboard-lsp-instruktur-soal",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Instruktur/Soal/MultipleChoice/Edit.vue"),
  },
  {
    path: "/dashboard-lsp/instruktur/soal/create-essay",
    name: "dashboard-lsp-instruktur-soal-create-essay",
    meta: {
      page: "instruktur",
      group: "dashboard-lsp-instruktur-soal",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Instruktur/Soal/Essay/Create.vue"),
  },
  {
    path: "/dashboard-lsp/instruktur/soal/edit-essay/:id_soal",
    name: "dashboard-lsp-instruktur-soal-edit-essay",
    meta: {
      page: "instruktur",
      group: "dashboard-lsp-instruktur-soal",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Instruktur/Soal/Essay/Edit.vue"),
  },
];

export default routes;
