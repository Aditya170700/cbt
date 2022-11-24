import mAuth from "@/middleware/authInstruktur.js";

let routes = [
  {
    path: "/dashboard-non-pnbp/instruktur/test",
    name: "dashboard-non-pnbp-instruktur-test",
    meta: {
      page: "instruktur-non-pnbp",
      group: "dashboard-non-pnbp-instruktur-test",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardNonPnbp/Instruktur/Test/Index.vue"),
  },
  {
    path: "/dashboard-non-pnbp/instruktur/test/:id_test/show/:table",
    name: "dashboard-non-pnbp-instruktur-test-show",
    meta: {
      page: "instruktur-non-pnbp",
      group: "dashboard-non-pnbp-instruktur-test",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardNonPnbp/Instruktur/Test/Show.vue"),
  },
  {
    path: "/dashboard-non-pnbp/instruktur/test/:id_test/nilai/:table",
    name: "dashboard-non-pnbp-instruktur-test-nilai",
    meta: {
      page: "instruktur-non-pnbp",
      group: "dashboard-non-pnbp-instruktur-test",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardNonPnbp/Instruktur/Test/Nilai.vue"),
  },
  {
    path: "/dashboard-non-pnbp/instruktur/test/:id_test/nilai/:table/input/:id_peserta",
    name: "dashboard-non-pnbp-instruktur-test-nilai-input",
    meta: {
      page: "instruktur-non-pnbp",
      group: "dashboard-non-pnbp-instruktur-test",
      role: "instruktur",
      middleware: [mAuth],
    },
    component: () => import("@/views/DashboardNonPnbp/Instruktur/Test/InputNilai.vue"),
  },
];

export default routes;
