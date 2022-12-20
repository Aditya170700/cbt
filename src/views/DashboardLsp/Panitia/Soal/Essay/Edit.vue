<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/SidebarLsp/Panitia.vue";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { appStore } from "@/stores/app";
import { alertError, alertSuccess } from "@/assets/js/utils";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import axios from "axios";
import Spinner from "@/components/Spinner.vue";

let widthContent = window.innerWidth;
const storeApp = appStore();
let router = useRouter();
let route = useRoute();
let quill = ref(null);
let kategori = ref([]);
let form = reactive({
  pertanyaan: "",
  kategori: "",
  share: false,
  tipe: "Essay",
  submitLoading: false,
  loading: false,
  errors: null,
});

onMounted(() => {
  form.loading = true;

  axios
    .get(
      `${storeApp.baseurl}cbt/lsp/panitia/soal/${route.params.id_soal}/show`,
      {
        headers: {
          Authorization: `Bearer ${storeApp.tokenPanitia}`,
        },
      }
    )
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      form.loading = false;
      form.pertanyaan = res.data.data.pertanyaan;
      form.share = res.data.data.share;
      form.kategori = res.data.data.kategori;
      quill.value.setHTML(res.data.data.pertanyaan);
    })
    .catch((err) => {
      form.loading = false;
      console.log(err);
    });

  axios
    .get(`${storeApp.baseurl}cbt/auth/other/kategori-pertanyaan`)
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      kategori.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

function quillReady() {
  document.querySelector(".ql-link").remove();
}

function submit() {
  form.submitLoading = true;

  axios
    .put(
      `${storeApp.baseurl}cbt/lsp/panitia/soal/${route.params.id_soal}/update`,
      form,
      {
        headers: {
          Authorization: `Bearer ${storeApp.tokenPanitia}`,
        },
      }
    )
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      form.submitLoading = false;
      alertSuccess(res.data.message);
      router.push({ name: "dashboard-lsp-panitia-soal" });
    })
    .catch((err) => {
      form.submitLoading = false;
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
            <div class="h4 fw-bold">Ubah Soal Essay</div>
          </div>
          <div class="col-6 text-end">
            <router-link
              :to="{ name: 'dashboard-lsp-panitia-soal' }"
              class="btn btn-sm btn-outline-secondary rounded-2 px-3 mb-2"
            >
              <i class="fas fa-arrow-left me-2"></i>Kembali
            </router-link>
          </div>
        </div>
        <form @submit.prevent="submit">
          <div class="row px-2" v-if="form.loading">
            <div class="col-lg-12 text-center">
              <Spinner :color="'dark'" />
            </div>
          </div>
          <div class="row px-2" v-else>
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
                  :modules="[storeApp.imageUploader, storeApp.blotFormatter]"
                />
                <div
                  class="form-text small text-danger"
                  v-if="form.errors?.pertanyaan"
                >
                  {{ form.errors?.pertanyaan[0] }}
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-check-label" for="kategori">
                  Kategori
                </label>
                <input
                  class="form-control"
                  type="text"
                  v-model="form.kategori"
                  id="kategori"
                  list="kategori-list"
                  style="text-transform: uppercase"
                />
                <datalist id="kategori-list">
                  <option :value="data" v-for="data in kategori" :key="data">
                    {{ data }}
                  </option>
                </datalist>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.share"
                    id="share"
                  />
                  <label class="form-check-label" for="share">
                    Share soal
                  </label>
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <button
                class="btn bg-info-1 btn-sm d-flex justify-content-between align-items-center rounded-2 text-white"
                :disabled="form.submitLoading"
              >
                <span v-if="form.submitLoading"><Spinner /></span>
                <span v-else><i class="fas fa-save me-2"></i>Simpan</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
