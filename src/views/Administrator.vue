<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { appStore } from "@/stores/app";
import { onMounted, ref } from "vue";
import logo from "@/assets/static/logo-2.png";

const storeApp = appStore();
let user = ref(null);

onMounted(() => {
  document.title = "CBT | SIMPEL Pusbang Laut";
  user.value = JSON.parse(storeApp.userAdministratorPelatihan);
});

function logout() {
  localStorage.removeItem("tokenAdministratorPelatihan");
  localStorage.removeItem("userAdministratorPelatihan");
  window.location.href = "/";
}
</script>

<template>
  <div>
    <div class="fixed-top">
      <nav class="py-2 bg-info-1 border-bottom">
        <div class="px-2 d-flex">
          <ul class="nav me-auto">
            <li class="nav-item">
              <a
                href="#"
                class="nav-link link-light px-2 fw-bold"
                aria-current="page"
                >CBT PUSBANG</a
              >
            </li>
          </ul>
          <ul class="nav">
            <li class="nav-item dropdown">
              <a
                href="#"
                class="nav-link link-light px-2 dropdown-toggle fw-bold"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                v-if="user"
                >{{ user.username }}
                <span class="small d-none d-lg-inline"
                  >({{ user.role }})</span
                ></a
              ><a
                href="#"
                class="nav-link link-light px-2 dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                v-else
                >User</a
              >
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#" @click.prevent="logout">
                    <i class="fas fa-power-off me-2"></i>Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="my-5">&nbsp;</div>
    <div class="my-5">&nbsp;</div>
    <div class="container">
      <div class="row mb-4">
        <div class="col-lg-12 text-center">
          <div class="h3 fw-bold">Kategori Diklat</div>
        </div>
      </div>
      <div class="row justify-content-center mb-5">
        <div class="col-lg-2 mb-3">
          <router-link
            :to="{ name: 'dashboard-administrator' }"
            class="text-decoration-none text-dark"
          >
            <div
              class="card bg-info-1 text-center shadow rounded-4 hovered pointer"
            >
              <div class="row py-4" style="height: 200px">
                <div class="col-lg-12 mb-3 text-white">
                  <div class="h5 fw-bold">Diklat Pusbang</div>
                </div>
                <div class="col-lg-12">
                  <i class="far fa-building fa-4x"></i>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-lg-2 mb-3">
          <router-link
            :to="{ name: 'dashboard-lsp-administrator' }"
            class="text-decoration-none text-dark"
          >
            <div
              class="card bg-info-1 text-center shadow rounded-4 hovered pointer"
            >
              <div class="row py-4" style="height: 200px">
                <div class="col-lg-12 mb-3 text-white">
                  <div class="h5 fw-bold">
                    LSP P2 Pusat Pengembangan SDM Perhubungan Laut
                  </div>
                </div>
                <div class="col-lg-12">
                  <i
                    class="fas fa-building-shield fa-4x"
                    style="width: 100%"
                  ></i>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row justify-content-center py-5">
        <div class="col-lg-12 text-center">
          <img :src="logo" alt="Logo" style="width: 7%" />
        </div>
        <div class="col-lg-12 text-center small">
          <i class="far fa-copyright me-2"></i>2022 PPSDMPL PERHUBUNGAN LAUT
        </div>
      </div>
    </div>
  </div>
</template>
