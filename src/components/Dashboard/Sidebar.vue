<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
let widthContent = window.innerWidth;

function sidebar() {
  document.querySelector(".sidebar").classList.toggle("hide");
  document.querySelector(".content").classList.toggle("hide");
  document.querySelector(".content-footer").classList.toggle("hide");
  document.querySelector(".main-content").classList.toggle("hide");
}
</script>

<template>
  <div class="dashboard-navigation">
    <div
      :class="`sidebar bg-gray-mice shadow ${widthContent > 992 ? '' : 'hide'}`"
    >
      <div class="d-flex justify-content-end d-lg-none">
        <i class="fas fa-times" @click="sidebar"></i>
      </div>
      <router-link
        :to="{ name: 'dashboard' }"
        class="d-none d-lg-block text-decoration-none text-center text-white"
      >
        <span class="h1 fw-bold">CBT</span>
      </router-link>
      <div class="height-hide overflow-auto">
        <div class="menu-wrapper">
          <a class="text-white text-decoration-none" href="#">
            <div class="item d-flex align-items-center active">
              <div
                style="width: 20px"
                class="col-2 icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-dashboard"></i>
              </div>
              <div
                class="col-10 d-flex justify-content-between align-items-center"
              >
                Dashboard
              </div>
            </div>
          </a>
          <a class="text-white text-decoration-none" href="#">
            <div class="item d-flex align-items-center">
              <div
                style="width: 20px"
                class="col-2 icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-tv"></i>
              </div>
              <div
                class="col-10 d-flex justify-content-between align-items-center"
              >
                Presentation
              </div>
            </div>
          </a>
          <a class="text-white text-decoration-none" href="#">
            <div class="item d-flex align-items-center">
              <div
                style="width: 20px"
                class="col-2 icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-cubes"></i>
              </div>
              <div
                class="col-10 d-flex justify-content-between align-items-center"
              >
                Question Bank
              </div>
            </div>
          </a>
          <a class="text-white text-decoration-none" href="#">
            <div class="item d-flex align-items-center">
              <div
                style="width: 20px"
                class="col-2 icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-file-pen"></i>
              </div>
              <div
                class="col-10 d-flex justify-content-between align-items-center"
              >
                Test
              </div>
            </div>
          </a>
          <a class="text-white text-decoration-none" href="#">
            <div class="item d-flex align-items-center">
              <div
                style="width: 20px"
                class="col-2 icons d-flex justify-content-center me-2"
              >
                <i class="fas fa-landmark"></i>
              </div>
              <div
                class="col-10 d-flex justify-content-between align-items-center"
              >
                Class
              </div>
            </div>
          </a>
          <a class="text-white text-decoration-none" href="#">
            <div class="item d-flex align-items-center">
              <div
                style="width: 20px"
                class="col-2 icons d-flex justify-content-center me-2"
              >
                <i class="far fa-calendar"></i>
              </div>
              <div
                class="col-10 d-flex justify-content-between align-items-center"
              >
                Schedule
              </div>
            </div>
          </a>
          <a
            href="#"
            @click.prevent="logout"
            class="text-white text-decoration-none"
          >
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
      </div>
    </div>

    <div
      :class="`content ${widthContent > 992 ? '' : 'hide'} d-none d-lg-block`"
    >
      <div class="section">
        <nav>
          <div class="card-shadow shadow rounded-0">
            <div class="py-2 px-3">
              <div class="d-flex align-items-center justify-content-between">
                <div class="menu-bar" @click="sidebar">
                  <i class="fas fa-bars text-white me-3"></i>
                </div>
                <div class="d-flex align-items-center">
                  <i class="fas fa-magnifying-glass text-white me-3"></i>
                  <i class="fas fa-bell text-white me-4 position-relative">
                    <span
                      class="badge bg-danger rounded-custom small position-absolute"
                      style="top: -13px; right: -13px"
                      >1</span
                    >
                  </i>
                  <div class="d-flex align-items-center">
                    <div class="me-3">
                      <span class="d-block text-white">Alex</span>
                      <span class="d-block text-white small">Admin</span>
                    </div>
                    <div
                      class="profile align-items-center justify-content-center"
                    >
                      <img src="./../../assets/img/logo.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <div :class="`content ${widthContent > 992 ? '' : 'hide'} d-lg-none`">
      <div class="mb-5">
        <nav>
          <div class="card-shadow rounded-0 bg-secondary-mice">
            <div class="py-2 px-3">
              <div class="d-flex align-items-center justify-content-between">
                <img
                  src="./../../assets/img/logo.png"
                  alt=""
                  style="width: 15%"
                />
                <div class="menu-bar">
                  <i class="fas fa-bars text-white me-3" @click="sidebar"></i>
                  <i class="fas fa-ellipsis text-white"></i>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
