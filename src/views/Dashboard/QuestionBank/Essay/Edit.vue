<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/Sidebar.vue";
import { reactive, ref } from "vue";
import Cropper from "vue-image-crop-upload";
import { useRouter } from "vue-router";
import { alertSuccess, clearBase64 } from "../../../../assets/js/utils";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

let widthContent = window.innerWidth;
let router = useRouter();
let coverPreview = ref(null);
let showCoverCroper = ref(false);
let form = reactive({
  cover: "",
  question: "",
  score: 1,
  loading: false,
});

function cropCoverSuccess(imgDataUrl) {
  form.cover = clearBase64(imgDataUrl);
  coverPreview.value = imgDataUrl;
}

function showModalCoverCroper() {
  showCoverCroper.value = true;
  if (widthContent < 500) {
    document.querySelector(".vicp-wrap").style.width = "80%";
  }
}

function submit() {
  form.loading = true;

  setTimeout(() => {
    form.loading = false;
    alertSuccess("Question created successfully");
    router.push({ name: "dashboard-question-bank" });
  }, 3000);
}
</script>

<template>
  <div class="dashboard">
    <Sidebar />
    <div
      :class="`main-content content ${widthContent > 992 ? '' : 'hide'} mb-5`"
    >
      <div class="container p-lg-4">
        <div class="d-flex px-2 mb-4 justify-content-between">
          <div class="col-6 col-lg-6 text-start mb-3">
            <div class="h4 fw-bold">EDIT QUESTION ESSAY</div>
          </div>
          <div class="col-6 text-end">
            <router-link
              :to="{ name: 'dashboard-question-bank' }"
              class="btn btn-sm btn-outline-secondary rounded-4 px-3 mb-2"
            >
              <i class="fas fa-arrow-left me-2"></i>BACK
            </router-link>
          </div>
        </div>
        <form @submit.prevent="submit">
          <div class="row px-2">
            <div class="col-lg-6">
              <div class="mb-3">
                <label for="avatar" class="form-label">Cover</label>
                <br />
                <Cropper
                  field="img"
                  :langType="'en'"
                  @crop-success="cropCoverSuccess"
                  :width="500"
                  :height="300"
                  v-model="showCoverCroper"
                  :noCircle="widthContent < 500"
                  :noSquare="widthContent < 500"
                >
                </Cropper>
                <img
                  v-if="coverPreview"
                  :src="coverPreview"
                  style="width: 100%"
                  alt=""
                  class="rounded img-fluid mb-2"
                  @click="
                    () => {
                      coverPreview = null;
                      form.cover = '';
                    }
                  "
                />
                <div
                  class="card"
                  style="cursor: pointer"
                  @click="showModalCoverCroper"
                >
                  <div class="card-body text-center">
                    <i class="fas fa-plus fa-1x"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <label for="avatar" class="form-label">&nbsp;</label>
              <div class="form-floating mb-3">
                <input
                  type="number"
                  class="form-control"
                  id="score"
                  placeholder="100"
                />
                <label for="score">Score</label>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="mb-3">
                <label for="description" class="form-label">Question</label>
                <QuillEditor
                  theme="snow"
                  v-model:content="form.question"
                  ref="quill"
                  contentType="html"
                  style="height: 300px"
                  toolbar="full"
                />
              </div>
            </div>
            <div class="col-lg-12">
              <button
                class="btn btn-success d-flex justify-content-between align-items-center rounded-4 px-4 py-3"
                :disabled="form.loading"
              >
                <div
                  class="spinner-border text-light me-2 spinner-border-sm"
                  role="status"
                  v-if="form.loading"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <i class="fas fa-save me-2"></i>Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
