let routes = [
  {
    path: "/dashboard-non-pnbp/instruktur/soal",
    name: "dashboard-non-pnbp-instruktur-soal",
    meta: {
      page: "instruktur-non-pnbp",
      group: "dashboard-non-pnbp-instruktur-soal",
      role: "instruktur",
    },
    component: () => import("@/views/DashboardNonPnbp/Instruktur/Soal/Index.vue"),
  },
  {
    path: "/dashboard-non-pnbp/instruktur/soal/create-multiple-choice",
    name: "dashboard-administrator-soal-create-multiple-choice",
    meta: {
      page: "instruktur-non-pnbp",
      group: "dashboard-non-pnbp-instruktur-soal",
      role: "instruktur",
    },
    component: () => import("@/views/DashboardNonPnbp/Instruktur/Soal/MultipleChoice/Create.vue"),
  },
  {
    path: "/dashboard-non-pnbp/instruktur/soal/edit-multiple-choice/:id_soal",
    name: "dashboard-administrator-soal-edit-multiple-choice",
    meta: {
      page: "instruktur-non-pnbp",
      group: "dashboard-non-pnbp-instruktur-soal",
      role: "instruktur",
    },
    component: () => import("@/views/DashboardNonPnbp/Instruktur/Soal/MultipleChoice/Edit.vue"),
  },
  {
    path: "/dashboard-non-pnbp/instruktur/soal/create-essay",
    name: "dashboard-administrator-soal-create-essay",
    meta: {
      page: "instruktur-non-pnbp",
      group: "dashboard-non-pnbp-instruktur-soal",
      role: "instruktur",
    },
    component: () => import("@/views/DashboardNonPnbp/Instruktur/Soal/Essay/Create.vue"),
  },
  {
    path: "/dashboard-non-pnbp/instruktur/soal/edit-essay/:id_soal",
    name: "dashboard-administrator-soal-edit-essay",
    meta: {
      page: "instruktur-non-pnbp",
      group: "dashboard-non-pnbp-instruktur-soal",
      role: "instruktur",
    },
    component: () => import("@/views/DashboardNonPnbp/Instruktur/Soal/Essay/Edit.vue"),
  },
];

export default routes;
