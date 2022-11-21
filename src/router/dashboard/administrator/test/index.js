import mAuth from "@/middleware/auth.js";

let routes = [
  {
    path: "/dashboard/administrator/test",
    name: "dashboard-administrator-test",
    meta: {
      page: "administrator",
      group: "dashboard-administrator-test",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Administrator/Test/Index.vue"),
  },
  {
    path: "/dashboard/administrator/test/:id_test/show/:table",
    name: "dashboard-administrator-test-show",
    meta: {
      page: "administrator",
      group: "dashboard-administrator-test",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Administrator/Test/Show.vue"),
  },
  {
    path: "/dashboard/administrator/test/:id_test/nilai/:table",
    name: "dashboard-administrator-test-nilai",
    meta: {
      page: "administrator",
      group: "dashboard-administrator-test",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Administrator/Test/Nilai.vue"),
  },
  {
    path: "/dashboard/administrator/test/:id_test/nilai/:table/input/:id_peserta",
    name: "dashboard-administrator-test-nilai-input",
    meta: {
      page: "administrator",
      group: "dashboard-administrator-test",
      role: "administrator",
      middleware: [mAuth],
    },
    component: () => import("@/views/Dashboard/Administrator/Test/InputNilai.vue"),
  },
];

export default routes;
