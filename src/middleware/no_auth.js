export default function no_auth({ next, router }) {
  if (localStorage.getItem("token") && localStorage.getItem("user")) {
    return router.go(-1);
  }

  return next();
}