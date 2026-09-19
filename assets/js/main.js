/* Shared behaviour for ElyonEdge client landing pages.
   All of it is progressive enhancement — the page reads, converts and
   shows its real numbers with JavaScript disabled. */
(function () {
  "use strict";

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Nav: border once scrolled ------------------------------------------- */
  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 30); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Mobile menu ---------------------------------------------------------- */
  var ham = document.getElementById("ham");
  var mob = document.getElementById("mob");
  if (ham && mob) {
    var setMenu = function (open) {
      ham.setAttribute("aria-expanded", String(open));
      mob.classList.toggle("open", open);
    };
    ham.addEventListener("click", function () {
      setMenu(ham.getAttribute("aria-expanded") !== "true");
    });
    mob.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && ham.getAttribute("aria-expanded") === "true") { setMenu(false); ham.focus(); }
    });
  }

  /* FAQ accordion -------------------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-faq]"), function (btn) {
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    if (!panel) return;
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      panel.setAttribute("data-open", String(!open));
    });
  });

  /* Reveal on scroll ----------------------------------------------------- */
  var reveals = document.querySelectorAll(".fu, .fl, .fr");
  if (reveals.length) {
    if (reduced || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(reveals, function (el) { el.classList.add("on"); });
    } else {
      var revObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("on"); revObs.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      Array.prototype.forEach.call(reveals, function (el) { revObs.observe(el); });
    }
  }

  /* Counters ------------------------------------------------------------- */
  /* The final value is already in the markup, so it is correct without JS
     and for anyone who prefers reduced motion. We only count up to it. */
  var counters = document.querySelectorAll("[data-target]");
  if (!counters.length || reduced || !("IntersectionObserver" in window)) return;

  var cObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      cObs.unobserve(el);

      var target = parseInt(el.dataset.target, 10);
      if (isNaN(target)) return;
      var sfx = el.dataset.sfx || "";
      var start = null;
      var DURATION = 1100;

      var frame = function (now) {
        if (start === null) start = now;
        var p = Math.min((now - start) / DURATION, 1);
        var eased = 1 - Math.pow(1 - p, 3);          /* ease-out cubic */
        el.textContent = Math.round(target * eased) + sfx;
        if (p < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    });
  }, { threshold: 0.5 });

  Array.prototype.forEach.call(counters, function (el) { cObs.observe(el); });
})();
