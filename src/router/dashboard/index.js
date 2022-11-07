import administrator from '@/router/dashboard/administrator/index.js';

let routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/Dashboard/Index.vue"),
  },
  ...administrator,
];

export default routes;
