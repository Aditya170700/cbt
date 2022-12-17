<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<script setup>
import Sidebar from "@/components/Dashboard/SidebarNonPnbp/Peserta.vue";
import axios from "axios";
import { onMounted, reactive } from "vue";
import { appStore } from "@/stores/app";
import { useRoute, useRouter } from "vue-router";
import Spinner from "@/components/Spinner.vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import {
  confirmation,
  alertSuccess,
  alertError,
  swalSuccess,
} from "@/assets/js/utils";

let widthContent = window.innerWidth;
const storeApp = appStore();
let route = useRoute();
let router = useRouter();
let result = reactive({
  data: [],
  loading: false,
  index: 0,
  jam: 0,
  menit: 0,
  detik: 0,
  submitLoading: false,
});

onMounted(() => {
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  document.onkeydown = function (e) {
    if (e.keyCode == 123) {
      return false;
    }
  };

  fetchData();
});

function fetchData() {
  result.loading = true;
  axios
    .get(
      `${storeApp.baseurl}cbt/non-pnbp/peserta/test/${route.params.id_diklat}/jadwal/${route.params.id_jadwal}/${route.params.id_test}/get-pertanyaan/${route.params.table}`,
      {
        headers: {
          Authorization: `Bearer ${storeApp.tokenPeserta}`,
        },
      }
    )
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      result.loading = false;
      result.data = res.data.data;
      compareLocal();
      timer(res.data.data.selesai);
    })
    .catch((err) => {
      result.loading = false;
      console.log(err);
    });
}

function timer(selesai) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const countDown = new Date(selesai).getTime(),
    x = setInterval(function () {
      const now = new Date().getTime(),
        distance = countDown - now;

      result.jam = Math.floor((distance % day) / hour);
      result.menit = Math.floor((distance % hour) / minute);
      result.detik = Math.floor((distance % minute) / second);

      if (distance < 0) {
        result.jam = 0;
        result.menit = 0;
        result.detik = 0;

        swalSuccess(
          "Waktu pengerjaan telah habis, Klik Oke untuk mengakhiri tes"
        ).then(() => {
          storeToDb();
        });

        clearInterval(x);
      }
    }, 0);
}

function selanjutnya(data, i) {
  let local = JSON.parse(localStorage.getItem("jawaban")) ?? [];

  if (data.jawaban) {
    local.forEach((item, key) => {
      if (item.id == data.id) {
        local.splice(key, 1);
      }
    });

    local.push({
      id: data.id,
      id_test: route.params.id_test,
      jawaban: data.jawaban,
    });

    localStorage.setItem("jawaban", JSON.stringify(local));
  }

  result.index = i;
}

function compareLocal() {
  let local = JSON.parse(localStorage.getItem("jawaban")) ?? [];
  result.data.pertanyaan.forEach((item, key) => {
    local.forEach((itemLocal) => {
      if (
        item.id == itemLocal.id &&
        itemLocal.id_test == route.params.id_test
      ) {
        result.data.pertanyaan[key].jawaban = itemLocal.jawaban;
      }
    });
  });
}

function submit() {
  result.submitLoading = true;

  confirmation("Apakah anda yakin ingin mengakhiri test ini?").then(
    (confirmed) => {
      if (confirmed) {
        storeToDb();
      } else {
        result.submitLoading = false;
      }
    }
  );
}

function storeToDb() {
  result.submitLoading = true;
  axios
    .post(
      `${storeApp.baseurl}cbt/non-pnbp/peserta/test/jawab`,
      {
        id_test: result.data.id,
        id_diklat: route.params.id_diklat,
        id_jadwal: route.params.id_jadwal,
        table: result.data.flag,
        jawaban: result.data.pertanyaan,
      },
      {
        headers: {
          Authorization: `Bearer ${storeApp.tokenPeserta}`,
        },
      }
    )
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);

      result.submitLoading = false;
      alertSuccess(res.data.message);
      localStorage.removeItem("jawaban");
      router.push({
        name: "dashboard-non-pnbp-peserta-diklat-jadwal-test",
        params: {
          id_diklat: route.params.id_diklat,
          id_jadwal: route.params.id_jadwal,
        },
      });
    })
    .catch((err) => {
      result.submitLoading = false;
      alertError(err.response.data.message);
    });
}
</script>

