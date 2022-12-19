import mAuth from "@/middleware/authInstruktur.js";

let routes = [
  {
    path: "/dashboard-lsp/instruktur/template",
    name: "dashboard-lsp-instruktur-template",
    meta: {
      page: "instruktur",
      group: "dashboard-lsp-instruktur-template",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Instruktur/Template/Index.vue"),
  },
  {
    path: "/dashboard-lsp/instruktur/template/create",
    name: "dashboard-lsp-instruktur-template-create",
    meta: {
      page: "instruktur",
      group: "dashboard-lsp-instruktur-template",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Instruktur/Template/Create.vue"),
  },
  {
    path: "/dashboard-lsp/instruktur/template/:id/edit",
    name: "dashboard-lsp-instruktur-template-edit",
    meta: {
      page: "instruktur",
      group: "dashboard-lsp-instruktur-template",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Instruktur/Template/Edit.vue"),
  },
];

export default routes;
