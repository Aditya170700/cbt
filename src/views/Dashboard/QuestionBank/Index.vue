<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "@/components/Dashboard/Sidebar.vue";
import { reactive } from "vue";

let widthContent = window.innerWidth;
let params = reactive({
  page: 1,
  limit: 10,
  search: "",
  sort: "desc",
  type: "MULTIPLE CHOICE",
});

function destroy(id) {
  alert(id);
}
</script>

<template>
  <div class="dashboard">
    <Sidebar />
    <div
      :class="`main-content content ${widthContent > 992 ? '' : 'hide'} mb-5`"
    >
      <div class="container p-lg-4">
        <div class="d-flex px-2 mb-4 justify-content-between">
          <div class="col-6 col-lg-6 text-start mb-3">
            <div class="h4 fw-bold">QUESTION BANK</div>
          </div>
          <div class="dropdown">
            <button
              class="btn btn-sm btn-outline-success rounded-4 px-3 mb-2 dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-plus me-2"></i>CREATE
            </button>
            <ul
              class="dropdown-menu rounded-4"
              style="position: fixed !important; right: 0; left: auto"
            >
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{
                    name: 'dashboard-question-bank-create-multiple-choice',
                  }"
                  >MULTIPLE CHOICE</router-link
                >
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{
                    name: 'dashboard-question-bank-create-essay',
                  }"
                  >ESSAY</router-link
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="row px-2 mb-5">
          <div class="col-lg-8 mb-2">
            <button
              :class="`btn btn-sm btn${
                params.type == 'MULTIPLE CHOICE' ? '' : '-outline'
              }-primary rounded-4 me-2 px-3 mb-2`"
              @click="params.type = 'MULTIPLE CHOICE'"
            >
              <i class="fas fa-list me-2"></i>MULTIPLE CHOICE
            </button>
            <button
              :class="`btn btn-sm btn${
                params.type == 'ESSAY' ? '' : '-outline'
              }-info rounded-4 me-2 px-3 mb-2`"
              @click="params.type = 'ESSAY'"
            >
              <i class="far fa-file me-2"></i>ESSAY
            </button>
          </div>
          <div class="col-lg-4">
            <div class="input-group mb-3 bg-white rounded-4 shadow">
              <input
                type="text"
                class="form-control rounded-4 border-0"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="btn-search"
              />
              <button
                class="btn btn-success rounded-4 border-0"
                type="button"
                id="btn-search"
              >
                <i class="fas fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="row px-2" v-if="params.type == 'MULTIPLE CHOICE'">
          <div class="col-lg-4 mb-4" v-for="i in 12" :key="i">
            <div class="card rounded-4 shadow border">
              <div class="card-body rounded-4 p-4 position-relative">
                <div class="position-absolute" style="top: -5%; right: -5%">
                  <router-link
                    :to="{
                      name: 'dashboard-question-bank-edit-multiple-choice',
                      params: { id: `uuid` },
                    }"
                    class="rounded-pill btn btn-warning btn-sm me-1"
                  >
                    <i class="fas fa-pencil"></i>
                  </router-link>
                  <button
                    class="rounded-pill btn btn-danger btn-sm me-1"
                    @click="destroy(`uuid`)"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <div class="h6 fw-bold">MULTIPLE CHOICE</div>
                <div class="small mb-3">13 January 2022</div>
                <p class="four-line">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  explicabo ab quas natus ipsam est numquam, quia esse facilis
                  doloribus quasi itaque assumenda. Nemo ducimus minima
                  provident quo voluptatum ratione!
                </p>
                <div class="d-flex justify-content-start align-items-center">
                  <img
                    src="./../../../assets/static/profile.svg"
                    alt=""
                    class="rounded-pill"
                    style="width: 40px"
                  />
                  <div class="ms-2">
                    <div class="small fw-bold">Alex</div>
                    <div class="small text-muted">Teacher</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row px-2" v-if="params.type == 'ESSAY'">
          <div class="col-lg-4 mb-4" v-for="i in 12" :key="i">
            <div class="card rounded-4 shadow border">
              <div class="card-body rounded-4 p-4 position-relative">
                <div class="position-absolute" style="top: -5%; right: -5%">
                  <router-link
                    :to="{
                      name: 'dashboard-question-bank-edit-essay',
                      params: { id: `uuid` },
                    }"
                    class="rounded-pill btn btn-warning btn-sm me-1"
                  >
                    <i class="fas fa-pencil"></i>
                  </router-link>
                  <button
                    class="rounded-pill btn btn-danger btn-sm me-1"
                    @click="destroy(`uuid`)"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <div class="h6 fw-bold">ESSAY</div>
                <div class="small mb-3">13 January 2022</div>
                <p class="four-line">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  explicabo ab quas natus ipsam est numquam, quia esse facilis
                  doloribus quasi itaque assumenda. Nemo ducimus minima
                  provident quo voluptatum ratione!
                </p>
                <div class="d-flex justify-content-start align-items-center">
                  <img
                    src="./../../../assets/static/profile.svg"
                    alt=""
                    class="rounded-pill"
                    style="width: 40px"
                  />
                  <div class="ms-2">
                    <div class="small fw-bold">Alex</div>
                    <div class="small text-muted">Teacher</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
