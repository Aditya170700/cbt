export default function auth({ next, router }) {
  if (localStorage.getItem("tokenAdministratorPelatihan") && localStorage.getItem("userAdministratorPelatihan")) {
    return next();
  }

  return router.push({ name: "auth" });
}