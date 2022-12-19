<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/SidebarLsp/Panitia.vue";
import { appStore } from "@/stores/app";
import axios from "axios";
import { onMounted, reactive } from "vue";
import Spinner from "@/components/Spinner.vue";
import Pagination from "@/components/Dashboard/Pagination.vue";
import { alertError, alertSuccess, confirmation } from "@/assets/js/utils";

let widthContent = window.innerWidth;
const storeApp = appStore();
let result = reactive({
  data: [],
  meta: null,
  loading: false,
});
let params = reactive({
  search: "",
  per_page: 12,
});

onMounted(() => {
  fetchData(`${storeApp.baseurl}cbt/lsp/panitia/template`);
});

function fetchData(url) {
  result.loading = true;
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${storeApp.tokenPanitia}`,
      },
      params,
    })
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      result.loading = false;
      result.data = res.data.data?.data;
      result.meta = res.data.data;
    })
    .catch((err) => {
      result.loading = false;
      console.log(err);
    });
}

let navigation = (url) => {
  fetchData(url);
};

function destroy(data) {
  confirmation("Yakin hapus data ini?").then((confirmed) => {
    if (confirmed) {
      data.loading = true;
      axios
        .delete(`${storeApp.baseurl}cbt/lsp/panitia/template/${data.id}`, {
          headers: {
            Authorization: `Bearer ${storeApp.tokenPanitia}`,
          },
        })
        .then((res) => {
          if (res.data.code_response != 200) throw new Error(res.data.message);
          data.loading = false;
          alertSuccess(res.data.message);
          fetchData(`${storeApp.baseurl}cbt/lsp/panitia/template`);
        })
        .catch((err) => {
          data.loading = false;
          alertError(err.response.data.message);
        });
    }
  });
}
</script>

<template>
  <div class="dashboard">
    <Sidebar />
    <div
      :class="`main-content content ${widthContent > 992 ? '' : 'hide'} mb-5`"
    >
      <div class="container p-lg-4">
        <div class="d-flex px-2 mb-4 justify-content-between">
          <div class="col-7 col-lg-9 text-start mb-3">
            <div class="h4 fw-bold">TEMPLATE SOAL</div>
          </div>
          <div class="col-5 col-lg-3 text-end mb-3">
            <router-link
              :to="{ name: 'dashboard-lsp-panitia-template-create' }"
              class="btn btn-sm rounded-2 bg-info-1"
            >
              <i class="fas fa-plus me-2"></i>Tambah
            </router-link>
          </div>
        </div>
        <div class="row px-2">
          <div class="col-5 col-lg-3 text-end mb-3">
            <div class="input-group mb-3 bg-white rounded-2 shadow">
              <input
                type="text"
                class="form-control rounded-2 border-0"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="btn-search"
                v-model="params.search"
              />
              <button
                class="btn btn-success rounded-2 border-0"
                type="button"
                id="btn-search"
                @click="
                  fetchData(`${storeApp.baseurl}cbt/lsp/panitia/template`)
                "
              >
                <i class="fas fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="row px-2" v-if="result.loading">
          <div class="col-12 text-center"><Spinner :color="'dark'" /></div>
        </div>
        <div class="row px-2" v-else>
          <div class="col-12 text-center" v-if="result.data.length == 0">
            Belum ada data
          </div>
          <div class="col-lg-4 mb-4" v-for="(data, i) in result.data" :key="i">
            <div class="card rounded-4 shadow border">
              <div class="card-body rounded-4 p-4 position-relative">
                <div class="position-absolute" style="top: -5%; right: -5%">
                  <router-link
                    :to="{
                      name: 'dashboard-lsp-panitia-template-edit',
                      params: { id: data.id },
                    }"
                    class="rounded-pill btn btn-warning btn-sm me-1"
                  >
                    <i class="fas fa-pencil"></i>
                  </router-link>
                  <button
                    class="rounded-pill btn btn-danger btn-sm me-1"
                    @click="destroy(data)"
                    :disabled="data.loading"
                  >
                    <Spinner v-if="data.loading" /><i
                      class="fas fa-trash"
                      v-else
                    ></i>
                  </button>
                </div>
                <div class="h6 fw-bold one-line mb-3">{{ data.name }}</div>
                <div class="small">{{ data.pertanyaan_e_count }} Essay</div>
                <div class="small">
                  {{ data.pertanyaan_mc_count }} Multiple Choice
                </div>
                <div class="small fw-bold mt-3">
                  Created By :
                  {{ data.nm_pengguna }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <Pagination
              v-if="result.data?.length > 0"
              :data="result.meta"
              ammount="Template"
              :function="navigation"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
