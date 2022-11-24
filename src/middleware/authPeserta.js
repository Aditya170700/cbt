export default function auth({ next, router }) {
  if (localStorage.getItem("tokenPeserta") && localStorage.getItem("userPeserta")) {
    return next();
  }

  return router.push({ name: "auth" });
}