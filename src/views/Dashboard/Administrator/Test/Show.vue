<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/Sidebar.vue";
import { appStore } from "@/stores/app";
import Spinner from "@/components/Spinner.vue";
import { onBeforeMount, reactive } from "vue";
import axios from "axios";

const storeApp = appStore();
let widthContent = window.innerWidth;
let result = reactive({
  data: [],
  meta: null,
  loading: true,
});

onBeforeMount(() => {
  axios
    .get(`${storeApp.baseurl}cbt/admin-pusbang/test/list`, {
      headers: {
        Authorization: `Bearer ${storeApp.token}`,
      },
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
});
</script>

<template>
  <div class="dashboard">
    <Sidebar />
    <div
      :class="`main-content content ${widthContent > 992 ? '' : 'hide'} mb-5`"
    >
      <div class="container p-lg-4">
        <div class="d-flex px-2 mb-4 justify-content-between">
          <div class="h4 fw-bold">Detail Test</div>
          <div>
            <router-link
              :to="{ name: 'dashboard-administrator-test' }"
              class="btn btn-sm btn-light rounded-2"
            >
              <i class="fas fa-arrow-left me-2"></i>Kembali</router-link
            >
          </div>
        </div>
        <div class="row px-2" v-if="result.loading">
          <div class="col-lg-12 text-center"><Spinner :color="'dark'" /></div>
        </div>
        <div class="row px-2" v-else>
          <div class="col-lg-4 mb-4" v-for="i in 12" :key="i">
            <div class="card rounded-4 shadow border">
              <div class="card-body rounded-4 p-4">
                <div class="h6 fw-bold">Pre Test 1</div>
                <div class="small mb-3">13 January 2022</div>
                <p class="four-line">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  explicabo ab quas natus ipsam est numquam, quia esse facilis
                  doloribus quasi itaque assumenda. Nemo ducimus minima
                  provident quo voluptatum ratione!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
