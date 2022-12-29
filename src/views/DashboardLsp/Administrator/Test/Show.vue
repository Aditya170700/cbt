<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<script setup>
import Sidebar from "@/components/Dashboard/SidebarLsp/Administrator.vue";
import { appStore } from "@/stores/app";
import Spinner from "@/components/Spinner.vue";
import { onBeforeMount, reactive, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import Pagination from "@/components/Dashboard/Pagination.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { alertError, alertSuccess } from "@/assets/js/utils";

const storeApp = appStore();
let widthContent = window.innerWidth;
let route = useRoute();
let templateModal = ref(null);
let template = reactive({
  data: [],
  selected: null,
  loading: false,
});
let result = reactive({
  data: null,
  bobot: 0,
  loading: false,
  submitLoading: false,
  params: {
    sort: "asc",
    field: "pertanyaan",
  },
});
let question = reactive({
  data: [],
  meta: null,
  loading: false,
});
let params = reactive({
  search: "",
  per_page: 20,
  selected_ids: [],
  sort: "asc",
  field: "pertanyaan",
});

onBeforeMount(() => {
  fetchData();
  fetchQuestionNotInTest(
    `${storeApp.baseurl}cbt/lsp/admin-pusbang/soal/${route.params.id_test}/not-in-test/${route.params.table}`
  );
});

function fetchData() {
  result.loading = true;
  axios
    .get(
      `${storeApp.baseurl}cbt/lsp/admin-pusbang/test/${route.params.id_test}/show/${route.params.table}`,
      {
        headers: {
          Authorization: `Bearer ${storeApp.tokenAdministratorPelatihan}`,
        },
        params: result.params,
      }
    )
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      result.loading = false;
      result.data = res.data.data;
      result.bobot = res.data.bobot;
      res.data.data.lms_pertanyaan.forEach((val) => {
        params.selected_ids.push(val.id);
      });
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
        Authorization: `Bearer ${storeApp.tokenAdministratorPelatihan}`,
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

function fetchTemplate() {
  template.loading = true;
  axios
    .get(`${storeApp.baseurl}cbt/lsp/admin-pusbang/template/for-select`, {
      headers: {
        Authorization: `Bearer ${storeApp.tokenAdministratorPelatihan}`,
      },
    })
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      template.loading = false;
      template.data = res.data.data;
    })
    .catch((err) => {
      template.loading = false;
      console.log(err);
    });
}

function openTemplateModal() {
  fetchTemplate();

  templateModal.value = new bootstrap.Modal("#templateModal");
  templateModal.value.show();
}

function closeTemplateModal() {
  template.selected = null;
  templateModal.value.hide();
}

function pilihTemplate() {
  template.selected?.pertanyaan?.forEach((val) => {
    let exists = false;

    if (params.selected_ids.includes(val.id)) {
      exists = true;
    }

    if (!exists) {
      result.data.lms_pertanyaan.push(val?.pertanyaan);
      params.selected_ids.push(val?.pertanyaan.id);
    }
  });

  fetchQuestionNotInTest(
    `${storeApp.baseurl}cbt/lsp/admin-pusbang/soal/${route.params.id_test}/not-in-test/${route.params.table}`
  );
  closeTemplateModal();
}

function addSoal(data, i) {
  let exists = false;

  if (params.selected_ids.includes(data.id)) {
    exists = true;
  }

  if (!exists) {
    result.data.lms_pertanyaan.push(data);
    params.selected_ids.push(data.id);
  }

  question.data.splice(i, 1);
}

function removeSoal(data, i) {
  question.data.push(data);
  result.data.lms_pertanyaan.splice(i, 1);
  params.selected_ids.splice(i, 1);
}

let navigationNotInTest = (url) => {
  fetchQuestionNotInTest(url);
};

function submit() {
  result.submitLoading = true;

  let bobot = Math.round(100 / params.selected_ids.length);

  axios
    .post(
      `${storeApp.baseurl}cbt/lsp/admin-pusbang/test/attach-pertanyaan`,
      {
        bobot,
        ids: params.selected_ids,
        test_id: route.params.id_test,
        table: route.params.table,
      },
      {
        headers: {
          Authorization: `Bearer ${storeApp.tokenAdministratorPelatihan}`,
        },
      }
    )
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      result.submitLoading = false;
      alertSuccess(res.data.message);
    })
    .catch((err) => {
      result.submitLoading = false;
      alertError(err.response.data.message);
      console.log(err);
    });
}

