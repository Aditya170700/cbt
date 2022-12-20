<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import axios from "axios";
// import { default as BlotFormatter } from "quill-blot-formatter";
import ImageUploader from "quill-image-uploader";
import { ref } from "vue";
import { appStore } from "@/stores/app";
import { clearBase64 } from "@/assets/js/utils";

let quill = ref(null);
let input = ref("");
const storeApp = appStore();
// const blotFormatterModule = {
//   name: "blotFormatter",
//   module: BlotFormatter,
//   options: {},
// };
let modules = {
  name: "imageUploader",
  module: ImageUploader,
  options: {
    upload: (file) => {
      // convert file to base64 with promise
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          axios
            .post(`${storeApp.baseurl}quill/image-uploader`, {
              image: clearBase64(e.target.result),
              ext: file.name.split(".").pop().toLowerCase(),
            })
            .then((res) => {
              if (res.data.status != 200) throw new Error(res.data.message);
              resolve(res.data.data);
            })
            .catch((error) => {
              reject(error);
            });
        };
        reader.onerror = (error) => reject(error);
      });
    },
  },
};
</script>

<template>
  <QuillEditor
    theme="snow"
    v-model:content="input"
    ref="quill"
    contentType="html"
    style="height: 300px"
    toolbar="full"
    :modules="modules"
  />
  <div class="mt-5 ql-editor" v-html="input"></div>
</template>

<style scoped></style>
