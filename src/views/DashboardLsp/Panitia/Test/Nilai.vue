<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/SidebarLsp/Panitia.vue";
import { appStore } from "@/stores/app";
import Spinner from "@/components/Spinner.vue";
import { onBeforeMount, reactive } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

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
      `${storeApp.baseurl}cbt/lsp/panitia/test/${route.params.id_test}/list-nilai/${route.params.table}`,
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
            <div class="h4 fw-bold">{{ result?.data?.test?.nama }}</div>
          </div>
          <div class="col-6 text-end">
            <div>
              <router-link
                :to="{ name: 'dashboard-lsp-panitia-test' }"
                class="btn btn-sm btn-light rounded-2"
              >
                <i class="fas fa-arrow-left me-2"></i>Kembali</router-link
              >
            </div>
          </div>
        </div>
        <div class="row px-2 mb-2" v-if="!result.loading">
          <div class="col-12">
            <div class="row">
              <div class="col-lg-2 col-3 fw-bold">Jenis Diklat</div>
              <div class="col-lg-10 col-9">
                {{ result.data?.test?.parent }}
              </div>
            </div>
            <div class="row">
              <div class="col-lg-2 col-3 fw-bold">Kategori Diklat</div>
              <div class="col-lg-10 col-9">
                {{ result.data?.test?.jenis_diklat }}
              </div>
            </div>
            <div class="row">
              <div class="col-lg-2 col-3 fw-bold">Program Diklat</div>
              <div class="col-lg-10 col-9">
                {{ result.data?.test?.referensi_diklat }}
              </div>
            </div>
            <div class="row">
              <div class="col-lg-2 col-3 fw-bold">Tanggal</div>
              <div class="col-lg-10 col-9">
                {{ result.data?.test?.tgl_f }}
              </div>
            </div>
            <div class="row">
              <div class="col-lg-2 col-3 fw-bold">Mulai</div>
              <div class="col-lg-10 col-9">
                {{ result.data?.test?.by_zona?.mulai }}
              </div>
            </div>
            <div class="row">
              <div class="col-lg-2 col-3 fw-bold">Selesai</div>
              <div class="col-lg-10 col-9">
                {{ result.data?.test?.by_zona?.selesai }}
              </div>
            </div>
            <div class="row">
              <div class="col-lg-2 col-3 fw-bold">Zona</div>
              <div class="col-lg-10 col-9 text-uppercase">
                {{ result.data?.test?.zona }}
              </div>
            </div>
            <div class="row mt-3">
              <div
                class="col-lg-12 col-12"
                v-html="result.data?.test?.deskripsi"
              ></div>
            </div>
          </div>
        </div>
        <div class="row px-2">
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead class="bg-info-1 text-white">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Email</th>
                  <th scope="col">Peran</th>
                  <th scope="col">Grup</th>
                  <th scope="col">Nilai</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody v-if="result.loading">
                <tr>
                  <td colspan="7" class="text-center">
                    <Spinner :color="'dark'" />
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr v-if="result.data?.peserta?.length < 1">
                  <td colspan="7" class="text-center">Tidak ada data</td>
                </tr>
                <tr v-for="(data, i) in result.data?.peserta" :key="i">
                  <th scope="row">{{ i + 1 }}</th>
                  <td>
                    {{ data.nm_pengguna }}
                  </td>
                  <td>
                    {{ data.email }}
                  </td>
                  <td>
                    {{ data.role }}
                  </td>
                  <td>
                    {{ data.name }}
                  </td>
                  <td>
                    {{
                      data.total_jawaban == 0
                        ? "Belum Dikerjakan"
                        : data.total_jawaban == data.dinilai
                        ? `${Math.round((data.nilai / data.bobot) * 100)} / 100`
                        : "Menunggu Penilaian"
                    }}
                  </td>
                  <td>
                    <div class="d-flex">
                      <router-link
                        :to="{
                          name: 'dashboard-lsp-panitia-test-nilai-input',
                          params: {
                            id_test: route.params.id_test,
                            table: route.params.table,
                            id_peserta: data.id,
                          },
                        }"
                        class="btn btn-sm rounded-2 btn-success"
                        v-if="data.total_jawaban != 0"
                      >
                        <i class="fas fa-play"></i>
                      </router-link>
                      <button
                        class="btn btn-sm rounded-2 btn-success"
                        disabled
                        v-else
                      >
                        <i class="fas fa-play"></i>
                      </button>
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
</template>
