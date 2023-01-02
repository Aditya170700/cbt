<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useRoute, useRouter } from "vue-router";

let router = useRouter();
let route = useRoute();

function back() {
  router.go(-1);
}
</script>

<template>
  <div>
    <div class="position-relative">
      <div
        class="position-absolute text-center d-none d-lg-block"
        style="top: 300px; left: 450px; max-width: 500px"
      >
        <div class="h4 fw-bold mb-3">Terima Kasih</div>
        <div class="h4 fw-bold">
          Akun {{ route.query.akun }} belum terverifikasi, silahkan cek email.
          Kami telah mengirimkan link untuk memverifikasi akun
          {{ route.query.akun }}
        </div>
        <button class="btn btn-light btn-sm shadow border-0" @click="back">
          <i class="fas fa-angle-left me-2"></i>Kembali
        </button>
      </div>
      <div
        class="position-absolute text-center d-lg-none"
        style="top: 300px; left: 50px; max-width: 300px"
      >
        <div class="h4 fw-bold mb-3">Terima Kasih</div>
        <div class="h4 fw-bold">
          Akun {{ route.query.akun }} belum terverifikasi, silahkan cek email.
          Kami telah mengirimkan link untuk memverifikasi akun
          {{ route.query.akun }}
        </div>
        <button class="btn btn-light btn-sm shadow border-0" @click="back">
          <i class="fas fa-angle-left me-2"></i>Kembali
        </button>
      </div>
    </div>
  </div>
</template>
