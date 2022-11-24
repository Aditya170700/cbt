export default function no_auth({ next, router }) {
  if ((localStorage.getItem("tokenPanitia") && localStorage.getItem("userPanitia"))) {
    router.push({
      name: "dashboard-panitia",
    });
    return;
  }

  if ((localStorage.getItem("tokenPeserta") && localStorage.getItem("userPeserta"))) {
    router.push({
      name: "peserta",
    });
    return;
  }

  if ((localStorage.getItem("tokenInstruktur") && localStorage.getItem("userInstruktur"))) {
    router.push({
      name: "instruktur",
    });
    return;
  }

  if ((localStorage.getItem("tokenAdminLemdik") && localStorage.getItem("userAdminLemdik"))) {
    router.push({
      name: "dashboard-non-pnbp-admin-lemdik",
    });
    return;
  }

  if ((localStorage.getItem("tokenAdministratorPelatihan") && localStorage.getItem("userAdministratorPelatihan"))) {
    router.push({
      name: "dashboard-administrator",
    });
    return;
  }

  localStorage.clear();

  return next();
}
