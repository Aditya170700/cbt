<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<script setup>
import { ref } from "vue";
import backgroundImage from "@/assets/img/static/bg-landing.jpeg";
import Navbar from "../components/Navbar.vue";

let widthContent = window.innerWidth;
let heightContent = window.innerHeight;
let minus = widthContent > 900 ? 90 : 70;
let minHeight = ref((heightContent - minus) / 2);
</script>

<template>
  <b-container fluid class="p-0">
    <Navbar />
    <section class="p-5"></section>
    <div :style="`min-height:${minHeight}px;`" class="position-relative">
      <div class="d-none d-lg-block p-lg-5">
        <div class="h1" style="font-size: 42px">CBT PPSDM</div>
        <div class="h2">Perhubungan Laut</div>
      </div>
      <div class="d-none d-lg-block p-lg-5">
        <b-card class="position-absolute rounded-4 border-0 shadow-lg">
          <b-card-text class="badge bg-light text-dark">
            <i class="fas fa-circle-check me-2"></i>Explore Available Test
          </b-card-text>

          <b-form>
            <b-row>
              <b-col lg="12" class="mb-3">
                <label for="">Name</label>
                <b-form-input size="lg" placeholder="XYZ"></b-form-input>
              </b-col>
              <b-col lg="12" class="mb-3 text-center">
                <b-button variant="outline-primary" class="rounded-5 px-4"
                  >SEARCH</b-button
                >
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </div>
      <div class="position-absolute d-lg-none" style="top: 30%">
        <div class="text-center mb-5">
          <div class="h1" style="font-size: 42px">CBT PPSDM</div>
          <div class="h2">Perhubungan Laut</div>
        </div>
        <div class="px-3">
          <b-card class="rounded-4 border-0 shadow-lg">
            <b-card-text class="badge bg-light text-dark">
              <i class="fas fa-circle-check me-2"></i>Explore Available Test
            </b-card-text>

            <b-form>
              <b-row>
                <b-col lg="12" class="mb-3">
                  <label for="">Name</label>
                  <b-form-input size="lg" placeholder="XYZ"></b-form-input>
                </b-col>
                <b-col lg="12" class="mb-3 text-center">
                  <b-button variant="outline-primary" class="rounded-3 px-4"
                    >Search</b-button
                  >
                </b-col>
              </b-row>
            </b-form>
          </b-card>
        </div>
      </div>
    </div>
    <div
      :style="`min-height:${minHeight}px; background-image: url('${backgroundImage}'); bacground-size: cover; background-position: center; background-repeat: no-repeat; background-fit: cover;`"
    ></div>
  </b-container>
</template>
