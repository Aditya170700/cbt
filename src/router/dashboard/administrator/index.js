import test from '@/router/dashboard/administrator/test/index.js';

let routes = [
  {
    path: "/dashboard/administrator",
    name: "dashboard-administrator",
    meta: {
      page: "administrator",
      group: "dashboard-administrator",
    },
    component: () => import("@/views/Dashboard/Administrator/Index.vue"),
  },
  ...test,
];

export default routes;
