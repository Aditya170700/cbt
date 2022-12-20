<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import { default as BlotFormatter } from "quill-blot-formatter";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { onMounted, ref } from "vue";
import { appStore } from "@/stores/app";

let quill = ref(null);
let input = ref("");
const storeApp = appStore();
let modules = [storeApp.imageUploader];

onMounted(() => {
  console.log(BlotFormatter);
});
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
