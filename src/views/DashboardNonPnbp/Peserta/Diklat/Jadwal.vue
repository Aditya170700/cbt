<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/Sidebar.vue";
import { appStore } from "@/stores/app";
import Spinner from "@/components/Spinner.vue";
import { onBeforeMount, reactive } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const storeApp = appStore();
let widthContent = window.innerWidth;
let route = useRoute();
let result = reactive({
  data: [],
  loading: false,
});

onBeforeMount(() => {
  fetchData();
});

function fetchData() {
  result.loading = true;
  axios
    .get(
      `${storeApp.baseurl}cbt/non-pnbp/peserta/diklat/${route.params.id_diklat}/jadwal`,
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
</script>

<template>
  <div class="dashboard">
    <Sidebar />
    <div
      :class="`main-content content ${widthContent > 992 ? '' : 'hide'} mb-5`"
    >
      <div class="container p-lg-4">
        <div class="d-flex px-2 mb-4 justify-content-between">
          <div class="h4 fw-bold">Jadwal Diklat</div>
          <div>
            <router-link
              class="btn btn-sm btn-light rounded-2"
              :to="{ name: 'dashboard-non-pnbp-peserta-diklat' }"
              ><i class="fas fa-arrow-left me-2"></i> Kembali</router-link
            >
          </div>
        </div>
        <div class="row px-2" v-if="result.loading">
          <div class="col-lg-12 text-center">
            <Spinner :color="'dark'" />
          </div>
        </div>
        <div class="row px-2" v-else>
          <div class="col-2 fw-bold">Jenis Diklat</div>
          <div class="col-10">
            :
            {{
              result.data?.jenis_diklat_referensi_diklat?.jenis_diklat?.parent
                ?.name
            }}
            /
            {{ result.data?.jenis_diklat_referensi_diklat?.jenis_diklat?.name }}
          </div>
          <div class="col-2 fw-bold">Program Diklat</div>
          <div class="col-10">
            :
            {{
              result.data?.jenis_diklat_referensi_diklat?.referensi_diklat?.name
            }}
          </div>
          <div class="col-2 fw-bold">Pelaksanaan</div>
          <div class="col-10">
            : {{ result.data?.tgl_penerbitan }} s.d
            {{ result.data?.tgl_berakhir }}
          </div>
          <div class="col-12">
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead class="bg-info-1 text-white">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Judul</th>
                    <th scope="col">Tanggal Mulai</th>
                    <th scope="col">Tanggal Selesai</th>
                    <th scope="col">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="result.data?.jadwal_diklat < 1">
                    <td colspan="6" class="text-center">Tidak ada data</td>
                  </tr>
                  <tr v-for="(data, i) in result.data?.jadwal_diklat" :key="i">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>
                      {{ data.header ?? "-" }}
                    </td>
                    <td>
                      {{ data.tgl_mulai }}
                    </td>
                    <td>
                      {{ data.tgl_selesai }}
                    </td>
                    <td>
                      <div class="d-flex">
                        <router-link
                          :to="{
                            name: 'dashboard-non-pnbp-peserta-diklat-jadwal-test',
                            params: {
                              id_diklat: route.params.id_diklat,
                              id_jadwal: data.id,
                            },
                          }"
                          class="btn btn-sm bg-info-1 rounded-2 text-white"
                        >
                          <i class="fas fa-play"></i>
                        </router-link>
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
  </div>
</template>
