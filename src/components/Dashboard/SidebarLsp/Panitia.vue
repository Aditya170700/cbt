<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useRoute } from "vue-router";
import axios from "axios";
import { appStore } from "@/stores/app";
import { onMounted, ref } from "vue";
import { confirmation } from "@/assets/js/utils";
import logoSidebar from "@/assets/static/logo-sidebar.png";

let widthContent = window.innerWidth;
let route = useRoute();
const storeApp = appStore();
let user = ref(null);
let open = ref(false);

onMounted(() => {
  if (storeApp.tokenPanitia) {
    refreshToken();
  }
  user.value = JSON.parse(storeApp.userPanitia);
});

function refreshToken() {
  axios
    .get(`${storeApp.baseurl}auth/refresh-token`, {
      headers: {
        Authorization: `Bearer ${storeApp.tokenPanitia}`,
      },
    })
    .then((res) => {
      localStorage.setItem("tokenPanitia", res.data.data.token);
      localStorage.setItem("userPanitia", res.data.data.user);
    })
    .catch((err) => {
      console.log(err);
      confirmation(
        "Sesi telah habis, mohon untuk login ulang",
        "Sesi Habis"
      ).then(() => {
        localStorage.removeItem("tokenPanitia");
        localStorage.removeItem("userPanitia");
        window.close();
      });
    });
}

function sidebar() {
  document.querySelector(".sidebar").classList.toggle("hide");
  document.querySelector(".content").classList.toggle("hide");
  document.querySelector(".main-content").classList.toggle("hide");
  // document.querySelector(".content-footer").classList.toggle("hide");
  open.value = !open.value;
}
</script>

<template>
  <div class="dashboard-navigation">
    <div
      :class="`sidebar bg-gray-mice shadow ${widthContent > 992 ? '' : 'hide'}`"
    >
      <div class="d-flex justify-content-end d-lg-none">
        <img
          :src="logoSidebar"
          alt="Logo Sidebar"
          style="width: 90%"
          class="img-fluid"
        />
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
        <div class="menu-wrapper">
          <router-link
            :to="{ name: 'dashboard-lsp-panitia' }"
            class="text-white text-decoration-none"
            href="#"
          >
            <div
              :class="`item d-flex align-items-center ${
                route.name == 'dashboard-lsp-panitia' ? 'active' : ''
              }`"
            >
              <div
                style="width: 20px"
                class="col-2 icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-dashboard"></i>
              </div>
              <div
                class="col-10 d-flex justify-content-between align-items-center"
              >
                Dashboard
              </div>
            </div>
          </router-link>
          <router-link
            :to="{ name: 'dashboard-lsp-panitia-test' }"
            class="text-white text-decoration-none"
            href="#"
          >
            <div
              :class="`item d-flex align-items-center ${
                route.meta.group == 'dashboard-lsp-panitia-test' ? 'active' : ''
              }`"
            >
              <div
                style="width: 20px"
                class="col-2 icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-file-pen"></i>
              </div>
              <div
                class="col-10 d-flex justify-content-between align-items-center"
              >
                Test
              </div>
            </div>
          </router-link>
          <router-link
            :to="{ name: 'dashboard-lsp-panitia-soal' }"
            class="text-white text-decoration-none"
            href="#"
          >
            <div
              :class="`item d-flex align-items-center ${
                route.meta.group == 'dashboard-lsp-panitia-soal' ? 'active' : ''
              }`"
            >
              <div
                style="width: 20px"
                class="col-2 icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-cubes"></i>
              </div>
              <div
                class="col-10 d-flex justify-content-between align-items-center"
              >
                Bank Soal
              </div>
            </div>
          </router-link>
          <router-link
            :to="{ name: 'dashboard-lsp-panitia-template' }"
            class="text-white text-decoration-none"
            href="#"
          >
            <div
              :class="`item d-flex align-items-center ${
                route.meta.group == 'dashboard-lsp-panitia-template'
                  ? 'active'
                  : ''
              }`"
            >
              <div
                style="width: 20px"
                class="col-2 icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-file"></i>
              </div>
              <div
                class="col-10 d-flex justify-content-between align-items-center"
              >
                Template Soal
              </div>
            </div>
          </router-link>
          <router-link
            :to="{ name: 'panitia' }"
            class="text-white text-decoration-none"
          >
            <div class="item logout d-flex align-items-center">
              <div
                style="width: 20px"
                class="icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-arrow-left"></i>
              </div>
              <div>Halaman Utama</div>
            </div>
          </router-link>
        </div>
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
                      <img src="./../../../assets/img/logo.png" alt="" />
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
                  src="./../../../assets/img/logo.png"
                  alt=""
                  style="width: 15%"
                />
                <div class="menu-bar">
                  <i
                    class="fas fa-bars text-dark fa-2x"
                    @click="sidebar"
                    v-if="!open"
                  ></i>
                  <i
                    class="fas fa-times text-dark fa-2x"
                    @click="sidebar"
                    v-else
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
