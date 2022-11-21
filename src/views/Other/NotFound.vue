<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useRouter } from "vue-router";

let router = useRouter();

function back() {
  router.go(-1);
}
</script>

<template>
  <div>
    <div class="position-relative">
      <div
        class="position-absolute text-center d-none d-lg-block"
        style="top: 350px; left: 650px"
      >
        <div class="h4 fw-bold">404</div>
        <div class="h4 fw-bold">Halaman Tidak Ditemukan</div>
        <button class="btn btn-light btn-sm shadow border-0" @click="back">
          <i class="fas fa-angle-left me-2"></i>Kembali
        </button>
      </div>
      <div
        class="position-absolute text-center d-lg-none"
        style="top: 300px; left: 120px"
      >
        <div class="h4 fw-bold">404</div>
        <div class="h4 fw-bold">Halaman Tidak Ditemukan</div>
        <button class="btn btn-light btn-sm shadow border-0" @click="back">
          <i class="fas fa-angle-left me-2"></i>Kembali
        </button>
      </div>
    </div>
  </div>
</template>
