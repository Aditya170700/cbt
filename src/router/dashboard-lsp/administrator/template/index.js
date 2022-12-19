import mAuth from "@/middleware/authAdministratorPelatihan.js";

let routes = [
  {
    path: "/dashboard-lsp/administrator/template",
    name: "dashboard-lsp-administrator-template",
    meta: {
      page: "administrator",
      group: "dashboard-lsp-administrator-template",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Administrator/Template/Index.vue"),
  },
  {
    path: "/dashboard-lsp/administrator/template/create",
    name: "dashboard-lsp-administrator-template-create",
    meta: {
      page: "administrator",
      group: "dashboard-lsp-administrator-template",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Administrator/Template/Create.vue"),
  },
  {
    path: "/dashboard-lsp/administrator/template/:id/edit",
    name: "dashboard-lsp-administrator-template-edit",
    meta: {
      page: "administrator",
      group: "dashboard-lsp-administrator-template",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardLsp/Administrator/Template/Edit.vue"),
  },
];

export default routes;
