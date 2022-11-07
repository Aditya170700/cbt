<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useRoute } from "vue-router";
import Navbar from "../../components/Navbar.vue";

let route = useRoute();
</script>

<template>
  <b-container fluid class="p-0">
    <Navbar />
    <section class="p-5"></section>
    <section class="p-4">
      <div class="card rounded-4 shadow border-0">
        <div class="card-body rounded-4 p-4">
          <div class="row mb-5" v-if="route.query.status == 'finish'">
            <div
              class="col-lg-2 d-flex justify-content-center align-items-center mb-5 mb-lg-0"
            >
              <i class="fas fa-circle-check text-success fa-5x"></i>
            </div>
            <div class="col-lg-5 mb-5 mb-lg-0">
              <div class="row mb-3 mb-lg-0">
                <div class="col-lg-6">
                  <div class="h6 fw-bold text-dark">Exam Name 1</div>
                </div>
                <div class="col-lg-6 text-lg-end">
                  <span class="badge bg-success rounded-4">
                    <i class="fas fa-circle-check me-1"></i>Finished
                  </span>
                </div>
              </div>
              <div :class="`mb-3 text-success`">
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
            <div class="col-lg-5 mb-4">
              <div class="row">
                <div class="col-12">
                  <div class="h6 fw-bold text-dark">Result</div>
                </div>
                <div class="col-3">Time</div>
                <div class="col-9">: Senin, 2 January 2022, 12:52:12</div>
                <div class="col-3">Score</div>
                <div class="col-9">: 90</div>
              </div>
            </div>
          </div>
          <div class="row" v-else>
            <div
              class="col-lg-2 d-flex justify-content-center align-items-center mb-5 mb-lg-0"
            >
              <i class="fas fa-circle-check text-danger fa-5x"></i>
            </div>
            <div class="col-lg-5 mb-5 mb-lg-0">
              <div class="row mb-3 mb-lg-0">
                <div class="col-lg-6">
                  <div class="h6 fw-bold text-dark">Exam Name 1</div>
                </div>
                <div class="col-lg-6 text-lg-end">
                  <span class="badge bg-danger rounded-4">
                    <i class="fas fa-circle-xmark me-1"></i>Unfinished
                  </span>
                </div>
              </div>
              <div :class="`mb-3 text-danger`">
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
            <div class="col-lg-5 mb-4">
              <div class="row">
                <div class="col-12">
                  <div class="h6 fw-bold text-dark">Result</div>
                </div>
                <div class="col-3">Time</div>
                <div class="col-9">: N/A</div>
                <div class="col-3">Score</div>
                <div class="col-9">: N/A</div>
              </div>
            </div>
          </div>
          <div class="row" v-if="route.query.status == 'finish'">
            <div class="col-lg-12">
              <div class="h6 fw-bold text-dark">Detail</div>
            </div>
            <div class="col-lg-6 mb-3">
              <div class="row">
                <div class="col-lg-12 text-danger fw-bold">
                  1. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  <i class="fas fa-xmark"></i>
                </div>
                <div class="col-lg-12">
                  <div class="row">
                    <div class="col-lg-10">
                      <div class="row">
                        <div class="col-lg-12">
                          <i class="fas fa-circle me-2"></i>Lorem ipsum dolor
                        </div>
                        <div class="col-lg-12 text-success">
                          <i class="fas fa-circle me-2"></i>Ipsum dolor sit
                        </div>
                        <div class="col-lg-12 text-danger">
                          <i class="fas fa-circle me-2"></i>Dolor sit amet
                        </div>
                        <div class="col-lg-12">
                          <i class="fas fa-circle me-2"></i>Sit amet consectetur
                        </div>
                        <div class="col-lg-12">
                          <i class="fas fa-circle me-2"></i>Amet consectetur
                          adipisicing
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-lg-2 d-flex justify-content-center align-items-center"
                    >
                      <span class="rounded-circle bg-danger text-white p-2"
                        >30</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 mb-3">
              <div class="row">
                <div class="col-lg-12 text-success fw-bold">
                  2. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  <i class="fas fa-check"></i>
                </div>
                <div class="col-lg-12">
                  <div class="row">
                    <div class="col-lg-10">
                      <div class="row">
                        <div class="col-lg-12">
                          <i class="fas fa-circle me-2"></i>Lorem ipsum dolor
                        </div>
                        <div class="col-lg-12 text-success">
                          <i class="fas fa-circle me-2"></i>Ipsum dolor sit
                        </div>
                        <div class="col-lg-12">
                          <i class="fas fa-circle me-2"></i>Dolor sit amet
                        </div>
                        <div class="col-lg-12">
                          <i class="fas fa-circle me-2"></i>Sit amet consectetur
                        </div>
                        <div class="col-lg-12">
                          <i class="fas fa-circle me-2"></i>Amet consectetur
                          adipisicing
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-lg-2 d-flex justify-content-center align-items-center"
                    >
                      <span class="rounded-circle bg-success text-white p-2"
                        >30</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 mb-3">
              <div class="row mb-2">
                <div class="col-lg-12 text-success fw-bold">
                  3. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  <i class="fas fa-check"></i>
                </div>
                <div class="col-2">Answer</div>
                <div class="col-10">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat consequatur, delectus quae corrupti accusamus non
                  quas consectetur cupiditate minus! Numquam in officia quas eum
                  consectetur nesciunt dignissimos ullam voluptates enim.
                </div>
              </div>
              <div class="row">
                <div class="col-2">Score</div>
                <div class="col-10">
                  <span class="rounded-circle bg-success text-white p-2"
                    >20</span
                  >
                </div>
              </div>
            </div>
            <div class="col-lg-6 mb-3">
              <div class="row mb-2">
                <div class="col-lg-12 text-success fw-bold">
                  4. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  <i class="fas fa-check"></i>
                </div>
                <div class="col-2">Answer</div>
                <div class="col-10">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat consequatur, delectus quae corrupti accusamus non
                  quas consectetur cupiditate minus! Numquam in officia quas eum
                  consectetur nesciunt dignissimos ullam voluptates enim.
                </div>
              </div>
              <div class="row">
                <div class="col-2">Score</div>
                <div class="col-10">
                  <span class="rounded-circle bg-success text-white p-2"
                    >40</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </b-container>
</template>
