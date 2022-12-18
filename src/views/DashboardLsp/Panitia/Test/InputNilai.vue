<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/SidebarLsp/Panitia.vue";
import { appStore } from "@/stores/app";
import Spinner from "@/components/Spinner.vue";
import { onBeforeMount, reactive } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { alertError, alertSuccess } from "@/assets/js/utils";

const storeApp = appStore();
let widthContent = window.innerWidth;
let route = useRoute();
let result = reactive({
  data: null,
  loading: false,
});

onBeforeMount(() => {
  fetchData();
});

function fetchData() {
  result.loading = true;
  axios
    .get(
      `${storeApp.baseurl}cbt/lsp/panitia/test/${route.params.id_test}/list-jawaban/${route.params.table}/${route.params.id_peserta}`,
      {
        headers: {
          Authorization: `Bearer ${storeApp.tokenPanitia}`,
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

function submitNilai(data) {
  data.loading = true;

  if (data.nilai > data.pertanyaan?.bobot) {
    alertError("Nilai tidak boleh lebih dari bobot");
    return;
  }

  axios
    .post(
      `${storeApp.baseurl}cbt/lsp/panitia/test/store-nilai/${route.params.table}/${data.id}`,
      {
        nilai: data.nilai,
      },
      {
        headers: {
          Authorization: `Bearer ${storeApp.tokenPanitia}`,
        },
      }
    )
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      alertSuccess("Berhasil menginput nilai");
      data.loading = false;
    })
    .catch((err) => {
      data.loading = false;
      console.log(err);
    });
}

function getNilai() {
  let bobot = 0;
  let nilai = 0;

  result.data.pertanyaan.forEach((val) => {
    nilai += val.nilai;
    bobot += val.pertanyaan.bobot;
  });

  return { bobot, nilai };
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
          <div class="h4 fw-bold">Input Nilai</div>
          <div>
            <router-link
              :to="{
                name: 'dashboard-lsp-panitia-test-nilai',
                params: {
                  id_test: route.params.id_test,
                  table: route.params.table,
                },
              }"
              class="btn btn-sm btn-light rounded-2"
            >
              <i class="fas fa-arrow-left me-2"></i>Kembali</router-link
            >
          </div>
        </div>
        <div class="row px-2" v-if="result.loading">
          <div class="col-12 text-center">
            <Spinner :color="'dark'" />
          </div>
        </div>
        <div class="row px-2" v-else>
          <div class="col-lg-10 mb-4">
            <div class="row">
              <div class="col-4 col-lg-1 fw-bold">Test</div>
              <div class="col-8 col-lg-11">{{ result.data?.test?.nama }}</div>
            </div>
            <div class="row">
              <div class="col-4 col-lg-1 fw-bold">Deskripsi</div>
              <div
                class="col-8 col-lg-11"
                v-html="result.data?.test?.deskripsi"
              ></div>
            </div>
            <div class="row">
              <div class="col-4 col-lg-1 fw-bold">Tanggal</div>
              <div class="col-8 col-lg-11">{{ result.data?.test?.tgl }}</div>
            </div>
            <div class="row">
              <div class="col-4 col-lg-1 fw-bold">Mulai</div>
              <div class="col-8 col-lg-11">{{ result.data?.test?.mulai }}</div>
            </div>
            <div class="row">
              <div class="col-4 col-lg-1 fw-bold">Selesai</div>
              <div class="col-8 col-lg-11">
                {{ result.data?.test?.selesai }}
              </div>
            </div>
          </div>
          <div class="col-lg-2 mb-4 text-lg-end">
            <button class="btn btn-sm rounded-2 btn-success fw-bold">
              {{ `${getNilai().nilai} / ${getNilai().bobot}` }}
            </button>
          </div>
          <div
            class="col-12 mb-4"
            v-for="(data, i) in result.data?.pertanyaan"
            :key="i"
          >
            <div class="card">
              <div class="card-body p-4 rounded-4">
                <div class="row">
                  <div class="col-auto">
                    <span class="fw-bold">{{ i + 1 }}.</span>
                  </div>
                  <div
                    class="col-auto fw-bold px-lg-0"
                    v-html="data.pertanyaan?.pertanyaan?.pertanyaan"
                  ></div>
                </div>
                <div
                  class="row ps-lg-4"
                  v-if="data.pertanyaan?.pertanyaan?.tipe == 'Essay'"
                >
                  <div class="col-auto fw-bold">Jawaban :</div>
                  <div class="col-auto py-0" v-html="data.answer"></div>
                </div>
                <div
                  class="d-flex ps-lg-4 align-items-center"
                  v-if="data.pertanyaan?.pertanyaan?.tipe == 'Essay'"
                >
                  <div class="col-auto fw-bold">Nilai :</div>
                  <div class="col-auto mx-2" style="max-width: 50px">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="0"
                      v-model="data.nilai"
                      @change="submitNilai(data)"
                    />
                  </div>
                  <div class="col-auto fw-bold">
                    / {{ data.pertanyaan?.bobot }}
                  </div>
                </div>
                <div
                  class="row ps-lg-4"
                  v-if="data.pertanyaan?.pertanyaan?.tipe == 'Multiple Choice'"
                >
                  <div
                    :class="`col-12 d-flex align-items-center ${
                      opsi.kunci == 'Y'
                        ? 'text-success'
                        : opsi.kunci == 'N' &&
                          opsi.id == data.lms_opsi_pertanyaan_id
                        ? 'text-danger'
                        : ''
                    }`"
                    v-for="(opsi, iOpsi) in data.pertanyaan?.pertanyaan
                      ?.lms_opsi_pertanyaan"
                    :key="iOpsi"
                  >
                    <i class="fas fa-circle me-2"></i>
                    <span class="fw-bold">{{ opsi.value }}</span>
                  </div>
                </div>
                <div
                  class="d-flex ps-lg-4 align-items-center"
                  v-if="data.pertanyaan?.pertanyaan?.tipe == 'Multiple Choice'"
                >
                  <div class="col-auto fw-bold">Nilai :</div>
                  <div class="col-auto mx-2" style="max-width: 50px">
                    <Spinner :color="'dark'" v-if="data.loading" />
                    <input
                      v-else
                      type="text"
                      class="form-control"
                      disabled
                      :value="data.nilai"
                    />
                  </div>
                  <div class="col-auto fw-bold">
                    / {{ data.pertanyaan?.bobot }}
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
