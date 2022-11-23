/* eslint-disable no-undef */
import { defineStore } from "pinia";

export const appStore = defineStore("app", {
  state: () => ({
    baseurl: process.env.NODE_ENV == "development" ? "http://localhost:8000/api/" : "https://api-simple.smartmanagement.id/api/",
    urlCbt: process.env.NODE_ENV == "development" ? "http://localhost:5174/" : "https://cbt-simple.smartmanagement.id/",
    urlSimpel: process.env.NODE_ENV == "development" ? "http://localhost:5173/" : "https://simple.smartmanagement.id/",
    // baseurl: "https://api-simple.smartmanagement.id/api/",
    // urlCbt: "https://cbt-simple.smartmanagement.id/",
    // urlSimpel: "https://simple.smartmanagement.id/",
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("user") || null,
    reload: false,
  }),
  getters: {},
  actions: {},
});
