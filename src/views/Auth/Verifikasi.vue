<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, reactive } from "vue";
import { appStore } from "@/stores/app";
import { useRoute, useRouter } from "vue-router";
import { alertError, alertSuccess } from "@/assets/js/utils";
import axios from "axios";
import Spinner from "@/components/Spinner.vue";

onMounted(() => {
  document.title = "Verifikasi Akun | SIMPEL Pusbang Laut";

  if (!route.query.token) {
    alertError("Link tidak valid");
    router.push({
      name: "auth",
    });
  }

  form.token = route.query.token;

  submit();
});

const storeApp = appStore();
let route = useRoute();
let router = useRouter();
let form = reactive({
  token: "",
  loading: false,
  errors: null,
});

function submit() {
  form.errors = null;
  form.loading = true;
  axios
    .post(`${storeApp.baseurl}cbt/auth/verifikasi`, form, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      alertSuccess("Berhasil melakukan verifikasi, silahkan login");
      form.loading = false;
      router.push({
        name: "auth",
      });
    })
    .catch((err) => {
      form.loading = false;
      alertError(err.response?.data?.message);
      if (err.response.status === 422) {
        form.errors = err.response.data.errors;
      }
    });
}
</script>

<template>
  <div>
    <div class="position-relative">
      <div
        class="position-absolute text-center d-none d-lg-block"
        style="top: 300px; left: 600px; max-width: 500px"
      >
        <div>
          <Spinner :color="'dark'" />
        </div>
        <div class="small">Memverifikasi akun, mohon tunggu sebentar...</div>
      </div>
      <div
        class="position-absolute text-center d-lg-none"
        style="top: 300px; left: 70px; max-width: 300px"
      >
        <div>
          <Spinner :color="'dark'" />
        </div>
        <div class="small">Memverifikasi akun, mohon tunggu sebentar...</div>
      </div>
    </div>
  </div>
</template>
