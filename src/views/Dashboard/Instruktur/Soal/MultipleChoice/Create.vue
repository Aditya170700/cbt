<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/Sidebar/Instruktur.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { appStore } from "@/stores/app";
import { alertError, alertSuccess } from "@/assets/js/utils";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import axios from "axios";
import Spinner from "@/components/Spinner.vue";

let widthContent = window.innerWidth;
const storeApp = appStore();
let router = useRouter();
let option = ref("");
let form = reactive({
  pertanyaan: "",
  tipe: "Multiple Choice",
  options: [],
  loading: false,
  errors: null,
});

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
  form.loading = true;

  axios
    .post(`${storeApp.baseurl}cbt/instruktur/soal`, form, {
      headers: {
        Authorization: `Bearer ${storeApp.tokenInstruktur}`,
      },
    })
    .then((res) => {
      if (res.data.code_response != 200) throw new Error(res.data.message);
      form.loading = false;
      alertSuccess(res.data.message);
      router.push({ name: "dashboard-instruktur-soal" });
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
            <div class="h4 fw-bold">Buat Soal Multiple Choice</div>
          </div>
          <div class="col-6 text-end">
            <router-link
              :to="{ name: 'dashboard-instruktur-soal' }"
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
                <label for="option">Masukkan Opsi</label>
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
                <label>Opsi</label>
                <ul class="list-group">
                  <li
                    class="list-group-item text-danger"
                    v-if="form.options.length <= 0"
                  >
                    Belum ada opsi
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
                        }-primary rounded-4 me-1`"
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
