<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/Sidebar/Panitia.vue";
import { appStore } from "@/stores/app";
import Spinner from "@/components/Spinner.vue";
import { onBeforeMount, reactive } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { alertError, alertSuccess, confirmation } from "@/assets/js/utils";
import Pagination from "@/components/Dashboard/Pagination.vue";

const storeApp = appStore();
let widthContent = window.innerWidth;
let route = useRoute();
let result = reactive({
  data: null,
  bobot: 0,
  loading: false,
});
let question = reactive({
  data: [],
  meta: null,
  loading: false,
});
let params = reactive({
  search: "",
  per_page: 20,
});

onBeforeMount(() => {
  fetchData();
  fetchQuestionNotInTest(
    `${storeApp.baseurl}cbt/panitia/soal/${route.params.id_test}/not-in-test/${route.params.table}`
  );
});

function fetchData() {
  result.loading = true;
  axios
    .get(
      `${storeApp.baseurl}cbt/panitia/test/${route.params.id_test}/show/${route.params.table}`,
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
      result.bobot = res.data.bobot;
    })
    .catch((err) => {
      result.loading = false;
      console.log(err);
    });
}

function fetchQuestionNotInTest(url) {
  question.loading = true;

  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${storeApp.tokenPanitia}`,
      },
      params,
    })
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      question.loading = false;
      question.data = res.data.data;
      question.meta = res.data.meta;
    })
    .catch((err) => {
      question.loading = false;
      console.log(err);
    });
}

function addSoal(data) {
  data.loading = true;

  axios
    .post(
      `${storeApp.baseurl}cbt/panitia/test/attach-pertanyaan`,
      {
        bobot: data.bobot,
        test_id: route.params.id_test,
        table: route.params.table,
        soal_id: data.id,
      },
      {
        headers: {
          Authorization: `Bearer ${storeApp.tokenPanitia}`,
        },
      }
    )
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      data.loading = false;
      alertSuccess(res.data.message);
      fetchData();
      fetchQuestionNotInTest(
        `${storeApp.baseurl}cbt/panitia/soal/${route.params.id_test}/not-in-test/${route.params.table}`
      );
    })
    .catch((err) => {
      data.loading = false;
      alertError(err.response.data.message);
      console.log(err);
    });
}

function removeSoal(data) {
  confirmation("Yakin hapus data ini?").then((confirmed) => {
    if (confirmed) {
      data.loading = true;

      axios
        .post(
          `${storeApp.baseurl}cbt/panitia/test/detach-pertanyaan`,
          {
            test_id: route.params.id_test,
            table: route.params.table,
            soal_id: data.id,
          },
          {
            headers: {
              Authorization: `Bearer ${storeApp.tokenPanitia}`,
            },
          }
        )
        .then((res) => {
          if (res.data.code_response != 200) throw new Error(res.data.message);
          data.loading = false;
          alertSuccess(res.data.message);
          fetchData();
          fetchQuestionNotInTest(
            `${storeApp.baseurl}cbt/panitia/soal/${route.params.id_test}/not-in-test/${route.params.table}`
          );
        })
        .catch((err) => {
          data.loading = false;
          alertError(err.response.data.message);
          console.log(err);
        });
    }
  });
}

let navigationNotInTest = (url) => {
  fetchQuestionNotInTest(url);
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
          <div class="col-6">
            <div class="h4 fw-bold">{{ result?.data?.nama }}</div>
          </div>
          <div class="col-6 text-end">
            <div>
              <router-link
                :to="{ name: 'dashboard-panitia-test' }"
                class="btn btn-sm btn-light rounded-2"
              >
                <i class="fas fa-arrow-left me-2"></i>Kembali</router-link
              >
            </div>
          </div>
        </div>
        <div class="row px-2" v-if="result.loading">
          <div class="col-lg-12 text-center"><Spinner :color="'dark'" /></div>
        </div>
        <div class="row px-2" v-else>
          <div class="col-12 mb-3">
            <div class="row">
              <div class="col-lg-4 mb-3">
                <div class="card border-0">
                  <div
                    class="card-body bg-success text-white rounded-2 border-0 shadow-lg"
                  >
                    <div class="h6 fw-bold">Multiple Choice</div>
                    <div class="h5 fw-bold">
                      {{ result.data.lms_pertanyaan_multiple_choice_count }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 mb-3">
                <div class="card border-0">
                  <div
                    class="card-body bg-warning text-white rounded-2 border-0 shadow-lg"
                  >
                    <div class="h6 fw-bold">Essay</div>
                    <div class="h5 fw-bold">
                      {{ result.data.lms_pertanyaan_essay_count }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 mb-3">
                <div class="card border-0">
                  <div
                    class="card-body bg-info-1 text-white rounded-2 border-0 shadow-lg"
                  >
                    <div class="h6 fw-bold">Total Bobot</div>
                    <div class="h5 fw-bold">{{ result.bobot }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 mb-3" v-html="result.data.deskripsi"></div>
          <div class="col-lg-6">
            <div class="row">
              <div
                class="col-12 d-flex justify-content-between mb-2 align-items-center"
              >
                <div class="col-8">
                  <span class="fw-bold">List Soal</span>
                </div>
                <div class="col-4">
                  <div class="input-group rounded-2">
                    <input
                      type="text"
                      class="form-control rounded-2"
                      aria-describedby="btn-search"
                      placeholder="Cari..."
                      v-model="params.search"
                    />
                    <button
                      class="btn btn-success btn-sm rounded-2"
                      type="button"
                      id="btn-search"
                      @click="fetchQuestionNotInTest"
                    >
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead class="bg-info-1">
                      <tr>
                        <th>Pertanyaan</th>
                        <th>Tipe</th>
                        <th>Creator</th>
                        <th>Bobot Maks.</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody v-if="question.loading">
                      <tr>
                        <td colspan="5" class="text-center">
                          <Spinner :color="'dark'" />
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr v-if="question.data.length < 1">
                        <td colspan="5" class="text-center">
                          Cari soal dari bank soal
                        </td>
                      </tr>
                      <tr v-for="(data, i) in question.data" :key="i">
                        <td v-html="data.pertanyaan"></td>
                        <td>
                          {{ data.tipe }}
                        </td>
                        <td>
                          {{ data.creator.nm_pengguna ?? data.creator.role }}
                        </td>
                        <td>
                          <div>
                            <input
                              type="number"
                              class="form-control"
                              v-model="data.bobot"
                              placeholder="Bobot"
                            />
                          </div>
                        </td>
                        <td>
                          <div class="d-flex">
                            <div>
                              <button
                                class="btn btn-sm rounded-2 btn-success"
                                @click="addSoal(data)"
                                :disabled="data.loading"
                              >
                                <Spinner v-if="data.loading" /><i
                                  class="fas fa-arrow-right"
                                  v-else
                                ></i>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-12">
                <Pagination
                  v-if="question.data?.length > 0"
                  :data="question.meta"
                  ammount="Soal"
                  :function="navigationNotInTest"
                />
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="row">
              <div
                class="col-12 d-flex justify-content-between mb-2 align-items-center"
              >
                <div class="col-12 py-2">
                  <span class="fw-bold">Soal Terpilih</span>
                </div>
              </div>
              <div class="col-12">
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead class="bg-info-1">
                      <tr>
                        <th>Aksi</th>
                        <th>Pertanyaan</th>
                        <th>Tipe</th>
                        <th>Creator</th>
                        <th>Bobot Maks.</th>
                      </tr>
                    </thead>
                    <tbody v-if="result.loading">
                      <tr>
                        <td colspan="5" class="text-center">
                          <Spinner :color="'dark'" />
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr v-if="result.data?.lms_pertanyaan?.length < 1">
                        <td colspan="5" class="text-center">
                          Belum ada soal terpilih
                        </td>
                      </tr>
                      <tr
                        v-for="(data, i) in result.data?.lms_pertanyaan"
                        :key="i"
                      >
                        <td>
                          <div class="d-flex">
                            <div>
                              <button
                                class="btn btn-sm rounded-2 btn-danger"
                                @click="removeSoal(data)"
                                :disabled="data.loading"
                              >
                                <Spinner v-if="data.loading" /><i
                                  class="fas fa-arrow-left"
                                  v-else
                                ></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td v-html="data.pertanyaan"></td>
                        <td>
                          {{ data.tipe }}
                        </td>
                        <td>
                          {{ data.creator.nm_pengguna ?? data.creator.role }}
                        </td>
                        <td>{{ data.pivot?.bobot }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
