import administrator from "@/router/dashboard-lsp/administrator/index.js";
import peserta from "@/router/dashboard-lsp/peserta/index.js";
import panitia from "@/router/dashboard-lsp/panitia/index.js";
import instruktur from "@/router/dashboard-lsp/instruktur/index.js";

let routes = [...administrator, ...peserta, ...panitia, ...instruktur];

export default routes;
