<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/SidebarNonPnbp/AdminLemdik.vue";
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { appStore } from "@/stores/app";
import { alertError, alertSuccess } from "@/assets/js/utils";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import axios from "axios";
import Spinner from "@/components/Spinner.vue";

let widthContent = window.innerWidth;
const storeApp = appStore();
let route = useRoute();
let router = useRouter();
let form = reactive({
  pertanyaan: "",
  tipe: "Essay",
  loading: false,
  errors: null,
});

function quillReady() {
  document.querySelector(".ql-link").remove();
}

function submit() {
  form.loading = true;

  axios
    .post(
      `${storeApp.baseurl}cbt/non-pnbp/admin-lemdik/${route.params.id_lemdik}/soal`,
      form,
      {
        headers: {
          Authorization: `Bearer ${storeApp.tokenAdminLemdik}`,
        },
      }
    )
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      form.loading = false;
      alertSuccess(res.data.message);
      router.push({
        name: "dashboard-non-pnbp-admin-lemdik-soal",
        params: {
          id_lemdik: route.params.id_lemdik,
        },
      });
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
        <div class="d-flex px-2 mb-3 justify-content-between">
          <div class="col-6 col-lg-6 text-start mb-3">
            <div class="h4 fw-bold">Buat Soal Essay</div>
          </div>
          <div class="col-6 text-end">
            <router-link
              :to="{
                name: 'dashboard-non-pnbp-admin-lemdik-soal',
                params: {
                  id_lemdik: route.params.id_lemdik,
                },
              }"
              class="btn btn-sm btn-outline-secondary rounded-2 px-3 mb-2"
            >
              <i class="fas fa-arrow-left me-2"></i>Kembali
            </router-link>
          </div>
        </div>
        <form @submit.prevent="submit">
          <div class="row px-2">
            <div class="col-lg-12">
              <div class="mb-3">
                <label for="description" class="form-label">Pertanyaan</label>
                <QuillEditor
                  theme="snow"
                  v-model:content="form.pertanyaan"
                  ref="quill"
                  contentType="html"
                  style="height: 300px"
                  toolbar="full"
                  @ready="quillReady"
                />
                <div
                  class="form-text small text-danger"
                  v-if="form.errors?.pertanyaan"
                >
                  {{ form.errors?.pertanyaan[0] }}
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <button
                class="btn bg-info-1 btn-sm d-flex justify-content-between align-items-center rounded-2 text-white"
                :disabled="form.loading"
              >
                <span v-if="form.loading"><Spinner /></span>
                <span v-else><i class="fas fa-save me-2"></i>Simpan</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
