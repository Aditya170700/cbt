<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import bg from "@/assets/static/bg-1.png";
import logo from "@/assets/img/cbt-logo.png";
import qr from "@/assets/static/qrcode.png";
import { onMounted, reactive, ref } from "vue";
import Spinner from "@/components/Spinner.vue";
import { appStore } from "@/stores/app";
import axios from "axios";
import { alertError, alertSuccess } from "@/assets/js/utils";
import { useRouter } from "vue-router";
import { VueRecaptcha } from "vue-recaptcha";

let router = useRouter();
const storeApp = appStore();
let verifyCaptcha = ref(false);
let receiveNotif = ref(false);
let form = reactive({
  username: "",
  password: "",
  loading: false,
  errors: null,
});

onMounted(() => {
  document.title = "LOGIN | CBT Pusbang Laut";

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      receiveNotif.value = true;
    }
  });
});

function submit() {
  form.loading = true;
  axios
    .post(
      `${storeApp.baseurl}cbt/auth/login`,
      {
        username: form.username,
        password: form.password,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      form.loading = false;
      let r = null;
      switch (res.data.data.role) {
        case "administrator-pelatihan":
          alertSuccess(res.data.message);
          localStorage.setItem(
            "tokenAdministratorPelatihan",
            res.data.data.token
          );
          localStorage.setItem(
            "userAdministratorPelatihan",
            res.data.data.user
          );
          r = router.resolve({ name: "administrator" });
          window.location.href = r.href;
          break;
        case "admin-lemdik":
          alertSuccess(res.data.message);
          localStorage.setItem("tokenAdminLemdik", res.data.data.token);
          localStorage.setItem("userAdminLemdik", res.data.data.user);
          r = router.resolve({
            name: "dashboard-non-pnbp-admin-lemdik",
            params: {
              id_lemdik: JSON.parse(res.data.data.user).id_lemdik,
            },
          });
          window.location.href = r.href;
          break;
        case "peserta":
          alertSuccess(res.data.message);
          localStorage.setItem("tokenPeserta", res.data.data.token);
          localStorage.setItem("userPeserta", res.data.data.user);
          r = router.resolve({ name: "peserta" });
          window.location.href = r.href;
          break;
        case "instruktur":
          alertSuccess(res.data.message);
          localStorage.setItem("tokenInstruktur", res.data.data.token);
          localStorage.setItem("userInstruktur", res.data.data.user);
          r = router.resolve({ name: "instruktur" });
          window.location.href = r.href;
          break;
        case "panitia":
          alertSuccess(res.data.message);
          localStorage.setItem("tokenPanitia", res.data.data.token);
          localStorage.setItem("userPanitia", res.data.data.user);
          r = router.resolve({ name: "panitia" });
          window.location.href = r.href;
          break;
        default:
          alertError("Role tidak ditemukan");
          break;
      }
    })
    .catch((err) => {
      form.loading = false;
      alertError(err.response.data.message);
      if (err.response.status === 422) {
        form.errors = err.response.data.errors;
      }
    });
}

function verify() {
  verifyCaptcha.value = true;
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
            style="max-width: 1100px; top: 120px; left: 120px"
          >
            <div class="col-lg-7 bg-white p-5 text-center rounded-2">
              <div class="h5">SELAMAT DATANG PADA</div>
              <div class="h5">SIM - PEL PPSDMPL</div>
              <form @submit.prevent="submit">
                <div class="row px-5 mt-3 text-start">
                  <div class="col-12">
                    <div class="mb-3 px-5">
                      <label for="username" class="form-label small"
                        >Username/Email</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="username"
                        v-model="form.username"
                      />
                      <div
                        class="form-text small text-danger"
                        v-if="form.errors?.username"
                      >
                        {{ form.errors?.username[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="mb-3 px-5">
                      <label for="password" class="form-label small"
                        >Password</label
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
                      <vue-recaptcha
                        :sitekey="storeApp.captchaKey"
                        :loadRecaptchaScript="true"
                        @verify="verify"
                      ></vue-recaptcha>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="mb-3 px-5 d-flex justify-content-between">
                      <router-link
                        :to="{ name: 'auth-forgot-password' }"
                        class="text-decoration-none"
                        >Forgot password?</router-link
                      >
                      <button
                        class="btn btn-sm bg-info-1 rounded-2 text-white"
                        type="submit"
                        :disabled="form.loading || !verifyCaptcha"
                      >
                        <Spinner v-if="form.loading" />
                        <span v-else>Sign In</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div
              class="col-lg-5 text-white p-4 d-flex align-items-center position-relative"
            >
              <div class="row text-center">
                <div class="col-12">
                  <img :src="logo" alt="Logo" style="width: 60%" class="mb-3" />
                </div>
                <div class="col-12">
                  <div class="h6 fw-light">SISTEM PELAPORAN PPSDMPL</div>
                </div>
                <img
                  :src="qr"
                  alt="Logo"
                  style="width: 25%; bottom: 5%; right: 5%"
                  class="position-absolute"
                />
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
            class="row bg-info-1 position-absolute text-dark"
            style="max-width: 90%; top: 20px; left: 30px"
          >
            <div class="col-12 bg-white py-5 text-center">
              <div class="h5">SELAMAT DATANG PADA</div>
              <div class="h5">SIM - PEL PPSDMPL</div>
              <div class="row mt-3 text-start">
                <div class="col-12">
                  <div class="mb-3 px-3">
                    <label for="username" class="form-label small"
                      >Username/Email</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="username"
                      v-model="form.username"
                    />
                    <div
                      class="form-text small text-danger"
                      v-if="form.errors?.username"
                    >
                      {{ form.errors?.username[0] }}
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3 px-3">
                    <label for="password" class="form-label small"
                      >Password</label
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
                  <div class="mb-3 px-3">
                    <vue-recaptcha
                      :sitekey="storeApp.captchaKey"
                      :loadRecaptchaScript="true"
                      @verify="verify"
                    ></vue-recaptcha>
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3 px-3 d-flex justify-content-between">
                    <router-link
                      :to="{ name: 'auth-forgot-password' }"
                      class="text-decoration-none"
                      >Forgot password?</router-link
                    >
                    <button
                      @click.prevent="submit()"
                      class="btn btn-sm bg-info-1 text-white rounded-2"
                      :disabled="form.loading || !verifyCaptcha"
                    >
                      <Spinner v-if="form.loading" />
                      <span v-else>Sign In</span>
                    </button>
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
                <div class="col-12">
                  <img :src="qr" alt="Logo" style="width: 25%" class="mb-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
