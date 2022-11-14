let routes = [
  {
    path: "/dashboard/instruktur/test",
    name: "dashboard-instruktur-test",
    meta: {
      page: "instruktur",
      group: "dashboard-instruktur-test",
      role: "instruktur",
    },
    component: () => import("@/views/Dashboard/Instruktur/Test/Index.vue"),
  },
  {
    path: "/dashboard/instruktur/test/:id_test/show/:table",
    name: "dashboard-instruktur-test-show",
    meta: {
      page: "instruktur",
      group: "dashboard-instruktur-test",
      role: "instruktur",
    },
    component: () => import("@/views/Dashboard/Instruktur/Test/Show.vue"),
  },
  {
    path: "/dashboard/instruktur/test/:id_test/nilai/:table",
    name: "dashboard-instruktur-test-nilai",
    meta: {
      page: "instruktur",
      group: "dashboard-instruktur-test",
      role: "instruktur",
    },
    component: () => import("@/views/Dashboard/Instruktur/Test/Nilai.vue"),
  },
  {
    path: "/dashboard/instruktur/test/:id_test/nilai/:table/input/:id_peserta",
    name: "dashboard-instruktur-test-nilai-input",
    meta: {
      page: "instruktur",
      group: "dashboard-instruktur-test",
      role: "instruktur",
    },
    component: () => import("@/views/Dashboard/Instruktur/Test/InputNilai.vue"),
  },
];

export default routes;
