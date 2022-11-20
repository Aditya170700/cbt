<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/Sidebar.vue";
import { appStore } from "@/stores/app";
import Spinner from "@/components/Spinner.vue";
import { onBeforeMount, reactive } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { confirmation } from "@/assets/js/utils";

const storeApp = appStore();
let widthContent = window.innerWidth;
let route = useRoute();
let router = useRouter();
let result = reactive({
  data: null,
  loading: false,
});
let test = reactive({
  data: null,
  loading: false,
});

onBeforeMount(() => {
  fetchData();
  fetchTest();
});

function fetchData() {
  result.loading = true;
  axios
    .get(
      `${storeApp.baseurl}cbt/non-pnbp/peserta/diklat/${route.params.id_diklat}/jadwal/${route.params.id_jadwal}`,
      {
        headers: {
          Authorization: `Bearer ${storeApp.token}`,
        },
      }
    )
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      result.loading = false;
      result.data = res.data.data;
    })
    .catch((err) => {
      result.loading = false;
      console.log(err);
    });
}

function fetchTest() {
  test.loading = true;
  axios
    .get(
      `${storeApp.baseurl}cbt/non-pnbp/peserta/test/${route.params.id_diklat}/jadwal/${route.params.id_jadwal}/by-jadwal`,
      {
        headers: {
          Authorization: `Bearer ${storeApp.token}`,
        },
      }
    )
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      test.loading = false;
      test.data = res.data.data;
    })
    .catch((err) => {
      test.loading = false;
      console.log(err);
    });
}

function doTest(data) {
  confirmation(
    "Apakah anda yakin akan mengerjakan test ini, tes hanya bisa dikerjakan sekali?"
  ).then((confirmed) => {
    if (confirmed) {
      router.push({
        name: "dashboard-peserta-diklat-test-do",
        params: {
          id_diklat: route.params.id_diklat,
          id_test: data.id,
          table: data.flag,
        },
      });
    }
  });
}

function listJawaban(data) {
  router.push({
    name: "dashboard-peserta-diklat-jawaban",
    params: {
      id_diklat: route.params.id_diklat,
      id_test: data.id,
      table: data.flag,
    },
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
          <div class="h4 fw-bold">Detail</div>
          <div>
            <router-link
              :to="{
                name: 'dashboard-non-pnbp-peserta-diklat-jadwal',
                params: {
                  id_diklat: route.params.id_diklat,
                },
              }"
              class="btn btn-sm btn-light rounded-2"
              ><i class="fas fa-arrow-left me-2"></i>Kembali</router-link
            >
          </div>
        </div>
        <div class="row px-2 mb-4" v-if="result.loading">
          <div class="col-lg-12 text-center"><Spinner :color="'dark'" /></div>
        </div>
        <div class="row px-2 mb-4" v-else>
          <div class="col-2">
            <div class="fw-bold">Judul</div>
          </div>
          <div class="col-10">
            :
            {{ result.data.header }}
          </div>
          <div class="col-2">
            <div class="fw-bold">Pelaksanaan</div>
          </div>
          <div class="col-10">
            :
            {{ `${result.data.mulai} - ${result.data.selesai}` }}
          </div>
          <div class="col-2">
            <div class="fw-bold">Jumlah Peserta</div>
          </div>
          <div class="col-10">
            :
            {{ result.data.peserta_count }}
          </div>
        </div>
        <div
          :class="`row px-2 mb-4 ${result.loading ? 'd-none' : ''}`"
          v-if="test.loading"
        >
          <div class="col-lg-12 text-center"><Spinner :color="'dark'" /></div>
        </div>
        <div class="row px-2 mb-4" v-else>
          <div class="col-12 text-center" v-if="test.data.length == 0">
            Belum ada test
          </div>
          <div class="col-lg-3 mb-4" v-for="(data, i) in test.data" :key="i">
            <div
              :class="`card rounded-4 border hovered pointer`"
              @click.prevent="
                data.status == 'Belum mengerjakan'
                  ? doTest(data)
                  : listJawaban(data)
              "
            >
              <div class="card-body rounded-4 p-3 position-relative">
                <div class="h6 fw-bold">{{ data.nama }}</div>
                <div class="small">
                  {{ `${data.tgl}` }}
                </div>
                <div class="small mb-3">
                  {{ `${data.mulai} - ${data.selesai}` }}
                </div>
                <span :class="`badge bg-${data.status_color}`">{{
                  data.status
                }}</span>
                <div
                  class="position-absolute rounded-circle bg-info-1 d-flex justify-content-center align-items-center fw-bold"
                  style="width: 40px; height: 40px; right: 10px; top: 10px"
                  v-if="data.status == 'Sudah dinilai'"
                >
                  {{ data.nilai }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
