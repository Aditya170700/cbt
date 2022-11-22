import axios from "axios";

/* eslint-disable no-undef */
export default function auth({ next, router }) {
  let baseUrl = process.env.NODE_ENV == "development" ? "http://localhost:8000/api/" : "https://simpel.com";
  let urlSimpel = process.env.NODE_ENV == "development" ? "http://localhost:5173/" : "https://simpel.com";
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  if (params.a && params.b && params.c) {
    axios
      .get(`${baseUrl}auth/refresh-token`, {
        headers: {
          Authorization: `Bearer ${params.a}.${params.b}.${params.c}`,
        },
      })
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", res.data.data.user);

        window.history.pushState({}, document.title, window.location.pathname);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    if (!localStorage.getItem("token") && !localStorage.getItem("user")) {
      console.log(router);
      window.location.href = urlSimpel;
    }

    return next();
  }
}