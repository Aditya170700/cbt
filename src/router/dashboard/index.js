import administrator from '@/router/dashboard/administrator/index.js';
import peserta from '@/router/dashboard/peserta/index.js';
import panitia from '@/router/dashboard/panitia/index.js';

let routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/Dashboard/Index.vue"),
  },
  ...administrator,
  ...peserta,
  ...panitia,
];

export default routes;
