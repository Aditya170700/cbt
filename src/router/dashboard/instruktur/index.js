import test from '@/router/dashboard/instruktur/test/index.js';
import soal from '@/router/dashboard/instruktur/soal/index.js';

let routes = [
  {
    path: "/dashboard/instruktur",
    name: "dashboard-instruktur",
    meta: {
      page: "instruktur",
      group: "dashboard-instruktur",
      role: "instruktur",
    },
    component: () => import("@/views/Dashboard/Instruktur/Index.vue"),
  },
  ...test,
  ...soal,
];

export default routes;
