<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/Sidebar/Instruktur.vue";
import { onBeforeMount, reactive, watch } from "vue";
import { appStore } from "@/stores/app";
import Spinner from "@/components/Spinner.vue";
import Pagination from "@/components/Dashboard/Pagination.vue";
import axios from "axios";
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
  sort: "desc",
  type: "Multiple Choice",
  per_page: 25,
});

onBeforeMount(() => {
  fetchData(`${storeApp.baseurl}cbt/instruktur/soal/list`);
});

function fetchData(url) {
  result.loading = true;
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${storeApp.tokenInstruktur}`,
      },
      params,
    })
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      result.loading = false;
      result.data = res.data.data;
      result.meta = res.data.meta;
    })
    .catch((err) => {
      result.loading = false;
      console.log(err);
    });
}

function destroy(data) {
  confirmation("Yakin hapus data ini?").then((confirmed) => {
    if (confirmed) {
      data.loading = true;
      axios
        .delete(`${storeApp.baseurl}cbt/instruktur/soal/${data.id}/destroy`, {
          headers: {
            Authorization: `Bearer ${storeApp.tokenInstruktur}`,
          },
        })
        .then((res) => {
          if (res.data.code_response != 200) throw new Error(res.data.message);
          data.loading = false;
          alertSuccess(res.data.message);
          fetchData(`${storeApp.baseurl}cbt/instruktur/soal/list`);
        })
        .catch((err) => {
          data.loading = false;
          alertError(err.response.data.message);
        });
    }
  });
}

// watch params type
watch(
  () => params.type,
  () => {
    fetchData(`${storeApp.baseurl}cbt/instruktur/soal/list`);
  }
);

let navigation = (url) => {
  fetchData(url);
};
</script>

<template>
  <div class="dashboard">
    <Sidebar />
    <div
      :class="`main-content content ${widthContent > 992 ? '' : 'hide'} mb-5`"
    >
      <div class="container p-lg-4">
        <div class="d-flex px-2 mb-4 justify-content-between">
          <div class="col-6 col-lg-6 text-start mb-3">
            <div class="h4 fw-bold">BANK SOAL</div>
          </div>
          <div class="dropdown">
            <button
              class="btn btn-sm btn-outline-success rounded-2 px-3 mb-2 dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-plus me-2"></i>CREATE
            </button>
            <ul
              class="dropdown-menu rounded-2"
              style="position: fixed !important; right: 0; left: auto"
            >
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{
                    name: 'dashboard-instruktur-soal-create-multiple-choice',
                  }"
                  >MULTIPLE CHOICE</router-link
                >
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{
                    name: 'dashboard-instruktur-soal-create-essay',
                  }"
                  >ESSAY</router-link
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="row px-2 mb-5">
          <div class="col-lg-8 mb-2">
            <button
              :class="`btn btn-sm btn${
                params.type == 'Multiple Choice' ? '' : '-outline'
              }-primary rounded-2 me-2 px-3 mb-2`"
              @click="params.type = 'Multiple Choice'"
            >
              <i class="fas fa-list me-2"></i>MULTIPLE CHOICE
            </button>
            <button
              :class="`btn btn-sm btn${
                params.type == 'Essay' ? '' : '-outline'
              }-info rounded-2 me-2 px-3 mb-2`"
              @click="params.type = 'Essay'"
            >
              <i class="far fa-file me-2"></i>ESSAY
            </button>
          </div>
          <div class="col-lg-4">
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
                  fetchData(`${storeApp.baseurl}cbt/instruktur/soal/list`)
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
                      name:
                        data.tipe == 'Multiple Choice'
                          ? 'dashboard-instruktur-soal-edit-multiple-choice'
                          : 'dashboard-instruktur-soal-edit-essay',
                      params: { id_soal: data.id },
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
                <div class="h6 fw-bold one-line" v-html="data.pertanyaan"></div>
                <div class="small">{{ data.created_at }}</div>
                <div class="one-line">{{ data.tipe }}</div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <Pagination
              v-if="result.data?.length > 0"
              :data="result.meta"
              ammount="Soal"
              :function="navigation"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
