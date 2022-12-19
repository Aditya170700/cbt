import mAuth from "@/middleware/authPanitia.js";

let routes = [
  {
    path: "/dashboard/panitia/template",
    name: "dashboard-panitia-template",
    meta: {
      page: "panitia",
      group: "dashboard-panitia-template",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Panitia/Template/Index.vue"),
  },
  {
    path: "/dashboard/panitia/template/create",
    name: "dashboard-panitia-template-create",
    meta: {
      page: "panitia",
      group: "dashboard-panitia-template",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Panitia/Template/Create.vue"),
  },
  {
    path: "/dashboard/panitia/template/:id/edit",
    name: "dashboard-panitia-template-edit",
    meta: {
      page: "panitia",
      group: "dashboard-panitia-template",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Panitia/Template/Edit.vue"),
  },
];

export default routes;
