/* eslint-disable no-undef */
import { defineStore } from "pinia";

export const appStore = defineStore("app", {
  state: () => ({
    baseurl: process.env.NODE_ENV == "development" ? "http://localhost:8000/api/" : "https://api.example.com",
    urlCbt: process.env.NODE_ENV == "development" ? "http://localhost:5174/" : "https://cbt.com",
    urlSimpel: process.env.NODE_ENV == "development" ? "http://localhost:5173/" : "https://simpel.com",
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("user") || null,
    reload: false,
  }),
  getters: {},
  actions: {},
});
