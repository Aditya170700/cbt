<script setup>
import { onBeforeMount } from "vue";
import { RouterView } from "vue-router";
import { appStore } from "@/stores/app";
import axios from "axios";
import { confirmation } from "@/assets/js/utils.js";

const storeApp = appStore();

onBeforeMount(() => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  if (params.a && params.b && params.c) {
    axios
      .get(`${storeApp.baseurl}auth/refresh-token`, {
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
        confirmation(
          "Sesi telah habis, mohon untuk login ulang",
          "Sesi Habis"
        ).then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/";
        });
      });
  }
});
</script>

<template>
  <RouterView />
</template>
