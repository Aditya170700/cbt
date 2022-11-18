let routes = [
  {
    path: "/dashboard-non-pnbp/admin-lemdik/:id_lemdik/soal",
    name: "dashboard-non-pnbp-admin-lemdik-soal",
    meta: {
      page: "admin-lemdik-non-pnbp",
      group: "dashboard-non-pnbp-admin-lemdik-soal",
      role: "admin-lemdik",
    },
    component: () => import("@/views/DashboardNonPnbp/AdminLemdik/Soal/Index.vue"),
  },
  {
    path: "/dashboard-non-pnbp/admin-lemdik/:id_lemdik/soal/create-multiple-choice",
    name: "dashboard-administrator-soal-create-multiple-choice",
    meta: {
      page: "admin-lemdik-non-pnbp",
      group: "dashboard-non-pnbp-admin-lemdik-soal",
      role: "admin-lemdik",
    },
    component: () => import("@/views/DashboardNonPnbp/AdminLemdik/Soal/MultipleChoice/Create.vue"),
  },
  {
    path: "/dashboard-non-pnbp/admin-lemdik/:id_lemdik/soal/edit-multiple-choice/:id_soal",
    name: "dashboard-administrator-soal-edit-multiple-choice",
    meta: {
      page: "admin-lemdik-non-pnbp",
      group: "dashboard-non-pnbp-admin-lemdik-soal",
      role: "admin-lemdik",
    },
    component: () => import("@/views/DashboardNonPnbp/AdminLemdik/Soal/MultipleChoice/Edit.vue"),
  },
  {
    path: "/dashboard-non-pnbp/admin-lemdik/:id_lemdik/soal/create-essay",
    name: "dashboard-administrator-soal-create-essay",
    meta: {
      page: "admin-lemdik-non-pnbp",
      group: "dashboard-non-pnbp-admin-lemdik-soal",
      role: "admin-lemdik",
    },
    component: () => import("@/views/DashboardNonPnbp/AdminLemdik/Soal/Essay/Create.vue"),
  },
  {
    path: "/dashboard-non-pnbp/admin-lemdik/:id_lemdik/soal/edit-essay/:id_soal",
    name: "dashboard-administrator-soal-edit-essay",
    meta: {
      page: "admin-lemdik-non-pnbp",
      group: "dashboard-non-pnbp-admin-lemdik-soal",
      role: "admin-lemdik",
    },
    component: () => import("@/views/DashboardNonPnbp/AdminLemdik/Soal/Essay/Edit.vue"),
  },
];

export default routes;
