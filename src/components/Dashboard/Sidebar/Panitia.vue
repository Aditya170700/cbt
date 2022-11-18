<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useRoute } from "vue-router";

let route = useRoute();

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.close();
}
</script>

<template>
  <div class="menu-wrapper">
    <router-link
      :to="{ name: 'dashboard-panitia' }"
      class="text-white text-decoration-none"
      href="#"
    >
      <div
        :class="`item d-flex align-items-center ${
          route.name == 'dashboard-panitia' ? 'active' : ''
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
      :to="{ name: 'dashboard-panitia-test' }"
      class="text-white text-decoration-none"
      href="#"
    >
      <div
        :class="`item d-flex align-items-center ${
          route.meta.group == 'dashboard-panitia-test' ? 'active' : ''
        }`"
      >
        <div
          style="width: 20px"
          class="col-2 icons d-flex justify-content-center me-2"
        >
          <i class="fas fa-file-pen"></i>
        </div>
        <div class="col-10 d-flex justify-content-between align-items-center">
          Test
        </div>
      </div>
    </router-link>
    <router-link
      :to="{ name: 'dashboard-panitia-soal' }"
      class="text-white text-decoration-none"
      href="#"
    >
      <div
        :class="`item d-flex align-items-center ${
          route.meta.group == 'dashboard-panitia-soal' ? 'active' : ''
        }`"
      >
        <div
          style="width: 20px"
          class="col-2 icons d-flex justify-content-center me-2"
        >
          <i class="fas fa-cubes"></i>
        </div>
        <div class="col-10 d-flex justify-content-between align-items-center">
          Bank Soal
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
