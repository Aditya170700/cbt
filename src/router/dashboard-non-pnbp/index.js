import adminLemdik from "@/router/dashboard-non-pnbp/admin-lemdik/index.js";
import peserta from "@/router/dashboard-non-pnbp/peserta/index.js";
import instruktur from "@/router/dashboard-non-pnbp/instruktur/index.js";

let routes = [...adminLemdik, ...peserta, ...instruktur];

export default routes;
