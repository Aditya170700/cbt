import mAuth from "@/middleware/auth.js";

let routes = [
  {
    path: "/unauthorized",
    name: "unauthorized",
    component: () => import("@/views/Other/Unauthorized.vue"),
    meta: {
      group: "other",
      middleware: [mAuth],
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/Other/NotFound.vue"),
    meta: {
      group: "other",
    },
  },
];

export default routes;
