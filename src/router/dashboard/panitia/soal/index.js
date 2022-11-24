import mAuth from "@/middleware/authPanitia.js";

let routes = [
  {
    path: "/dashboard/panitia/soal",
    name: "dashboard-panitia-soal",
    meta: {
      page: "panitia",
      group: "dashboard-panitia-soal",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Panitia/Soal/Index.vue"),
  },
  {
    path: "/dashboard/panitia/soal/create-multiple-choice",
    name: "dashboard-panitia-soal-create-multiple-choice",
    meta: {
      page: "panitia",
      group: "dashboard-panitia-soal",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Panitia/Soal/MultipleChoice/Create.vue"),
  },
  {
    path: "/dashboard/panitia/soal/edit-multiple-choice/:id_soal",
    name: "dashboard-panitia-soal-edit-multiple-choice",
    meta: {
      page: "panitia",
      group: "dashboard-panitia-soal",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Panitia/Soal/MultipleChoice/Edit.vue"),
  },
  {
    path: "/dashboard/panitia/soal/create-essay",
    name: "dashboard-panitia-soal-create-essay",
    meta: {
      page: "panitia",
      group: "dashboard-panitia-soal",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Panitia/Soal/Essay/Create.vue"),
  },
  {
    path: "/dashboard/panitia/soal/edit-essay/:id_soal",
    name: "dashboard-panitia-soal-edit-essay",
    meta: {
      page: "panitia",
      group: "dashboard-panitia-soal",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Panitia/Soal/Essay/Edit.vue"),
  },
];

export default routes;
