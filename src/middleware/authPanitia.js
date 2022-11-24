export default function auth({ next, router }) {
  if (localStorage.getItem("tokenPanitia") && localStorage.getItem("userPanitia")) {
    return next();
  }

  return router.push({ name: "auth" });
}