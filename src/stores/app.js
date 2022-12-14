/* eslint-disable no-undef */
import { defineStore } from "pinia";

export const appStore = defineStore("app", {
  state: () => ({
    baseurl: process.env.NODE_ENV == "development" ? "http://localhost:8000/api/" : "https://api-simple.smartmanagement.id/api/",
    templatePg: process.env.NODE_ENV == "development" ? "http://localhost:8000/template-multiple-choice.xlsx" : "https://api-simple.smartmanagement.id/template-multiple-choice.xlsx",
    templateEssay: process.env.NODE_ENV == "development" ? "http://localhost:8000/template-essay.xlsx" : "https://api-simple.smartmanagement.id/template-essay.xlsx",
    urlCbt: process.env.NODE_ENV == "development" ? "http://localhost:5174/" : "https://cbt-simple.smartmanagement.id/",
    urlSimpel: process.env.NODE_ENV == "development" ? "http://localhost:5173/" : "https://simple.smartmanagement.id/",
    
    captchaKey: process.env.NODE_ENV == "development" ? '6LeAdjwiAAAAABkX-LSN3e173q_ftHqk-fwu-obt' : '6LcO_n0jAAAAAHUVLEZQ5wE41vqTg727ZU5FNCyf',

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
