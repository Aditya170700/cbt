<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/SidebarLsp/Panitia.vue";

let widthContent = window.innerWidth;
</script>

<template>
  <div class="dashboard">
    <Sidebar />
    <div
      :class="`main-content content ${widthContent > 992 ? '' : 'hide'} mb-5`"
    >
      <div class="container p-lg-4">Dashboard Panitia</div>
    </div>
  </div>
</template>
