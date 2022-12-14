<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/Sidebar/Peserta.vue";
import { appStore } from "@/stores/app";
import Spinner from "@/components/Spinner.vue";
import { onBeforeMount, reactive } from "vue";
import axios from "axios";
import imgStatic from "@/assets/img/static/materi-1.png";

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
    .get(`${storeApp.baseurl}cbt/peserta/diklat/list`, {
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
            <div class="h4 fw-bold">List Diklat</div>
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
                @click="fetchData()"
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
          <div class="col-lg-12" v-if="result.data.length < 1">
            Belum ada course
          </div>
          <div class="col-lg-4 mb-4" v-for="(data, i) in result.data" :key="i">
            <router-link
              :to="{
                name: 'dashboard-peserta-diklat-test',
                params: { id_diklat: data.id },
              }"
              class="text-decoration-none text-dark hovered"
            >
              <div class="card rounded-5 shadow border position-relative">
                <div class="position-absolute" style="top: 0; right: -5%"></div>
                <img :src="imgStatic" class="card-img-top" alt="Materi 1" />
                <div class="card-body rounded-4 p-4">
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
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
