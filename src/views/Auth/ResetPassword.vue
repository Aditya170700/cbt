<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import bg from "@/assets/static/bg-1.png";
import logo from "@/assets/img/cbt-logo.png";
import { onMounted, reactive } from "vue";
import { appStore } from "@/stores/app";
import { useRoute, useRouter } from "vue-router";
import { alertError, alertSuccess } from "@/assets/js/utils";
import axios from "axios";
import Spinner from "@/components/Spinner.vue";

onMounted(() => {
  document.title = "Forgot Password | SIMPEL Pusbang Laut";

  if (!route.query.token) {
    alertError("Link tidak valid");
    router.push({
      name: "auth-forgot-password",
    });
  }

  form.token = route.query.token;

  checkToken();
});

const storeApp = appStore();
let route = useRoute();
let router = useRouter();
let form = reactive({
  token: "",
  password: "",
  password_confirmation: "",
  loading: false,
  errors: null,
  check: {
    loading: false,
    username: null,
    valid: true,
  },
});

function checkToken() {
  form.check.loading = true;
  form.check.username = null;
  axios
    .post(`${storeApp.baseurl}cbt/auth/check-token`, form, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      form.check.loading = false;
      form.check.username = res.data.data;
    })
    .catch((err) => {
      form.check.loading = false;
      form.check.valid = false;
      alertError(err.response?.data?.message);
    });
}

function submit() {
  form.errors = null;
  form.loading = true;
  axios
    .post(`${storeApp.baseurl}cbt/auth/reset-password`, form, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      alertSuccess("Berhasil ubah password, silahkan login");
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
    <div
      :style="`background-image: url('${bg}'); top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; position: fixed; background-size: cover; background-position: center;`"
      class="d-none d-lg-block"
    >
      <div
        :style="`background-color: rgba(0, 0, 0, 0.6); top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; position: fixed;`"
      >
        <div class="container position-relative">
          <div
            class="row bg-info-1 position-absolute rounded-2 text-dark"
            style="max-width: 1100px; top: 170px; left: 120px"
          >
            <div class="col-lg-7 bg-white p-5 rounded-2">
              <div class="row px-5 text-start">
                <div class="col-12 mb-3">
                  <div class="h6 px-5">Ubah Password</div>
                  <div class="p px-5 small">
                    Silahkan masukkan password anda yang baru
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3 px-5">
                    <label for="password" class="form-label small"
                      >Username</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="password"
                      v-model="form.check.username"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3 px-5">
                    <label for="password" class="form-label small"
                      >New Password</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      v-model="form.password"
                    />
                    <div
                      class="form-text small text-danger"
                      v-if="form.errors?.password"
                    >
                      {{ form.errors?.password[0] }}
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3 px-5">
                    <label for="confirm-password" class="form-label small"
                      >Confirm Password</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="confirm-password"
                      v-model="form.password_confirmation"
                    />
                    <div
                      class="form-text small text-danger"
                      v-if="form.errors?.password_confirmation"
                    >
                      {{ form.errors?.password_confirmation[0] }}
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-grid mb-3 px-5">
                    <button
                      class="btn bg-info-1 text-white"
                      @click="submit"
                      :disabled="form.loading"
                    >
                      <Spinner v-if="form.loading" /><span v-else
                        >Simpan Password Baru</span
                      >
                    </button>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-grid mb-3 px-5">
                    <router-link
                      class="btn btn-light"
                      :to="{ name: 'auth-forgot-password' }"
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
        <div class="container position-relative">
          <div
            class="row bg-info text-white position-absolute"
            style="max-width: 90%; top: 130px; left: 30px"
          >
            <div class="col-lg-7 bg-white p-5">
              <div class="row text-start">
                <div class="col-12 mb-3">
                  <div class="h6">Ubah Password</div>
                  <div class="p small">
                    Silahkan masukkan password anda yang baru
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3">
                    <label for="password" class="form-label small"
                      >New Password</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      v-model="form.password"
                    />
                    <div
                      class="form-text small text-danger"
                      v-if="form.errors?.password"
                    >
                      {{ form.errors?.password[0] }}
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3">
                    <label for="confirm-password" class="form-label small"
                      >Confirm Password</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="confirm-password"
                      v-model="form.password_confirmation"
                    />
                    <div
                      class="form-text small text-danger"
                      v-if="form.errors?.password_confirmation"
                    >
                      {{ form.errors?.password_confirmation[0] }}
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
                        >Simpan Password Baru</span
                      >
                    </button>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-grid mb-3">
                    <router-link
                      class="btn btn-light"
                      :to="{ name: 'auth-forgot-password' }"
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
  </div>
</template>
