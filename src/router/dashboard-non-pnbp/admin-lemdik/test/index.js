let routes = [
  {
    path: "/dashboard-non-pnbp/admin-lemdik/test",
    name: "dashboard-non-pnbp-admin-lemdik-test",
    meta: {
      page: "admin-lemdik-non-pnbp",
      group: "dashboard-non-pnbp-admin-lemdik-test",
      role: "admin-lemdik",
    },
    component: () => import("@/views/DashboardNonPnbp/AdminLemdik/Test/Index.vue"),
  },
  {
    path: "/dashboard-non-pnbp/admin-lemdik/test/:id_test/show/:table",
    name: "dashboard-non-pnbp-admin-lemdik-test-show",
    meta: {
      page: "admin-lemdik-non-pnbp",
      group: "dashboard-non-pnbp-admin-lemdik-test",
      role: "admin-lemdik",
    },
    component: () => import("@/views/DashboardNonPnbp/AdminLemdik/Test/Show.vue"),
  },
  {
    path: "/dashboard-non-pnbp/admin-lemdik/test/:id_test/nilai/:table",
    name: "dashboard-non-pnbp-admin-lemdik-test-nilai",
    meta: {
      page: "admin-lemdik-non-pnbp",
      group: "dashboard-non-pnbp-admin-lemdik-test",
      role: "admin-lemdik",
    },
    component: () => import("@/views/DashboardNonPnbp/AdminLemdik/Test/Nilai.vue"),
  },
  {
    path: "/dashboard-non-pnbp/admin-lemdik/test/:id_test/nilai/:table/input/:id_peserta",
    name: "dashboard-non-pnbp-admin-lemdik-test-nilai-input",
    meta: {
      page: "admin-lemdik-non-pnbp",
      group: "dashboard-non-pnbp-admin-lemdik-test",
      role: "admin-lemdik",
    },
    component: () => import("@/views/DashboardNonPnbp/AdminLemdik/Test/InputNilai.vue"),
  },
];

export default routes;
