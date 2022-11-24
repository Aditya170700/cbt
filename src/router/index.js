/* eslint-disable no-undef */
import { createRouter, createWebHistory } from "vue-router";
import dashboard from "@/router/dashboard";
import auth from "@/router/auth.js";
import dashboardNonPnbp from "@/router/dashboard-non-pnbp/index.js";
import other from "@/router/other.js";
import mAuthInstruktur from "@/middleware/authInstruktur.js";
import mAuthPeserta from "@/middleware/authPeserta.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/redirect",
      name: "redirect",
      meta: {
        page: "redirect",
        group: "redirect",
        role: "redirect",
      },
      component: () => import("@/views/Redirect.vue"),
    },
    {
      path: "/peserta",
      name: "peserta",
      meta: {
        page: "peserta",
        group: "peserta",
        role: "peserta",
        middleware: [mAuthPeserta],
      },
      component: () => import("@/views/Peserta.vue"),
    },
    {
      path: "/instruktur",
      name: "instruktur",
      meta: {
        page: "instruktur",
        group: "instruktur",
        role: "instruktur",
        middleware: [mAuthInstruktur],
      },
      component: () => import("@/views/Instruktur.vue"),
    },
    ...auth,
    ...dashboard,
    ...dashboardNonPnbp,
    ...other,
  ],
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    if (to.meta?.roles?.length > 0) {
      let user = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user'))));

      if (!to.meta.roles.includes(user.role)) {
        next({ name: "unauthorized" });
      }
    }

    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };

    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
