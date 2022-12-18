<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/Sidebar/Panitia.vue";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { appStore } from "@/stores/app";
import { alertError, alertSuccess, confirmation } from "@/assets/js/utils";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import axios from "axios";
import Spinner from "@/components/Spinner.vue";

let widthContent = window.innerWidth;
const storeApp = appStore();
let router = useRouter();
let route = useRoute();
let option = ref("");
let quill = ref(null);
let form = reactive({
  pertanyaan: "",
  share: false,
  tipe: "Multiple Choice",
  options: [],
  submitLoading: false,
  loading: false,
  errors: null,
});

onMounted(() => {
  form.loading = true;

  axios
    .get(`${storeApp.baseurl}cbt/panitia/soal/${route.params.id_soal}/show`, {
      headers: {
        Authorization: `Bearer ${storeApp.tokenPanitia}`,
      },
    })
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      form.loading = false;
      form.pertanyaan = res.data.data.pertanyaan;
      form.share = res.data.data.share;
      form.options = res.data.data.options;
      quill.value.setHTML(res.data.data.pertanyaan);
    })
    .catch((err) => {
      form.loading = false;
      console.log(err);
    });
});

function quillReady() {
  document.querySelector(".ql-link").remove();
}

function addOption() {
  let valid = true;
  let kunci = "N";

  if (form.options.length == 0) {
    kunci = "Y";
  }

  if (option.value === "") {
    valid = false;
  }

  if (valid) {
    form.options.push({ value: option.value, kunci });
    option.value = "";
    return;
  }

  alertError("Please fill the option");
}

function submit() {
  form.submitLoading = true;

  axios
    .put(
      `${storeApp.baseurl}cbt/panitia/soal/${route.params.id_soal}/update`,
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
      router.push({ name: "dashboard-panitia-soal" });
    })
    .catch((err) => {
      form.submitLoading = false;
      alertError(err.response.data.message);
      if (err.response.status == 422) {
        form.errors = err.response.data.errors;
      }
    });
}

function destroyOpsi(data, iopt) {
  confirmation("Yakin hapus data ini?").then((confirmed) => {
    if (confirmed) {
      data.loading = true;
      axios
        .delete(
          `${storeApp.baseurl}cbt/panitia/soal/${route.params.id_soal}/destroy-opsi/${data.id}`,
          {
            headers: {
              Authorization: `Bearer ${storeApp.tokenPanitia}`,
            },
          }
        )
        .then((res) => {
          if (res.data.code_response != 200) throw new Error(res.data.message);
          data.loading = false;
          alertSuccess(res.data.message);
          form.options.splice(iopt, 1);
        })
        .catch((err) => {
          data.loading = false;
          alertError(err.response.data.message);
        });
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
            <div class="h4 fw-bold">Ubah Soal Multiple Choice</div>
          </div>
          <div class="col-6 text-end">
            <router-link
              :to="{ name: 'dashboard-panitia-soal' }"
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
                <label for="option">Jawaban</label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="add-option"
                    v-model="option"
                  />
                  <button
                    class="btn btn-success"
                    type="button"
                    id="add-option"
                    @click.prevent="addOption"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <div
                  class="form-text small text-danger"
                  v-if="form.errors?.options"
                >
                  {{ form.errors?.options[0] }}
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label>Pilihan Jawaban</label>
                <ul class="list-group">
                  <li
                    class="list-group-item text-danger"
                    v-if="form.options.length <= 0"
                  >
                    Belum ada jawaban
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center"
                    v-for="(opt, iopt) in form.options"
                    :key="iopt"
                  >
                    <div class="col-8">
                      {{ opt.value }}
                    </div>
                    <div>
                      <button
                        :class="`btn btn-sm btn${
                          opt.kunci == 'Y' ? '' : '-outline'
                        }-success rounded-4 me-1`"
                        @click.prevent="
                          () => {
                            form.options.forEach((opt) => {
                              opt.kunci = 'N';
                            });
                            form.options[iopt].kunci = 'Y';
                          }
                        "
                      >
                        <i class="fas fa-key"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-danger rounded-4 me-1"
                        @click.prevent="destroyOpsi(opt, iopt)"
                        v-if="opt.id"
                      >
                        <Spinner v-if="opt.loading" /><i
                          class="fas fa-trash"
                          v-else
                        ></i>
                      </button>
                      <button
                        v-else
                        class="btn btn-sm btn-danger rounded-4 me-1"
                        @click.prevent="form.options.splice(iopt, 1)"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </li>
                </ul>
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
