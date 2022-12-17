<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/SidebarLsp/Panitia.vue";
import { appStore } from "@/stores/app";
import Spinner from "@/components/Spinner.vue";
import { onBeforeMount, reactive, watch } from "vue";
import axios from "axios";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Pagination from "@/components/Dashboard/Pagination.vue";

const storeApp = appStore();
let widthContent = window.innerWidth;
let result = reactive({
  data: [],
  meta: null,
  loading: false,
});
let lemdik = reactive({
  data: [],
  selected: null,
  loading: false,
});
let params = reactive({
  per_page: 12,
  search: "",
  profil_lemdik_id: "",
  status_waktu: null,
});

onBeforeMount(() => {
  fetchData(`${storeApp.baseurl}cbt/lsp/panitia/test/list`);
  fetchDataLemdik();
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
      result.data = res.data.data;
      result.meta = res.data.meta;
    })
    .catch((err) => {
      result.loading = false;
      console.log(err);
    });
}

function fetchDataLemdik() {
  lemdik.loading = true;
  axios
    .get(`${storeApp.baseurl}cbt/lsp/panitia/other/lemdik`, {
      headers: {
        Authorization: `Bearer ${storeApp.tokenPanitia}`,
      },
      params,
    })
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      lemdik.loading = false;
      lemdik.data = res.data.data;
    })
    .catch((err) => {
      lemdik.loading = false;
      console.log(err);
    });
}

watch(
  () => lemdik.selected,
  (val) => {
    if (val) {
      params.profil_lemdik_id = val.id;
      fetchData(`${storeApp.baseurl}cbt/lsp/panitia/test/list`);
    }
  }
);

function timer(timer) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const countDown = new Date(timer?.tgl).getTime(),
    x = setInterval(function () {
      const now = new Date().getTime(),
        distance = countDown - now;

      timer.jam = Math.floor((distance % day) / hour);
      timer.menit = Math.floor((distance % hour) / minute);
      timer.detik = Math.floor((distance % minute) / second);

      if (distance < 0) {
        timer.jam = 0;
        timer.menit = 0;
        timer.detik = 0;

        clearInterval(x);
      }
    }, 0);
}

let navigation = (url) => {
  fetchData(url);
};

watch(
  () => params.status_waktu,
  () => {
    fetchData(`${storeApp.baseurl}cbt/lsp/panitia/test/list`);
  }
);
</script>

<template>
  <div class="dashboard">
    <Sidebar />
    <div
      :class="`main-content content ${widthContent > 992 ? '' : 'hide'} mb-5`"
    >
      <div class="container p-lg-4">
        <div class="d-flex px-2 mb-4 justify-content-between">
          <div class="col-lg-6 text-start mb-3">
            <div class="h4 fw-bold">Test List</div>
          </div>
          <div class="col-lg-3 me-2">
            <vSelect
              :options="lemdik.data"
              label="nm_lembaga"
              v-model="lemdik.selected"
              :placeholder="'Cari Lembaga Didik'"
              class="shadow"
            />
          </div>
          <div class="col-lg-3 text-end">
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
                  fetchData(`${storeApp.baseurl}cbt/lsp/panitia/test/list`)
                "
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
          <div class="col-12 mb-3">
            <button
              :class="`btn btn-sm rounded-2 me-2 btn-light ${
                params.status_waktu == null ? 'opacity-50' : ''
              }`"
              @click.prevent="params.status_waktu = null"
            >
              Tampilkan Semua
            </button>
            <button
              :class="`btn btn-sm rounded-2 me-2 btn-warning ${
                params.status_waktu == 1 ? 'opacity-50' : ''
              }`"
              @click.prevent="params.status_waktu = 1"
            >
              Akan Dilaksanakan
            </button>
            <button
              :class="`btn btn-sm rounded-2 me-2 btn-success ${
                params.status_waktu == 0 ? 'opacity-50' : ''
              }`"
              @click.prevent="params.status_waktu = 0"
            >
              Sedang Dilaksanakan
            </button>
            <button
              :class="`btn btn-sm rounded-2 me-2 btn-danger ${
                params.status_waktu == 2 ? 'opacity-50' : ''
              }`"
              @click.prevent="params.status_waktu = 2"
            >
              Sudah Dilaksanakan
            </button>
          </div>
          <div class="col-12 text-center" v-if="result.data.length == 0">
            Belum ada data
          </div>
          <div class="col-lg-4 mb-4" v-for="(data, i) in result.data" :key="i">
            <div class="card rounded-4 shadow border">
              <div class="card-body rounded-4 p-4">
                <div class="d-flex mb-3 justify-content-between">
                  <div>
                    <div class="small fw-bold">
                      {{ `${data.tgl}` }}
                    </div>
                    <div class="small">
                      {{ `${data.mulai} - ${data.selesai}` }}
                    </div>
                  </div>
                  <div
                    class="small fw-bold text-success"
                    v-if="data.status_waktu == 0"
                  >
                    {{ timer(data.timer) }}
                    {{
                      `${data.timer.jam} Jam ${data.timer.menit} Menit ${data.timer.detik} Detik`
                    }}
                  </div>
                  <div
                    class="small fw-bold text-warning"
                    v-else-if="data.status_waktu == 1"
                  >
                    {{ data.status_waktu_str }}
                  </div>
                  <div class="small fw-bold text-danger" v-else>
                    {{ data.status_waktu_str }}
                  </div>
                </div>
                <div class="h6 fw-bold">{{ data.nama }}</div>
                <div class="small mb-3">{{ data.created_at }}</div>
                <div class="four-line mb-3" v-html="data.deskripsi"></div>
                <div class="small">
                  <span class="fw-bold">UPT</span>
                  <span>: {{ data.nm_lembaga }}</span>
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
