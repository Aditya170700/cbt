import mAuth from "@/middleware/auth.js";

let routes = [
  {
    path: "/dashboard/administrator/soal",
    name: "dashboard-administrator-soal",
    meta: {
      page: "administrator",
      group: "dashboard-administrator-soal",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Administrator/Soal/Index.vue"),
  },
  {
    path: "/dashboard/administrator/soal/create-multiple-choice",
    name: "dashboard-administrator-soal-create-multiple-choice",
    meta: {
      page: "administrator",
      group: "dashboard-administrator-soal",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Administrator/Soal/MultipleChoice/Create.vue"),
  },
  {
    path: "/dashboard/administrator/soal/edit-multiple-choice/:id_soal",
    name: "dashboard-administrator-soal-edit-multiple-choice",
    meta: {
      page: "administrator",
      group: "dashboard-administrator-soal",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Administrator/Soal/MultipleChoice/Edit.vue"),
  },
  {
    path: "/dashboard/administrator/soal/create-essay",
    name: "dashboard-administrator-soal-create-essay",
    meta: {
      page: "administrator",
      group: "dashboard-administrator-soal",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Administrator/Soal/Essay/Create.vue"),
  },
  {
    path: "/dashboard/administrator/soal/edit-essay/:id_soal",
    name: "dashboard-administrator-soal-edit-essay",
    meta: {
      page: "administrator",
      group: "dashboard-administrator-soal",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Administrator/Soal/Essay/Edit.vue"),
  },
];

export default routes;
