import administrator from "@/router/dashboard/administrator/index.js";
import peserta from "@/router/dashboard/peserta/index.js";
import panitia from "@/router/dashboard/panitia/index.js";
import instruktur from "@/router/dashboard/instruktur/index.js";

let routes = [...administrator, ...peserta, ...panitia, ...instruktur];

export default routes;
