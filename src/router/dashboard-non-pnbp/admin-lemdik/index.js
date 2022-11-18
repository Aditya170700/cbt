let routes = [
  {
    path: "/dashboard-non-pnbp/admin-lemdik",
    name: "dashboard-non-pnbp-admin-lemdik",
    meta: {
      page: "admin-lemdik-non-pnbp",
      group: "dashboard-non-pnbp-admin-lemdik",
      role: "admin-lemdik",
    },
    component: () => import("@/views/DashboardNonPnbp/AdminLemdik/Index.vue"),
  },
];

export default routes;
