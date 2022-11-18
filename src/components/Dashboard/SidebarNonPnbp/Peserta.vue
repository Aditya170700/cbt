<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useRoute } from "vue-router";

let route = useRoute();
</script>

<template>
  <div class="menu-wrapper">
    <router-link
      :to="{
        name: 'dashboard-non-pnbp-peserta',
      }"
      class="text-white text-decoration-none"
      href="#"
    >
      <div
        :class="`item d-flex align-items-center ${
          route.name == 'dashboard-non-pnbp-peserta' ? 'active' : ''
        }`"
      >
        <div
          style="width: 20px"
          class="col-2 icons d-flex justify-content-center me-2"
        >
          <i class="fas fa-dashboard"></i>
        </div>
        <div class="col-10 d-flex justify-content-between align-items-center">
          Dashboard
        </div>
      </div>
    </router-link>

    <router-link
      :to="{ name: 'peserta' }"
      class="text-white text-decoration-none"
    >
      <div class="item logout d-flex align-items-center">
        <div
          style="width: 20px"
          class="icons d-flex justify-content-center me-2"
        >
          <i class="fas fa-arrow-left"></i>
        </div>
        <div>Keluar</div>
      </div>
    </router-link>
  </div>
</template>
