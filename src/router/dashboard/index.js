let routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/Dashboard/Index.vue"),
  },
];

export default routes;
