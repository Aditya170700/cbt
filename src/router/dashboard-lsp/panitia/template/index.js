import mAuth from "@/middleware/authPanitia.js";

let routes = [
  {
    path: "/dashboard-lsp/panitia/template",
    name: "dashboard-lsp-panitia-template",
    meta: {
      page: "panitia",
      group: "dashboard-lsp-panitia-template",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Panitia/Template/Index.vue"),
  },
  {
    path: "/dashboard-lsp/panitia/template/create",
    name: "dashboard-lsp-panitia-template-create",
    meta: {
      page: "panitia",
      group: "dashboard-lsp-panitia-template",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Panitia/Template/Create.vue"),
  },
  {
    path: "/dashboard-lsp/panitia/template/:id/edit",
    name: "dashboard-lsp-panitia-template-edit",
    meta: {
      page: "panitia",
      group: "dashboard-lsp-panitia-template",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Panitia/Template/Edit.vue"),
  },
];

export default routes;
