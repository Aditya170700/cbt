<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import logo from "@/assets/img/cbt-logo.png";
</script>

<template>
  <section id="cover" class="min-vh-100 bg-info-1">
    <div id="cover-caption">
      <div class="container">
        <div class="row text-white">
          <div
            class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4"
          >
            <div class="px-2 py-5">
              <div class="row">
                <div class="col-12 text-center mb-5">
                  <img
                    :src="logo"
                    alt=""
                    class="img-fluid"
                    style="width: 70%"
                  />
                </div>
                <form action="" class="justify-content-center">
                  <div class="col-12 text-start mb-3">
                    <div class="h6">Ubah Password</div>
                    <div class="p small">
                      Silahkan masukkan password anda yang baru
                    </div>
                  </div>
                  <div class="col-12">
                    <label for="password" class="form-label small"
                      >Username</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="password"
                      v-model="form.check.username"
                      disabled
                    />
                  </div>
                  <div class="col-12">
                    <label for="password" class="form-label small"
                      >New Password</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      v-model="form.password"
                    />
                    <div
                      class="form-text small text-danger"
                      v-if="form.errors?.password"
                    >
                      {{ form.errors?.password[0] }}
                    </div>
                  </div>
                  <div class="col-12">
                    <label for="confirm-password" class="form-label small"
                      >Confirm Password</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="confirm-password"
                      v-model="form.password_confirmation"
                    />
                    <div
                      class="form-text small text-danger"
                      v-if="form.errors?.password_confirmation"
                    >
                      {{ form.errors?.password_confirmation[0] }}
                    </div>
                  </div>
                  <div class="col-12 mt-4 mb-2">
                    <div class="d-grid">
                      <button type="submit" class="btn btn-light">
                        Kirim Link Lupa Password
                      </button>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-grid">
                      <router-link
                        class="btn text-white"
                        :to="{ name: 'auth-login' }"
                      >
                        <i class="fas fa-angle-left me-2"></i>Kembali
                      </router-link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
