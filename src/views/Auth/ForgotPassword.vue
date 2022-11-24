<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import bg from "@/assets/static/bg-1.png";
import logo from "@/assets/static/logo-1.png";
import { onMounted, reactive } from "vue";
import Spinner from "@/components/Spinner.vue";
import { appStore } from "@/stores/app";
import axios from "axios";
import { alertError, alertSuccess } from "@/assets/js/utils";

onMounted(() => {
  document.title = "Forgot Password | SIMPEL Pusbang Laut";
});

const storeApp = appStore();
let form = reactive({
  email: "",
  loading: false,
  errors: null,
});

function submit() {
  form.errors = null;
  form.loading = true;
  axios
    .post(`${storeApp.baseurl}auth/forgot-password`, form, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      alertSuccess("Link ubah password telah dikirim");
      form.loading = false;
      form.email = "";
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
    <div
      :style="`background-image: url('${bg}'); top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; position: fixed; background-size: cover; background-position: center;`"
      class="d-none d-lg-block"
    >
      <div
        :style="`background-color: rgba(0, 0, 0, 0.6); top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; position: fixed;`"
      >
        <div class="container position-relative">
          <div
            class="row bg-purple position-absolute rounded-2"
            style="max-width: 1100px; top: 200px; left: 120px"
          >
            <div class="col-lg-7 bg-white p-5 rounded-2">
              <div class="row px-5 text-start">
                <div class="col-12 mb-3">
                  <div class="h6 px-5">Lupa Password</div>
                  <div class="p px-5 small">
                    Silahkan masukkan email anda, dan kami akan mengirimkan
                    instruksi untuk mereset password
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3 px-5">
                    <label for="email" class="form-label small">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      v-model="form.email"
                    />
                    <div
                      class="form-text small text-danger"
                      v-if="form.errors?.email"
                    >
                      {{ form.errors?.email[0] }}
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-grid mb-3 px-5">
                    <button
                      class="btn bg-blue"
                      @click="submit"
                      :disabled="form.loading"
                    >
                      <Spinner v-if="form.loading" /><span v-else
                        >Kirim Link Lupa Password</span
                      >
                    </button>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-grid mb-3 px-5">
                    <router-link
                      class="btn btn-light"
                      :to="{ name: 'auth-login' }"
                    >
                      <i class="fas fa-angle-left me-2"></i>Kembali
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-5 text-white p-4 d-flex align-items-center">
              <div class="row text-center">
                <div class="col-12">
                  <img :src="logo" alt="Logo" style="width: 60%" class="mb-3" />
                </div>
                <div class="col-12">
                  <div class="h6 fw-light">SISTEM PELAPORAN PPSDMPL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      :style="`background-image: url('${bg}'); top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; position: fixed; background-size: cover; background-position: center;`"
      class="d-lg-none"
    >
      <div
        :style="`background-color: rgba(0, 0, 0, 0.6); top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; position: fixed;`"
      >
        <div class="position-relative">
          <div
            class="row bg-purple position-absolute"
            style="max-width: 90%; top: 150px; left: 30px"
          >
            <div class="col-12 bg-white p-5">
              <div class="row text-start">
                <div class="col-12 mb-3">
                  <div class="h6">Lupa Password</div>
                  <div class="p small">
                    Silahkan masukkan email anda, dan kami akan mengirimkan
                    instruksi untuk mereset password
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3">
                    <label for="email" class="form-label small">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      v-model="form.email"
                    />
                    <div
                      class="form-text small text-danger"
                      v-if="form.errors?.email"
                    >
                      {{ form.errors?.email[0] }}
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-grid mb-3">
                    <button
                      class="btn bg-blue"
                      @click="submit"
                      :disabled="form.loading"
                    >
                      <Spinner v-if="form.loading" /><span v-else
                        >Kirim Link Lupa Password</span
                      >
                    </button>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-grid mb-3">
                    <router-link
                      class="btn btn-light"
                      :to="{ name: 'auth-login' }"
                    >
                      <i class="fas fa-angle-left me-2"></i>Kembali
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 text-white p-4 d-flex align-items-center">
              <div class="row text-center">
                <div class="col-12">
                  <img :src="logo" alt="Logo" style="width: 60%" class="mb-3" />
                </div>
                <div class="col-12">
                  <div class="h6 fw-light">SISTEM PELAPORAN PPSDMPL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
