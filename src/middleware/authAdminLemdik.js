export default function auth({ next, router }) {
  if (localStorage.getItem("tokenAdminLemdik") && localStorage.getItem("userAdminLemdik")) {
    return next();
  }

  return router.push({ name: "auth" });
}