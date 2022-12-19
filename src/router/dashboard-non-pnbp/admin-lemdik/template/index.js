import mAuth from "@/middleware/authAdminLemdik.js";

let routes = [
  {
    path: "/dashboard-non-pnbp/admin-lemdik/:id_lemdik/template",
    name: "dashboard-non-pnbp-admin-lemdik-template",
    meta: {
      page: "admin-lemdik",
      group: "dashboard-non-pnbp-admin-lemdik-template",
      role: "admin-lemdik",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardNonPnbp/AdminLemdik/Template/Index.vue"),
  },
  {
    path: "/dashboard-non-pnbp/admin-lemdik/:id_lemdik/template/create",
    name: "dashboard-non-pnbp-admin-lemdik-template-create",
    meta: {
      page: "admin-lemdik",
      group: "dashboard-non-pnbp-admin-lemdik-template",
      role: "admin-lemdik",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardNonPnbp/AdminLemdik/Template/Create.vue"),
  },
  {
    path: "/dashboard-non-pnbp/admin-lemdik/:id_lemdik/template/:id/edit",
    name: "dashboard-non-pnbp-admin-lemdik-template-edit",
    meta: {
      page: "admin-lemdik",
      group: "dashboard-non-pnbp-admin-lemdik-template",
      role: "admin-lemdik",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardNonPnbp/AdminLemdik/Template/Edit.vue"),
  },
];

export default routes;
