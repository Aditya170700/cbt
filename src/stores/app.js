/* eslint-disable no-undef */
import { defineStore } from "pinia";

export const appStore = defineStore("app", {
  state: () => ({
    baseurl: process.env.NODE_ENV == "development" ? "http://localhost:8001/api/" : "https://api-simple.smartmanagement.id/api/",
    urlCbt: process.env.NODE_ENV == "development" ? "http://localhost:5174/" : "https://cbt-simple.smartmanagement.id/",
    urlSimpel: process.env.NODE_ENV == "development" ? "http://localhost:5173/" : "https://simple.smartmanagement.id/",
    tokenAdministratorPelatihan: localStorage.getItem("tokenAdministratorPelatihan") || null,
    tokenAdminLemdik: localStorage.getItem("tokenAdminLemdik") || null,
    tokenPanitia: localStorage.getItem("tokenPanitia") || null,
    tokenInstruktur: localStorage.getItem("tokenInstruktur") || null,
    tokenPeserta: localStorage.getItem("tokenPeserta") || null,

    userAdministratorPelatihan: localStorage.getItem("userAdministratorPelatihan") || null,
    userAdminLemdik: localStorage.getItem("userAdminLemdik") || null,
    userPanitia: localStorage.getItem("userPanitia") || null,
    userInstruktur: localStorage.getItem("userInstruktur") || null,
    userPeserta: localStorage.getItem("userPeserta") || null,
    reload: false,
  }),
  getters: {},
  actions: {},
});
