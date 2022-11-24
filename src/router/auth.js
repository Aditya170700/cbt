import mNoAuth from "@/middleware/no_auth.js";

let routes = [
  {
    path: "/",
    name: "auth",
    component: () => import("@/views/Auth/Login.vue"),
    meta: {
      group: "auth",
      middleware: [mNoAuth],
    },
  },
  {
    path: "/login",
    name: "auth-login",
    component: () => import("@/views/Auth/Login.vue"),
    meta: {
      group: "auth",
      middleware: [mNoAuth],
    },
  },
  {
    path: "/forgot-password",
    name: "auth-forgot-password",
    component: () => import("@/views/Auth/ForgotPassword.vue"),
    meta: {
      group: "auth",
      middleware: [mNoAuth],
    },
  },
  {
    path: "/reset-password",
    name: "auth-reset-password",
    component: () => import("@/views/Auth/ResetPassword.vue"),
    meta: {
      group: "auth",
      middleware: [mNoAuth],
    },
  },
];

export default routes;
