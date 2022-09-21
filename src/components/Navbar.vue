<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useRouter } from "vue-router";
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
  <div>
    <b-navbar variant="faded" type="light" class="shadow-sm fixed-top bg-white">
      <b-navbar-brand class="mb-0">
        <a
          href="/"
          class="d-flex align-items-center text-decoration-none text-dark"
        >
          <img src="./../assets/img/logo.png" alt="Logo" style="width: 15%" />
          <div class="small">
            <h6 class="small fw-bold mb-0">PPSDM</h6>
            <span class="small mt-0">Perhubungan Laut</span>
          </div>
        </a>
      </b-navbar-brand>
      <div class="d-none d-lg-block">
        <router-link
          :to="{ name: 'exam-index' }"
          class="text-decoration-none mx-2 fw-bold"
          >All Exam</router-link
        >
        <a href="" class="text-decoration-none mx-2 fw-bold">LSP</a>
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
  </div>
</template>
