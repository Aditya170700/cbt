<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Navbar from "../../components/Navbar.vue";
</script>

<template>
  <b-container fluid class="p-0">
    <Navbar />
    <section class="p-5"></section>
    <div class="d-flex p-4 justify-content-center">
      <div class="col-12 col-lg-6">
        <div class="input-group mb-3 bg-white rounded-4 shadow p-2">
          <input
            type="text"
            class="form-control rounded-4 border-0"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="btn-search"
          />
          <button
            class="btn btn-primary rounded-4 border-0"
            type="button"
            id="btn-search"
          >
            <i class="fas fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="row p-4">
      <div class="col-6 col-lg-4 mb-4" v-for="i in 12" :key="i">
        <router-link
          :to="{
            name: 'exam-show',
            params: { id: `uuid` },
            query: { status: i < 6 ? 'unfinish' : 'finish' },
          }"
          class="text-decoration-none"
        >
          <div class="card rounded-4 shadow border-0 hovered popup-1">
            <div class="card-body rounded-4 p-4">
              <div class="row mb-3 mb-lg-0">
                <div class="col-lg-6">
                  <div class="h6 fw-bold text-dark">Exam Name {{ i }}</div>
                </div>
                <div class="col-lg-6 text-lg-end">
                  <span class="badge bg-success rounded-4" v-if="i < 6">
                    <i class="fas fa-circle-check me-1"></i>Available
                  </span>
                  <span class="badge bg-danger rounded-4" v-else>
                    <i class="fas fa-circle-xmark me-1"></i>Unavailable
                  </span>
                </div>
              </div>
              <div :class="`mb-3 ${i < 6 ? 'text-success' : 'text-danger'}`">
                <div class="small">Senin, 1 January 2022</div>
                <div class="small">12.00 - 13.00 (60 menit)</div>
              </div>
              <p class="four-line text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                explicabo ab quas natus ipsam est numquam, quia esse facilis
                doloribus quasi itaque assumenda. Nemo ducimus minima provident
                quo voluptatum ratione!
              </p>
              <div class="d-flex justify-content-start align-items-center">
                <img
                  src="./../../assets/static/profile.svg"
                  alt=""
                  class="rounded-pill"
                  style="width: 40px"
                />
                <div class="ms-2">
                  <div class="small fw-bold text-dark">Alex</div>
                  <div class="small text-muted">Teacher</div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </b-container>
</template>
