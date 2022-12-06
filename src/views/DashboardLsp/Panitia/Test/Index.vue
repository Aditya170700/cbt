<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/SidebarLsp/Panitia.vue";
import { appStore } from "@/stores/app";
import Spinner from "@/components/Spinner.vue";
import { onBeforeMount, reactive } from "vue";
import axios from "axios";

const storeApp = appStore();
let widthContent = window.innerWidth;
let result = reactive({
  data: [],
  meta: null,
  loading: false,
});
let params = reactive({
  page: 1,
  limit: 10,
  search: "",
});

onBeforeMount(() => {
  fetchData();
});

function fetchData() {
  result.loading = true;
  axios
    .get(`${storeApp.baseurl}cbt/lsp/panitia/test/list`, {
      headers: {
        Authorization: `Bearer ${storeApp.tokenPanitia}`,
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
</script>

<template>
  <div class="dashboard">
    <Sidebar />
    <div
      :class="`main-content content ${widthContent > 992 ? '' : 'hide'} mb-5`"
    >
      <div class="container p-lg-4">
        <div class="d-flex px-2 mb-4 justify-content-between">
          <div class="col-lg-9 text-start mb-3">
            <div class="h4 fw-bold">Test List</div>
          </div>
          <div class="col-lg-3 text-end">
            <div class="input-group mb-3 bg-white rounded-2 shadow">
              <input
                type="text"
                class="form-control rounded-2 border-0"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="btn-search"
              />
              <button
                class="btn btn-success rounded-2 border-0"
                type="button"
                id="btn-search"
              >
                <i class="fas fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="row px-2" v-if="result.loading">
          <div class="col-lg-12 text-center"><Spinner :color="'dark'" /></div>
        </div>
        <div class="row px-2" v-else>
          <div class="col-12 text-center" v-if="result.data.length == 0">
            Belum ada data
          </div>
          <div class="col-lg-4 mb-4" v-for="(data, i) in result.data" :key="i">
            <div class="card rounded-4 shadow border">
              <div class="card-body rounded-4 p-4">
                <div class="h6 fw-bold">{{ data.nama }}</div>
                <div class="small mb-3">{{ data.created_at }}</div>
                <div class="four-line mb-3" v-html="data.deskripsi"></div>
                <div class="small">
                  <span class="fw-bold">UPT</span>
                  <span>: {{ data.nm_lembaga }}</span>
                </div>
                <div class="small">
                  <span class="fw-bold">Pelaksanaan</span>
                  <span class="small"
                    >:
                    {{ `${data.tgl}, ${data.mulai} - ${data.selesai}` }}</span
                  >
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <router-link
                      :to="{
                        name: 'dashboard-lsp-panitia-test-show',
                        params: { id_test: data.id, table: data.flag },
                      }"
                      class="btn btn-sm rounded-2 bg-info-1 me-2 text-white hovered"
                    >
                      <i class="fas fa-list me-2"></i>Soal
                    </router-link>
                    <router-link
                      :to="{
                        name: 'dashboard-lsp-panitia-test-nilai',
                        params: { id_test: data.id, table: data.flag },
                      }"
                      class="btn btn-sm rounded-2 bg-danger me-2 text-white hovered"
                    >
                      <i class="fas fa-list-check me-2"></i>Nilai
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
