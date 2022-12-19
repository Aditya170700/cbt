<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/Sidebar/Administrator.vue";
import { appStore } from "@/stores/app";
import axios from "axios";
import { onMounted, reactive } from "vue";
import Spinner from "@/components/Spinner.vue";
import Pagination from "@/components/Dashboard/Pagination.vue";
import { alertError, alertSuccess } from "@/assets/js/utils";
import { useRouter } from "vue-router";

let widthContent = window.innerWidth;
const storeApp = appStore();
let router = useRouter();
let form = reactive({
  name: "",
  selected: [],
  loading: false,
  errors: null,
});
let soal = reactive({
  data: [],
  meta: null,
  loading: false,
});
let params = reactive({
  search: "",
  per_page: 20,
  selected_ids: [],
});

onMounted(() => {
  fetchSoal(`${storeApp.baseurl}cbt/admin-pusbang/soal/for-template`);
});

function fetchSoal(url) {
  soal.loading = true;
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${storeApp.tokenAdministratorPelatihan}`,
      },
      params,
    })
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      soal.loading = false;
      soal.data = res.data.data;
      soal.meta = res.data.meta;
    })
    .catch((err) => {
      soal.loading = false;
      console.log(err);
    });
}

let navigation = (url) => {
  fetchSoal(url);
};

function addSoal(data, i) {
  let exists = false;

  if (params.selected_ids.includes(data.id)) {
    exists = true;
  }

  if (!exists) {
    form.selected.push(data);
    params.selected_ids.push(data.id);
  }

  soal.data.splice(i, 1);
}

function removeSoal(data, i) {
  soal.data.push(data);
  form.selected.splice(i, 1);
  params.selected_ids.splice(i, 1);
}

function submit() {
  form.loading = true;
  form.errors = null;
  axios
    .post(
      `${storeApp.baseurl}cbt/admin-pusbang/template`,
      {
        name: form.name,
        selected: form.selected,
      },
      {
        headers: {
          Authorization: `Bearer ${storeApp.tokenAdministratorPelatihan}`,
        },
        params,
      }
    )
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      form.loading = false;
      alertSuccess(res.data.message);
      router.push({ name: "dashboard-administrator-template" });
    })
    .catch((err) => {
      form.loading = false;
      alertError(err.response.data.message);
      if (err.response.status == 422) {
        form.errors = err.response.data.errors;
      }
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
          <div class="col-7 col-lg-9 text-start mb-3">
            <div class="h4 fw-bold">TAMBAH TEMPLATE SOAL</div>
          </div>
          <div class="col-5 col-lg-3 text-end mb-3">
            <router-link
              :to="{ name: 'dashboard-administrator-template' }"
              class="btn btn-sm rounded-2 btn-light"
            >
              <i class="fas fa-arrow-left me-2"></i>Kembali
            </router-link>
          </div>
        </div>
        <div class="row px-2">
          <div class="col-lg-12">
            <div class="mb-5">
              <label class="form-label">Nama Template</label>
              <input type="text" class="form-control" v-model="form.name" />
              <div class="form-text small text-danger" v-if="form.errors?.name">
                {{ form.errors?.name[0] }}
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="row">
              <div class="col-12">
                <div class="d-flex justify-content-between">
                  <div class="col-6">
                    <label class="form-label">Bank Soal</label>
                  </div>
                  <div class="col-6">
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
                          fetchSoal(
                            `${storeApp.baseurl}cbt/admin-pusbang/soal/for-template`
                          )
                        "
                      >
                        <i class="fas fa-magnifying-glass"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <table class="table table-bordered">
                  <thead class="bg-info-1">
                    <tr>
                      <th>Pertanyaan</th>
                      <th>Tipe</th>
                      <th>Creator</th>
                      <th>Pilih Soal</th>
                    </tr>
                  </thead>
                  <tbody v-if="soal.loading">
                    <tr>
                      <td colspan="4" class="text-center">
                        <Spinner :color="'dark'" />
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr v-if="soal.data.length < 1">
                      <td colspan="5" class="text-center">
                        Soal tidak ditemukan
                      </td>
                    </tr>
                    <tr v-for="(data, i) in soal.data" :key="i">
                      <td v-html="data.pertanyaan"></td>
                      <td>
                        {{ data.tipe }}
                      </td>
                      <td>
                        {{ data.creator.nm_pengguna ?? data.creator.role }}
                      </td>
                      <td>
                        <div class="d-flex">
                          <div>
                            <button
                              class="btn btn-sm rounded-2 btn-success"
                              @click="addSoal(data, i)"
                            >
                              <i class="fas fa-arrow-right"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-12">
                <Pagination
                  v-if="soal.data?.length > 0"
                  :data="soal.meta"
                  ammount="Soal"
                  :function="navigation"
                />
              </div>
              <div class="col-12" v-if="form.errors?.selected_ids">
                <div class="form-text small text-danger">
                  {{ form.errors?.selected_ids[0] }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="row">
              <div class="col-12">
                <div class="d-flex justify-content-between">
                  <div class="col-6 mb-4">
                    <label class="form-label">Soal Terpilih</label>
                  </div>
                </div>
                <table class="table table-bordered">
                  <thead class="bg-success text-white">
                    <tr>
                      <th>Hapus Soal</th>
                      <th>Pertanyaan</th>
                      <th>Tipe</th>
                      <th>Creator</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="form.selected.length < 1">
                      <td colspan="5" class="text-center">
                        Soal tidak ditemukan
                      </td>
                    </tr>
                    <tr v-for="(data, i) in form.selected" :key="i">
                      <td>
                        <div class="d-flex">
                          <div>
                            <button
                              class="btn btn-sm rounded-2 btn-danger"
                              @click="removeSoal(data, i)"
                            >
                              <i class="fas fa-arrow-left"></i>
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
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="row px-2 mt-5">
          <div class="col-12">
            <button
              class="btn btn-sm rounded-2 bg-info-1"
              :disabled="form.loading"
              @click="submit"
            >
              <Spinner v-if="form.loading" /><span v-else
                ><i class="fas fa-save me-2"></i>Simpan</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
