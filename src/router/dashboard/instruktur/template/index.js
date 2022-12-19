import mAuth from "@/middleware/authInstruktur.js";

let routes = [
  {
    path: "/dashboard/instruktur/template",
    name: "dashboard-instruktur-template",
    meta: {
      page: "instruktur",
      group: "dashboard-instruktur-template",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Instruktur/Template/Index.vue"),
  },
  {
    path: "/dashboard/instruktur/template/create",
    name: "dashboard-instruktur-template-create",
    meta: {
      page: "instruktur",
      group: "dashboard-instruktur-template",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Instruktur/Template/Create.vue"),
  },
  {
    path: "/dashboard/instruktur/template/:id/edit",
    name: "dashboard-instruktur-template-edit",
    meta: {
      page: "instruktur",
      group: "dashboard-instruktur-template",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Instruktur/Template/Edit.vue"),
  },
];

export default routes;
