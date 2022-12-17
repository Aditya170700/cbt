<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/Sidebar/Peserta.vue";
import { appStore } from "@/stores/app";
import Spinner from "@/components/Spinner.vue";
import { onBeforeMount, reactive, watch } from "vue";
import axios from "axios";
import imgStatic from "@/assets/img/static/materi-1.png";
import { alertSuccess, alertError } from "@/assets/js/utils";
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
  fetchData(`${storeApp.baseurl}cbt/peserta/diklat/list`);
  fetchDataLemdik();
});

function fetchData(url) {
  result.loading = true;
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${storeApp.tokenPeserta}`,
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

function print(data) {
  data.loading = true;
  axios
    .get(`${storeApp.baseurl}cbt/peserta/diklat/${data.id}/print-kartu-ujian`, {
      headers: {
        Authorization: `Bearer ${storeApp.tokenPeserta}`,
      },
    })
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      window.open(res.data.data);
      data.loading = false;
      alertSuccess(res.data.message);
    })
    .catch((err) => {
      data.loading = false;
      console.log(err);
      alertError(err.response.data.message);
    });
}

function fetchDataLemdik() {
  lemdik.loading = true;
  axios
    .get(`${storeApp.baseurl}cbt/peserta/other/lemdik`, {
      headers: {
        Authorization: `Bearer ${storeApp.tokenPeserta}`,
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
      fetchData(`${storeApp.baseurl}cbt/peserta/diklat/list`);
    }
  }
);

let navigation = (url) => {
  fetchData(url);
};

watch(
  () => params.status_waktu,
  () => {
    fetchData(`${storeApp.baseurl}cbt/peserta/diklat/list`);
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
            <div class="h4 fw-bold">List Diklat</div>
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
                @click="fetchData(`${storeApp.baseurl}cbt/peserta/diklat/list`)"
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
          <div class="col-lg-12" v-if="result.data.length < 1">
            Belum ada course
          </div>
          <div class="col-lg-4 mb-4" v-for="(data, i) in result.data" :key="i">
            <div class="card rounded-5 shadow border position-relative">
              <router-link
                :to="{
                  name: 'dashboard-peserta-diklat-test',
                  params: { id_diklat: data.id },
                }"
                class="text-decoration-none text-dark hovered"
              >
                <img :src="imgStatic" class="card-img-top" alt="Materi 1" />
              </router-link>
              <div class="card-body rounded-4 p-4">
                <router-link
                  :to="{
                    name: 'dashboard-peserta-diklat-test',
                    params: { id_diklat: data.id },
                  }"
                  class="text-decoration-none text-dark hovered"
                >
                  <div class="h5 fw-bold">
                    {{
                      data.jenis_diklat_referensi_diklat_pnbp
                        .referensi_diklat_pnbp.name
                    }}
                  </div>
                  <div class="h6 fw-bold">
                    {{
                      data.jenis_diklat_referensi_diklat_pnbp.jenis_diklat_pnbp
                        .parent.name
                    }}
                    /
                    {{
                      data.jenis_diklat_referensi_diklat_pnbp.jenis_diklat_pnbp
                        .name
                    }}
                  </div>
                  <div class="small d-flex justify-content-between mt-3">
                    <span class="fw-bold">Pelaksanaan</span>
                    {{ data.tgl_pelaksanaan }}
                  </div>
                  <div class="small d-flex justify-content-between">
                    <span class="fw-bold">Lembaga</span>
                    {{ data.profil_lemdik.nm_lembaga }}
                  </div>
                  <div class="small d-flex justify-content-between">
                    <span class="fw-bold">Peserta</span>
                    {{ data.jumlah_peserta }} Orang
                  </div>
                </router-link>
                <div class="row mt-3">
                  <div class="col-12">
                    <button
                      class="btn btn-sm rounded-2 btn-success"
                      @click="print(data)"
                      :disabled="data.loading"
                    >
                      <Spinner v-if="data.loading" /><span v-else
                        ><i class="fas fa-print me-2"></i>Cetak Kartu
                        Ujian</span
                      >
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <Pagination
              v-if="result.data?.length > 0"
              :data="result.meta"
              ammount="Diklat"
              :function="navigation"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
