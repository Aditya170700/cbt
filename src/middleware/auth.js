/* eslint-disable no-undef */
export default function auth({ next, router }) {
  if (!localStorage.getItem("token") && !localStorage.getItem("user")) {
    let urlSimpel = process.env.NODE_ENV == "development" ?
      "http://localhost:5173/" :
      "https://simpel.com";

    console.log(router);
    window.location.href = urlSimpel;
  }

  return next();
}