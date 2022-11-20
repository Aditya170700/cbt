<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useRoute } from "vue-router";
import axios from "axios";
import { appStore } from "@/stores/app";
import { confirmation } from "@/assets/js/utils";
import { onMounted, ref } from "vue";
import SidebarAdministrator from "@/components/Dashboard/Sidebar/Administrator.vue";
import SidebarPeserta from "@/components/Dashboard/Sidebar/Peserta.vue";
import SidebarPanitia from "@/components/Dashboard/Sidebar/Panitia.vue";
import SidebarInstruktur from "@/components/Dashboard/Sidebar/Instruktur.vue";

import SidebarNonPnbpAdminLemdik from "@/components/Dashboard/SidebarNonPnbp/AdminLemdik.vue";
import SidebarNonPnbpPeserta from "@/components/Dashboard/SidebarNonPnbp/Peserta.vue";
import SidebarNonPnbpInstruktur from "@/components/Dashboard/SidebarNonPnbp/Instruktur.vue";
import logoSidebar from "@/assets/static/logo-sidebar.png";

let widthContent = window.innerWidth;
let route = useRoute();
const storeApp = appStore();
let user = ref(null);

onMounted(() => {
  if (storeApp.token) {
    refreshToken();
  }
  user.value = JSON.parse(storeApp.user);
});

function sidebar() {
  document.querySelector(".sidebar").classList.toggle("hide");
  document.querySelector(".content").classList.toggle("hide");
  document.querySelector(".main-content").classList.toggle("hide");
  // document.querySelector(".content-footer").classList.toggle("hide");
}

function refreshToken() {
  axios
    .get(`${storeApp.baseurl}auth/refresh-token`, {
      headers: {
        Authorization: `Bearer ${storeApp.token}`,
      },
    })
    .then((res) => {
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", res.data.data.user);
    })
    .catch((err) => {
      console.log(err);
      confirmation(
        "Sesi telah habis, mohon untuk login ulang",
        "Sesi Habis"
      ).then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.close();
      });
    });
}
</script>

<template>
  <div class="dashboard-navigation">
    <div
      :class="`sidebar bg-gray-mice shadow ${widthContent > 992 ? '' : 'hide'}`"
    >
      <div class="d-flex justify-content-end d-lg-none">
        <i class="fas fa-times" @click="sidebar"></i>
      </div>
      <div
        class="d-none d-lg-block text-decoration-none text-center text-white"
      >
        <a
          class="d-none d-lg-block text-decoration-none text-center text-white"
          href="#"
        >
          <img
            :src="logoSidebar"
            alt="Logo Sidebar"
            style="width: 90%"
            class="img-fluid"
          />
        </a>
      </div>
      <div class="height-hide overflow-auto">
        <SidebarAdministrator v-if="route.meta.role == 'administrator'" />
        <SidebarPeserta
          v-if="
            route.meta.role == 'peserta' &&
            route.meta.page != 'peserta-non-pnbp'
          "
        />
        <SidebarPanitia v-if="route.meta.role == 'panitia'" />
        <SidebarInstruktur
          v-if="
            route.meta.role == 'instruktur' &&
            route.meta.page != 'instruktur-non-pnbp'
          "
        />
        <SidebarNonPnbpAdminLemdik
          v-if="
            route.meta.role == 'admin-lemdik' &&
            route.meta.page == 'admin-lemdik-non-pnbp'
          "
        />
        <SidebarNonPnbpPeserta
          v-if="
            route.meta.role == 'peserta' &&
            route.meta.page == 'peserta-non-pnbp'
          "
        />
        <SidebarNonPnbpInstruktur
          v-if="
            route.meta.role == 'instruktur' &&
            route.meta.page == 'instruktur-non-pnbp'
          "
        />
      </div>
    </div>

    <div
      :class="`content ${widthContent > 992 ? '' : 'hide'} d-none d-lg-block`"
    >
      <div class="section">
        <nav>
          <div class="card-shadow shadow rounded-0">
            <div class="py-2 px-3">
              <div class="d-flex align-items-center justify-content-between">
                <div class="menu-bar" @click="sidebar">
                  <i class="fas fa-bars text-white me-3"></i>
                </div>
                <div class="d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="me-3">
                      <span class="d-block text-white text-capitalize">{{
                        user?.username ?? "User"
                      }}</span>
                      <span class="d-block text-white small">{{
                        user?.role
                      }}</span>
                    </div>
                    <div
                      class="profile align-items-center justify-content-center"
                    >
                      <img src="./../../assets/img/logo.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <div :class="`content ${widthContent > 992 ? '' : 'hide'} d-lg-none`">
      <div class="mb-5">
        <nav>
          <div class="card-shadow rounded-0 bg-secondary-mice">
            <div class="py-2 px-3">
              <div class="d-flex align-items-center justify-content-between">
                <img
                  src="./../../assets/img/logo.png"
                  alt=""
                  style="width: 15%"
                />
                <div class="menu-bar">
                  <i class="fas fa-bars text-white me-3" @click="sidebar"></i>
                  <i class="fas fa-ellipsis text-white"></i>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
