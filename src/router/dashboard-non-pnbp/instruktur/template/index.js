import mAuth from "@/middleware/authInstruktur.js";

let routes = [
  {
    path: "/dashboard-non-pnbp/instruktur/template",
    name: "dashboard-non-pnbp-instruktur-template",
    meta: {
      page: "instruktur-non-pnbp",
      group: "dashboard-non-pnbp-instruktur-template",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardNonPnbp/Instruktur/Template/Index.vue"),
  },
  {
    path: "/dashboard-non-pnbp/instruktur/template/create",
    name: "dashboard-non-pnbp-instruktur-template-create",
    meta: {
      page: "instruktur-non-pnbp",
      group: "dashboard-non-pnbp-instruktur-template",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardNonPnbp/Instruktur/Template/Create.vue"),
  },
  {
    path: "/dashboard-non-pnbp/instruktur/template/:id/edit",
    name: "dashboard-non-pnbp-instruktur-template-edit",
    meta: {
      page: "instruktur-non-pnbp",
      group: "dashboard-non-pnbp-instruktur-template",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardNonPnbp/Instruktur/Template/Edit.vue"),
  },
];

export default routes;
