<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import logo from "@/assets/img/cbt-logo.png";
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

      if (res.data.data.redirect) {
        window.location.href = res.data.data.redirect;
        return;
      }

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
            name: "dashboard-non-pnbp-admin-lemdik-test",
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
  <section id="cover" class="min-vh-100 bg-info-1">
    <div id="cover-caption">
      <div class="container">
        <div class="row text-white">
          <div
            class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4"
          >
            <div class="px-2 py-5">
              <div class="row">
                <div class="col-12 text-center mb-5">
                  <img
                    :src="logo"
                    alt=""
                    class="img-fluid"
                    style="width: 70%"
                  />
                </div>
                <form @submit.prevent="submit" class="justify-content-center">
                  <div class="col-12 text-start">
                    <div class="form-group">
                      <label class="sr-only">Username / Email</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Username / Email"
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
                  <div class="col-12 text-start">
                    <div class="form-group">
                      <label class="sr-only">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
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
                    <vue-recaptcha
                      :sitekey="storeApp.captchaKey"
                      :loadRecaptchaScript="true"
                      @verify="verify"
                    ></vue-recaptcha>
                  </div>
                  <div class="col-12 mt-5 mb-4">
                    <div class="d-grid">
                      <button
                        type="submit"
                        class="btn btn-light"
                        :disabled="form.loading || !verifyCaptcha"
                      >
                        <Spinner :color="'dark'" v-if="form.loading" />
                        <span v-else>Sign In</span>
                      </button>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-flex justify-content-between">
                      <a href="#" class="text-decoration-none text-white"
                        >FAQ</a
                      >
                      <router-link
                        :to="{ name: 'auth-forgot-password' }"
                        class="text-decoration-none text-white"
                        >Lupa password?</router-link
                      >
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
