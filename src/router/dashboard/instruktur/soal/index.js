import mAuth from "@/middleware/auth.js";

let routes = [
  {
    path: "/dashboard/instruktur/soal",
    name: "dashboard-instruktur-soal",
    meta: {
      page: "instruktur",
      group: "dashboard-instruktur-soal",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Instruktur/Soal/Index.vue"),
  },
  {
    path: "/dashboard/instruktur/soal/create-multiple-choice",
    name: "dashboard-instruktur-soal-create-multiple-choice",
    meta: {
      page: "instruktur",
      group: "dashboard-instruktur-soal",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Instruktur/Soal/MultipleChoice/Create.vue"),
  },
  {
    path: "/dashboard/instruktur/soal/edit-multiple-choice/:id_soal",
    name: "dashboard-instruktur-soal-edit-multiple-choice",
    meta: {
      page: "instruktur",
      group: "dashboard-instruktur-soal",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Instruktur/Soal/MultipleChoice/Edit.vue"),
  },
  {
    path: "/dashboard/instruktur/soal/create-essay",
    name: "dashboard-instruktur-soal-create-essay",
    meta: {
      page: "instruktur",
      group: "dashboard-instruktur-soal",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Instruktur/Soal/Essay/Create.vue"),
  },
  {
    path: "/dashboard/instruktur/soal/edit-essay/:id_soal",
    name: "dashboard-instruktur-soal-edit-essay",
    meta: {
      page: "instruktur",
      group: "dashboard-instruktur-soal",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Instruktur/Soal/Essay/Edit.vue"),
  },
];

export default routes;
