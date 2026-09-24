// Made in France & Marion — comportements du site
(function () {
  "use strict";

  /* Navigation mobile */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var isOpen = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    document.querySelectorAll(".mobile-nav-panel a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Bandeau cookies — consentement avant tout outil de mesure d'audience */
  var CONSENT_KEY = "mifm-cookie-consent"; // "accepted" | "refused"
  var banner = document.getElementById("cookie-banner");

  function loadAnalytics() {
    // Emplacement prévu pour un outil respectueux de la vie privée
    // (ex. Plausible, Matomo...). Ne se déclenche qu'après consentement.
    // Exemple :
    // var s = document.createElement("script");
    // s.defer = true;
    // s.dataset.domain = "made-in-france-et-marion.fr";
    // s.src = "https://plausible.io/js/script.js";
    // document.head.appendChild(s);
  }

  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
    if (banner) banner.classList.remove("is-visible");
    if (value === "accepted") loadAnalytics();
  }

  if (banner) {
    var existing = null;
    try { existing = localStorage.getItem(CONSENT_KEY); } catch (e) {}
    if (!existing) {
      window.setTimeout(function () { banner.classList.add("is-visible"); }, 600);
    } else if (existing === "accepted") {
      loadAnalytics();
    }
    var acceptBtn = banner.querySelector(".accept");
    var refuseBtn = banner.querySelector(".refuse");
    if (acceptBtn) acceptBtn.addEventListener("click", function () { setConsent("accepted"); });
    if (refuseBtn) refuseBtn.addEventListener("click", function () { setConsent("refused"); });
  }
})();
