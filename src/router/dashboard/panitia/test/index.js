import mAuth from "@/middleware/authPanitia.js";

let routes = [
  {
    path: "/dashboard/panitia/test",
    name: "dashboard-panitia-test",
    meta: {
      page: "panitia",
      group: "dashboard-panitia-test",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Panitia/Test/Index.vue"),
  },
  {
    path: "/dashboard/panitia/test/:id_test/show/:table",
    name: "dashboard-panitia-test-show",
    meta: {
      page: "panitia",
      group: "dashboard-panitia-test",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Panitia/Test/Show.vue"),
  },
  {
    path: "/dashboard/panitia/test/:id_test/nilai/:table",
    name: "dashboard-panitia-test-nilai",
    meta: {
      page: "panitia",
      group: "dashboard-panitia-test",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Panitia/Test/Nilai.vue"),
  },
  {
    path: "/dashboard/panitia/test/:id_test/nilai/:table/input/:id_peserta",
    name: "dashboard-panitia-test-nilai-input",
    meta: {
      page: "panitia",
      group: "dashboard-panitia-test",
      role: "panitia",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Panitia/Test/InputNilai.vue"),
  },
];

export default routes;
