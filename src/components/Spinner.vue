<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    :class="`spinner-border spinner-border-sm text-${props.color ?? 'light'}`"
    role="status"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["color"]);
</script>

<style></style>
