<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from "vue";

let input = ref("");
</script>

<template>
  <div>
    <input
      class="form-control"
      type="text"
      name="city"
      list="cityname"
      style="text-transform: uppercase"
      v-model="input"
    />
    <datalist id="cityname" style="width: 100%">
      <option value="Boston" v-for="i in 300" :key="i">
        {{ `Lorem, ipsum dolor sit amet consectetur adipisicing elit - ${i}` }}
      </option>
    </datalist>
    {{ input }}
  </div>
</template>

<style scoped></style>
