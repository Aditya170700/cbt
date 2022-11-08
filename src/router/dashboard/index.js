import administrator from '@/router/dashboard/administrator/index.js';
import peserta from '@/router/dashboard/peserta/index.js';

let routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/Dashboard/Index.vue"),
  },
  ...administrator,
  ...peserta,
];

export default routes;
