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

onMounted(() => {
  if (storeApp.tokenAdministratorPelatihan) {
    refreshToken();
  }
  user.value = JSON.parse(storeApp.userAdministratorPelatihan);
});

function logout() {
  localStorage.removeItem("tokenAdministratorPelatihan");
  localStorage.removeItem("userAdministratorPelatihan");
  window.location.href = "/";
}

function refreshToken() {
  axios
    .get(`${storeApp.baseurl}auth/refresh-token`, {
      headers: {
        Authorization: `Bearer ${storeApp.tokenAdministratorPelatihan}`,
      },
    })
    .then((res) => {
      localStorage.setItem("tokenAdministratorPelatihan", res.data.data.token);
      localStorage.setItem("userAdministratorPelatihan", res.data.data.user);
    })
    .catch((err) => {
      console.log(err);
      confirmation(
        "Sesi telah habis, mohon untuk login ulang",
        "Sesi Habis"
      ).then(() => {
        localStorage.removeItem("tokenAdministratorPelatihan");
        localStorage.removeItem("userAdministratorPelatihan");
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
        <div class="menu-wrapper">
          <router-link
            :to="{ name: 'dashboard-administrator' }"
            class="text-white text-decoration-none"
            href="#"
          >
            <div
              :class="`item d-flex align-items-center ${
                route.name == 'dashboard-administrator' ? 'active' : ''
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
            :to="{ name: 'dashboard-administrator-test' }"
            class="text-white text-decoration-none"
            href="#"
          >
            <div
              :class="`item d-flex align-items-center ${
                route.meta.group == 'dashboard-administrator-test'
                  ? 'active'
                  : ''
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
            :to="{ name: 'dashboard-administrator-soal' }"
            class="text-white text-decoration-none"
            href="#"
          >
            <div
              :class="`item d-flex align-items-center ${
                route.meta.group == 'dashboard-administrator-soal'
                  ? 'active'
                  : ''
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
          <a
            href="#"
            @click.prevent="logout"
            class="text-white text-decoration-none"
          >
            <div class="item logout d-flex align-items-center">
              <div
                style="width: 20px"
                class="icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-power-off"></i>
              </div>
              <div>Logout</div>
            </div>
          </a>
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
