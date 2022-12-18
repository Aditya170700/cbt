<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { appStore } from "@/stores/app";
import { onMounted, reactive, ref } from "vue";
import logo from "@/assets/static/logo-2.png";
import axios from "axios";
import Spinner from "@/components/Spinner.vue";

const storeApp = appStore();
let user = ref(null);

onMounted(() => {
  document.title = "CBT | SIMPEL Pusbang Laut";
  user.value = JSON.parse(storeApp.userInstruktur);
  fetchData();
});
let result = reactive({
  data: null,
  loading: false,
});

function fetchData() {
  result.loading = true;
  axios
    .get(`${storeApp.baseurl}cbt/auth/other/diklat-instruktur`, {
      headers: {
        Authorization: `Bearer ${storeApp.tokenInstruktur}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      result.data = res.data.data;
      result.loading = false;
    })
    .catch((err) => {
      result.loading = false;
      console.log(err);
    });
}

function logout() {
  localStorage.removeItem("tokenInstruktur");
  localStorage.removeItem("userInstruktur");
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
      <div class="row justify-content-center my-5" v-if="result.loading">
        <div class="col-12 text-center">
          <Spinner :color="'dark'" />
        </div>
      </div>
      <div class="row justify-content-center mb-5" v-else>
        <div class="col-lg-2 mb-3" v-if="result.data?.diklat_pnbp">
          <router-link
            :to="{ name: 'dashboard-instruktur-test' }"
            class="text-decoration-none text-dark"
          >
            <div
              class="card bg-success text-center shadow rounded-4 hovered pointer"
            >
              <div class="row py-4" style="height: 200px">
                <div class="col-lg-12 mb-3 text-white">
                  <div class="h5 fw-bold">Diklat Pusbang</div>
                </div>
                <div class="col-lg-12">
                  <i class="far fa-building fa-4x text-white"></i>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-lg-2 mb-3" v-if="result.data?.diklat_lemdik">
          <router-link
            :to="{ name: 'dashboard-non-pnbp-instruktur-test' }"
            class="text-decoration-none text-dark"
          >
            <div
              class="card bg-warning text-center shadow rounded-4 hovered pointer"
            >
              <div class="row py-4" style="height: 200px">
                <div class="col-lg-12 mb-3 text-white">
                  <div class="h5 fw-bold">Diklat Lemdik</div>
                </div>
                <div class="col-lg-12">
                  <i
                    class="fas fa-building-shield fa-4x text-white"
                    style="width: 100%"
                  ></i>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-lg-2 mb-3" v-if="result.data?.diklat_lsp">
          <router-link
            :to="{ name: 'dashboard-lsp-instruktur-test' }"
            class="text-decoration-none text-dark"
          >
            <div
              class="card bg-primary text-center shadow rounded-4 hovered pointer"
            >
              <div class="row py-4" style="height: 200px">
                <div class="col-lg-12 mb-3 text-white">
                  <div class="h5 fw-bold">
                    LSP P2 Pusat Pengembangan SDM Perhubungan Laut
                  </div>
                </div>
                <div class="col-lg-12">
                  <i
                    class="fas fa-building-shield fa-4x text-white"
                    style="width: 100%"
                  ></i>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div
          class="col-lg-2 mb-3"
          v-if="
            !result.data?.diklat_pnbp &&
            !result.data?.diklat_lsp &&
            !result.data?.diklat_lemdik
          "
        >
          Anda belum mengikuti diklat
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