function sortInTest(field) {
  result.params.field = field;
  result.params.sort = result.params.sort == "asc" ? "desc" : "asc";

  fetchData();
}

function sort(field) {
  params.field = field;
  params.sort = params.sort == "asc" ? "desc" : "asc";

  fetchQuestionNotInTest(
    `${storeApp.baseurl}cbt/lsp/admin-pusbang/soal/${route.params.id_test}/not-in-test/${route.params.table}`
  );
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
          <div class="col-6">
            <div class="h4 fw-bold">{{ result?.data?.nama }}</div>
          </div>
          <div class="col-6 text-end">
            <div>
              <router-link
                :to="{ name: 'dashboard-lsp-administrator-test' }"
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
          <div class="col-12 mb-3">
            <table>
              <tr>
                <td>
                  <div class="fw-bold">UPT</div>
                </td>
                <td>
                  <span class="ms-2"
                    >:
                    {{
                      result.data.lms_instruktur_jadwal?.jadwal?.diklat
                        ?.profil_lemdik?.nm_lembaga
                    }}</span
                  >
                </td>
              </tr>
              <tr>
                <td>
                  <div class="fw-bold">Pelaksanaan</div>
                </td>
                <td>
                  <span class="ms-2"
                    >:
                    {{
                      `${result.data.tgl} ${result.data.mulai}-${result.data.selesai}`
                    }}</span
                  >
                </td>
              </tr>
            </table>
          </div>
          <div class="col-12 mb-3" v-html="result.data.deskripsi"></div>
          <div class="col-12 mb-3" v-if="result.data.jawaban_count != 0">
            <div class="alert alert-danger" role="alert">
              Tes telah dikerjakan, tidak bisa update soal
            </div>
          </div>
          <div class="col-lg-6">
            <div class="row">
              <div
                class="col-12 d-flex justify-content-between mb-2 align-items-center"
              >
                <div class="col-8">
                  <div class="d-flex justify-content-start align-items-center">
                    <span class="fw-bold me-3">Bank Soal</span>
                    <button
                      class="btn btn-sm rounded-2 btn-info"
                      @click="openTemplateModal()"
                      v-if="result.data.jawaban_count == 0"
                    >
                      <i class="fas fa-file me-2"></i>Template
                    </button>
                  </div>
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
                        <th class="pointer" @click="sort('pertanyaan')">
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
                            <span>Pertanyaan</span>
                            <span v-if="params.field == 'pertanyaan'">
                              <i
                                class="fas fa-arrow-up small"
                                v-if="params.sort == 'desc'"
                              ></i>
                              <i class="fas fa-arrow-down small" v-else></i>
                            </span>
                          </div>
                        </th>
                        <th class="pointer" @click="sort('tipe')">
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
                            <span>Tipe</span>
                            <span v-if="params.field == 'tipe'">
                              <i
                                class="fas fa-arrow-up small"
                                v-if="params.sort == 'desc'"
                              ></i>
                              <i class="fas fa-arrow-down small" v-else></i>
                            </span>
                          </div>
                        </th>
                        <th class="pointer" @click="sort('creator')">
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
                            <span>Creator</span>
                            <span v-if="params.field == 'creator'">
                              <i
                                class="fas fa-arrow-up small"
                                v-if="params.sort == 'desc'"
                              ></i>
                              <i class="fas fa-arrow-down small" v-else></i>
                            </span>
                          </div>
                        </th>
                        <th class="pointer" @click="sort('kategori')">
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
                            <span>Kategori</span>
                            <span v-if="params.field == 'kategori'">
                              <i
                                class="fas fa-arrow-up small"
                                v-if="params.sort == 'desc'"
                              ></i>
                              <i class="fas fa-arrow-down small" v-else></i>
                            </span>
                          </div>
                        </th>
                        <th v-if="result.data.jawaban_count == 0">
                          Pilih Soal
                        </th>
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
                          {{ data.creator.nm_pengguna ?? data.creator }}
                        </td>
                        <td>
                          {{ data.kategori ?? "-" }}
                        </td>
                        <td v-if="result.data.jawaban_count == 0">
                          <div class="d-flex">
                            <div>
                              <button
                                class="btn btn-sm rounded-2 btn-success"
                                @click="addSoal(data, i)"
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
                    <thead class="bg-success text-white">
                      <tr>
                        <th v-if="result.data.jawaban_count == 0">
                          Hapus Soal
                        </th>
                        <th class="pointer" @click="sortInTest('pertanyaan')">
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
                            <span>Pertanyaan</span>
                            <span v-if="result.params.field == 'pertanyaan'">
                              <i
                                class="fas fa-arrow-up small"
                                v-if="result.params.sort == 'desc'"
                              ></i>
                              <i class="fas fa-arrow-down small" v-else></i>
                            </span>
                          </div>
                        </th>
                        <th class="pointer" @click="sortInTest('tipe')">
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
                            <span>Tipe</span>
                            <span v-if="result.params.field == 'tipe'">
                              <i
                                class="fas fa-arrow-up small"
                                v-if="result.params.sort == 'desc'"
                              ></i>
                              <i class="fas fa-arrow-down small" v-else></i>
                            </span>
                          </div>
                        </th>
                        <th class="pointer" @click="sortInTest('creator')">
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
                            <span>Creator</span>
                            <span v-if="result.params.field == 'creator'">
                              <i
                                class="fas fa-arrow-up small"
                                v-if="result.params.sort == 'desc'"
                              ></i>
                              <i class="fas fa-arrow-down small" v-else></i>
                            </span>
                          </div>
                        </th>
                        <th class="pointer" @click="sortInTest('kategori')">
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
                            <span>Kategori</span>
                            <span v-if="result.params.field == 'kategori'">
                              <i
                                class="fas fa-arrow-up small"
                                v-if="result.params.sort == 'desc'"
                              ></i>
                              <i class="fas fa-arrow-down small" v-else></i>
                            </span>
                          </div>
                        </th>
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
                        <td v-if="result.data.jawaban_count == 0">
                          <div class="d-flex">
                            <div>
                              <button
                                class="btn btn-sm rounded-2 btn-danger"
                                @click="removeSoal(data, i)"
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
                          {{ data.creator.nm_pengguna ?? data.creator }}
                        </td>
                        <td>
                          {{ data.kategori ?? "-" }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-lg-12 mt-3 text-end"
            v-if="result.data.jawaban_count == 0"
          >
            <button
              class="btn btn-sm rounded-2 bg-info-1"
              @click="submit()"
              :disabled="result.submitLoading"
            >
              <Spinner v-if="result.submitLoading" /><span v-else
                ><i class="fas fa-save me-2"></i>Simpan</span
              >
            </button>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="templateModal"
        tabindex="-1"
        aria-labelledby="templateModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <div
                class="d-flex justify-content-between align-items-center mb-4"
              >
                <div class="col-4">
                  <h1 class="modal-title fs-5" id="templateModalLabel">
                    Pilih Template
                  </h1>
                </div>
                <div class="col-8">
                  <div class="d-flex justify-content-end align-items-center">
                    <div class="me-2 col-6">
                      <vSelect
                        :options="template.data"
                        label="name"
                        v-model="template.selected"
                        :placeholder="'Pilih Template Soal'"
                      />
                    </div>
                    <div class="col-2 d-grid me-2">
                      <button
                        type="button"
                        class="btn btn-sm rounded-2 bg-info-1"
                        @click="pilihTemplate()"
                      >
                        <i class="fas fa-pencil me-2"></i>Pilih
                      </button>
                    </div>
                    <div class="col-2 d-grid">
                      <button
                        type="button"
                        class="btn btn-sm rounded-2 btn-light"
                        @click="closeTemplateModal()"
                      >
                        <i class="fas fa-times me-2"></i>Tutup
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 text-center" v-if="!template.selected">
                  Belum ada template terpilih
                </div>
                <div class="col-12" v-else>
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead class="bg-success text-white">
                        <tr>
                          <th>No</th>
                          <th>Pertanyaan</th>
                          <th>Tipe</th>
                          <th>Creator</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="template.selected?.pertanyaan?.length < 1">
                          <td colspan="4" class="text-center">
                            Belum ada soal dalam template
                          </td>
                        </tr>
                        <tr
                          v-for="(data, i) in template.selected?.pertanyaan"
                          :key="i"
                        >
                          <td>
                            {{ i + 1 }}
                          </td>
                          <td v-html="data.pertanyaan.pertanyaan"></td>
                          <td>
                            {{ data.tipe }}
                          </td>
                          <td>
                            {{ data.pertanyaan.creator.nm_pengguna }}
                          </td>
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
  </div>
</template>
