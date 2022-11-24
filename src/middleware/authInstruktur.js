export default function auth({ next, router }) {
  if (localStorage.getItem("tokenInstruktur") && localStorage.getItem("userInstruktur")) {
    return next();
  }

  return router.push({ name: "auth" });
}