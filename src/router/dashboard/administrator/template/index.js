import mAuth from "@/middleware/authAdministratorPelatihan.js";

let routes = [
  {
    path: "/dashboard/administrator/template",
    name: "dashboard-administrator-template",
    meta: {
      page: "administrator",
      group: "dashboard-administrator-template",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Administrator/Template/Index.vue"),
  },
  {
    path: "/dashboard/administrator/template/create",
    name: "dashboard-administrator-template-create",
    meta: {
      page: "administrator",
      group: "dashboard-administrator-template",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Administrator/Template/Create.vue"),
  },
  {
    path: "/dashboard/administrator/template/:id/edit",
    name: "dashboard-administrator-template-edit",
    meta: {
      page: "administrator",
      group: "dashboard-administrator-template",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Administrator/Template/Edit.vue"),
  },
];

export default routes;
