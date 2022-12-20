<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { default as BlotFormatter } from "quill-blot-formatter";
import { ref } from "vue";

let quill = ref(null);
let input = ref("");
const blotFormatterModule = {
  name: "blotFormatter",
  module: BlotFormatter,
  options: {},
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
    :modules="blotFormatterModule"
  />
  <div class="mt-5 ql-editor" v-html="input"></div>
</template>

<style scoped></style>