<template>
  <div class="dashboard">
    <Sidebar />
    <div
      :class="`main-content content ${widthContent > 992 ? '' : 'hide'} mb-5`"
    >
      <div class="container p-lg-4" v-if="result.loading">
        <div class="row">
          <div class="col-12 text-center">
            <Spinner :color="'dark'" />
          </div>
        </div>
      </div>
      <div class="container p-lg-4" v-else>
        <div class="d-flex px-2 mb-4 justify-content-between">
          <div class="h4 fw-bold">Kerjakan Test</div>
        </div>
        <div class="row px-2">
          <div class="col-lg-3">
            <div class="card rounded-2 shadow-sm">
              <div class="card-body p-4">
                <div class="row">
                  <div class="col-12 mb-3 text-center">
                    <span class="fw-bold h5">Sisa Waktu</span>
                  </div>
                  <div
                    class="col-12 mb-4 d-flex justify-content-between rounded-2 p-3 bg-warning-cbt"
                  >
                    <div class="text-center fw-bold">
                      <div
                        class="bg-blue-cbt rounded-circle py-1 px-2 text-white"
                        style="width: 35px; height: 35px"
                      >
                        {{ result.jam }}
                      </div>
                      <div class="small">Jam</div>
                    </div>
                    <div class="text-center fw-bold">
                      <div
                        class="bg-blue-cbt rounded-circle py-1 px-2 text-white"
                        style="width: 35px; height: 35px"
                      >
                        {{ result.menit }}
                      </div>
                      <div class="small">Menit</div>
                    </div>
                    <div class="text-center fw-bold">
                      <div
                        class="bg-blue-cbt rounded-circle py-1 px-2 text-white"
                        style="width: 35px; height: 35px"
                      >
                        {{ result.detik }}
                      </div>
                      <div class="small">Detik</div>
                    </div>
                  </div>
                  <div class="col-12 text-center">
                    <span class="fw-bold h5">Pengerjaan</span>
                  </div>
                  <div class="col-12">
                    <table class="table table-borderless">
                      <tbody>
                        <tr class="d-block">
                          <td
                            style="float: left"
                            v-for="(pertanyaan, i) in result.data.pertanyaan"
                            :key="i"
                          >
                            <div
                              :class="`${
                                pertanyaan.jawaban
                                  ? 'bg-success text-white'
                                  : 'bg-danger text-white'
                              } ${
                                result.index == i ? 'border-2 border-dark' : ''
                              } rounded-circle d-flex justify-content-center align-items-center fw-bold hovered pointer`"
                              style="
                                width: 30px !important;
                                height: 30px !important;
                              "
                              @click="result.index = i"
                            >
                              {{ i + 1 }}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            :class="`col-lg-9 ${i != result.index ? 'd-none' : ''}`"
            v-for="(pertanyaan, i) in result.data.pertanyaan"
            :key="i"
          >
            <div class="card rounded-2 shadow-sm">
              <div
                class="card-body p-4"
                v-if="pertanyaan.tipe == 'Multiple Choice'"
              >
                <div class="row mb-3">
                  <div class="col-auto fw-bold">{{ i + 1 }}.</div>
                  <div
                    class="col-auto fw-bold"
                    v-html="pertanyaan.pertanyaan"
                  ></div>
                </div>
                <div
                  class="row mb-2"
                  v-for="(opsi, iOpsi) in pertanyaan.options"
                  :key="iOpsi"
                >
                  <div class="col-auto fw-bold">&nbsp;</div>
                  <div
                    class="col-11 d-flex justify-content-start align-items-center"
                  >
                    <div>
                      <div
                        :class="`rounded-circle ${
                          opsi.id == pertanyaan.jawaban
                            ? 'bg-success'
                            : 'bg-light'
                        } border me-2 hovered pointer`"
                        style="width: 25px; height: 25px"
                        @click="pertanyaan.jawaban = opsi.id"
                      ></div>
                    </div>
                    <span
                      class="fw-bold small hovered pointer"
                      @click="pertanyaan.jawaban = opsi.id"
                      >{{ opsi.value }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="card-body p-4" v-if="pertanyaan.tipe == 'Essay'">
                <div class="row mb-3">
                  <div class="col-auto fw-bold">{{ i + 1 }}.</div>
                  <div
                    class="col-auto fw-bold"
                    v-html="pertanyaan.pertanyaan"
                  ></div>
                </div>
                <div class="row mb-2">
                  <div class="col-auto fw-bold">&nbsp;</div>
                  <div class="col-11">
                    <QuillEditor
                      theme="snow"
                      v-model:content="pertanyaan.jawaban"
                      contentType="html"
                      style="height: 300px"
                      toolbar="full"
                    />
                  </div>
                </div>
              </div>
              <div
                class="card-body p-4 d-flex justify-content-between align-items-center"
              >
                <button
                  class="btn btn-sm rounded-2 btn-light border"
                  v-if="i != 0"
                  @click.prevent="result.index = i - 1"
                >
                  <i class="fas fa-angles-left me-2"></i>Sebelumnya
                </button>
                <span v-if="i == 0">&nbsp;</span>
                <button
                  class="btn btn-sm rounded-2 bg-info-1 border text-white"
                  @click.prevent="selanjutnya(result.data.pertanyaan[i], i + 1)"
                  v-if="i != result.data.pertanyaan.length - 1"
                >
                  Selanjutnya<i class="fas fa-angles-right ms-2"></i>
                </button>
                <button
                  class="btn btn-sm rounded-2 bg-success border text-white"
                  :disabled="result.submitLoading"
                  v-if="i == result.data.pertanyaan.length - 1"
                  @click.prevent="submit()"
                >
                  <Spinner v-if="result.submitLoading" /><span v-else
                    ><i class="fas fa-check me-2"></i>Selesai</span
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
