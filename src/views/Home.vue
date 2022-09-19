<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<script setup>
import { ref } from "vue";
import backgroundImage from "@/assets/img/static/bg-landing.jpeg";
import { useRouter } from "vue-router";

let widthContent = window.innerWidth;
let heightContent = window.innerHeight;
let minus = widthContent > 900 ? 90 : 70;
let minHeight = ref((heightContent - minus) / 2);
let router = useRouter();

function login() {
  let redirect = router.resolve({ name: "dashboard" }).href;
  window.location.href = redirect;
}

function signup() {
  let redirect = router.resolve({ name: "dashboard" }).href;
  window.location.href = redirect;
}
</script>

<template>
  <b-container fluid class="p-0">
    <b-navbar variant="faded" type="light" class="shadow-sm">
      <b-navbar-brand class="mb-0">
        <div class="d-flex align-items-center">
          <img src="./../assets/img/logo.png" alt="Logo" style="width: 15%" />
          <div class="small">
            <h6 class="small fw-bold mb-0">PPSDM</h6>
            <span class="small mt-0">Perhubungan Laut</span>
          </div>
        </div>
      </b-navbar-brand>
      <div class="d-none d-lg-block">
        <b-button variant="outline-primary" size="sm" class="rounded-3 mx-1"
          >All Test</b-button
        >
        <b-button variant="outline-primary" size="sm" class="rounded-3 mx-1"
          >LSP</b-button
        >
        <b-button
          variant="outline-primary"
          size="sm"
          class="rounded-3 mx-1"
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
          >Login</b-button
        >
        <b-button
          variant="outline-primary"
          size="sm"
          class="rounded-3 mx-1"
          data-bs-toggle="modal"
          data-bs-target="#signupModal"
          >Sign Up</b-button
        >
      </div>
      <div class="d-lg-none">
        <i class="fas fa-bars fa-2x text-primary"></i>
      </div>
    </b-navbar>
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
    <div
      class="modal fade"
      id="loginModal"
      tabindex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content rounded-4">
          <div class="modal-body p-4">
            <div class="d-flex justify-content-between mb-3">
              <div class="modal-title" id="loginModalLabel">
                <div class="h5 fw-bold">Login</div>
                <div class="small">Enter your email and password</div>
              </div>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form @submit.prevent="login">
              <div class="row">
                <div class="col-lg-12">
                  <div class="form-floating mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="alex@gmail.com"
                    />
                    <label for="email">Email</label>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-floating mb-3">
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="Password"
                    />
                    <label for="password">Password</label>
                  </div>
                </div>
                <div class="col-lg-12 text-end mb-3">
                  <a href="#" class="text-decoration-none small"
                    >Forgot password?</a
                  >
                </div>
                <div class="col-lg-12 mb-3">
                  <div class="d-grid">
                    <button class="btn btn-sm btn-primary rounded-3">
                      Log In
                    </button>
                  </div>
                </div>
                <div class="col-lg-12 text-center">
                  <a href="#" class="text-decoration-none small"
                    >Don't have an account?</a
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="signupModal"
      tabindex="-1"
      aria-labelledby="signupModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content rounded-4">
          <div class="modal-body p-4">
            <div class="d-flex justify-content-between mb-3">
              <div class="modal-title" id="signupModalLabel">
                <div class="h5 fw-bold">Sign Up</div>
                <div class="small">Enter your credentials to continue</div>
              </div>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form @submit.prevent="signup">
              <div class="row">
                <div class="col-lg-12">
                  <div class="form-floating mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="alex@gmail.com"
                    />
                    <label for="email">Email</label>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-floating mb-3">
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="Password"
                    />
                    <label for="password">Password</label>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-floating mb-3">
                    <input
                      type="password"
                      class="form-control"
                      id="password_confirmation"
                      placeholder="Password"
                    />
                    <label for="password_confirmation">Confirm Password</label>
                  </div>
                </div>
                <div class="col-lg-12 mb-3">
                  <div class="d-grid">
                    <button class="btn btn-sm btn-primary rounded-3">
                      Sign Up
                    </button>
                  </div>
                </div>
                <div class="col-lg-12 text-center">
                  <a href="#" class="text-decoration-none small"
                    >Already have an account?</a
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>
