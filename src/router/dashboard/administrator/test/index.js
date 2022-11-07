let routes = [
  {
    path: "/dashboard/administrator/test",
    name: "dashboard-administrator-test",
    meta: {
      page: "administrator",
      group: "dashboard-administrator-test",
    },
    component: () => import("@/views/Dashboard/Administrator/Test/Index.vue"),
  },
  {
    path: "/dashboard/administrator/test/:id_test/show/:table",
    name: "dashboard-administrator-test-show",
    meta: {
      page: "administrator",
      group: "dashboard-administrator-test",
    },
    component: () => import("@/views/Dashboard/Administrator/Test/Show.vue"),
  },
];

export default routes;
