let routes = [
  {
    path: "/dashboard/question-bank",
    name: "dashboard-question-bank",
    component: () => import("@/views/Dashboard/QuestionBank/Index.vue"),
    meta: {
      group: "dashboard-question-bank",
    },
  },
  {
    path: "/dashboard/question-bank/create/multiple-choice",
    name: "dashboard-question-bank-create-multiple-choice",
    component: () => import("@/views/Dashboard/QuestionBank/MultipleChoice/Create.vue"),
    meta: {
      group: "dashboard-question-bank",
    },
  },
  {
    path: "/dashboard/question-bank/:id/edit/multiple-choice",
    name: "dashboard-question-bank-edit-multiple-choice",
    component: () => import("@/views/Dashboard/QuestionBank/MultipleChoice/Edit.vue"),
    meta: {
      group: "dashboard-question-bank",
    },
  },
  {
    path: "/dashboard/question-bank/create/essay",
    name: "dashboard-question-bank-create-essay",
    component: () => import("@/views/Dashboard/QuestionBank/Essay/Create.vue"),
    meta: {
      group: "dashboard-question-bank",
    },
  },
  {
    path: "/dashboard/question-bank/:id/edit/essay",
    name: "dashboard-question-bank-edit-essay",
    component: () => import("@/views/Dashboard/QuestionBank/Essay/Edit.vue"),
    meta: {
      group: "dashboard-question-bank",
    },
  },
];

export default routes;
