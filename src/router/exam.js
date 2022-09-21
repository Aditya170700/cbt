let routes = [
  {
    path: "/exam",
    name: "exam-index",
    component: () => import("@/views/Exam/Index.vue"),
    meta: {
      group: "exam",
    },
  },
  {
    path: "/exam/:id",
    name: "exam-show",
    component: () => import("@/views/Exam/Show.vue"),
    meta: {
      group: "exam",
    },
  },
  {
    path: "/exam/:id/do",
    name: "exam-do",
    component: () => import("@/views/Exam/Do.vue"),
    meta: {
      group: "exam",
    },
  },
];

export default routes;
