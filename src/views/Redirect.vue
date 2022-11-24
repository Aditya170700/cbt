<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { appStore } from "@/stores/app";
import { onMounted } from "vue";
import Spinner from "@/components/Spinner.vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { confirmation } from "@/assets/js/utils";

const storeApp = appStore();
let route = useRoute();

onMounted(() => {
  document.title = "Redirect...";
  if (
    ![
      "peserta",
      "administrator-pelatihan",
      "panitia",
      "instruktur",
      "admin-lemdik",
    ].includes(route.query.role)
  ) {
    confirmation("Role tidak ditemukan", "Kesalahan").then(() => {
      localStorage.clear();
      window.close();
    });
  }

  if (route.query.a && route.query.b && route.query.c) {
    let tName = "";
    let uName = "";

    if (route.query.role == "peserta") {
      tName = "tokenPeserta";
      uName = "userPeserta";
    }

    if (route.query.role == "administrator-pelatihan") {
      tName = "tokenAdministratorPelatihan";
      uName = "userAdministratorPelatihan";
    }

    if (route.query.role == "panitia") {
      tName = "tokenPanitia";
      uName = "userPanitia";
    }

    if (route.query.role == "instruktur") {
      tName = "tokenInstruktur";
      uName = "userInstruktur";
    }

    if (route.query.role == "admin-lemdik") {
      tName = "tokenAdminLemdik";
      uName = "userAdminLemdik";
    }

    axios
      .get(`${storeApp.baseurl}auth/refresh-token`, {
        headers: {
          Authorization: `Bearer ${route.query.a}.${route.query.b}.${route.query.c}`,
        },
      })
      .then((res) => {
        localStorage.setItem(tName, res.data.data.token);
        localStorage.setItem(uName, res.data.data.user);

        if (route.query.role == "peserta") {
          storeApp.tokenPeserta = res.data.data.token;
          storeApp.userPeserta = res.data.data.user;
        }

        if (route.query.role == "administrator-pelatihan") {
          storeApp.tokenAdministratorPelatihan = res.data.data.token;
          storeApp.userAdministratorPelatihan = res.data.data.user;
        }

        if (route.query.role == "panitia") {
          storeApp.tokenPanitia = res.data.data.token;
          storeApp.userPanitia = res.data.data.user;
        }

        if (route.query.role == "instruktur") {
          storeApp.tokenInstruktur = res.data.data.token;
          storeApp.userInstruktur = res.data.data.user;
        }

        if (route.query.role == "admin-lemdik") {
          storeApp.tokenAdminLemdik = res.data.data.token;
          storeApp.userAdminLemdik = res.data.data.user;
        }

        window.location.href = route.query.path;
      })
      .catch((err) => {
        console.log(err);
        confirmation(
          "Sesi telah habis, mohon untuk login ulang",
          "Sesi Habis"
        ).then(() => {
          localStorage.removeItem(tName);
          localStorage.removeItem(uName);
          window.location.href = "/";
        });
      });
  }
});
</script>

<template>
  <div class="text-center">
    <Spinner :color="'dark'" />
  </div>
</template>
