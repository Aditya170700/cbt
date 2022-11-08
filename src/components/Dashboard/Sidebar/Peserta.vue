<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useRoute } from "vue-router";

let route = useRoute();
</script>

<template>
  <div class="menu-wrapper">
    <router-link
      :to="{ name: 'dashboard-peserta' }"
      class="text-white text-decoration-none"
      href="#"
    >
      <div
        :class="`item d-flex align-items-center ${
          route.name == 'dashboard-peserta' ? 'active' : ''
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
      :to="{ name: 'dashboard-peserta-diklat' }"
      class="text-white text-decoration-none"
      href="#"
    >
      <div
        :class="`item d-flex align-items-center ${
          route.meta.group == 'dashboard-peserta-diklat' ? 'active' : ''
        }`"
      >
        <div
          style="width: 20px"
          class="col-2 icons d-flex justify-content-center me-2"
        >
          <i class="fas fa-book"></i>
        </div>
        <div class="col-10 d-flex justify-content-between align-items-center">
          Diklat
        </div>
      </div>
    </router-link>
    <a href="#" @click.prevent="logout" class="text-white text-decoration-none">
      <div class="item logout d-flex align-items-center">
        <div
          style="width: 20px"
          class="icons d-flex justify-content-center me-2"
        >
          <i class="fas fa-power-off"></i>
        </div>
        <div>Logout</div>
      </div>
    </a>
  </div>
</template>
