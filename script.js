// LAUNCH premium template — interactions (no dependencies).
(function () {
  "use strict";

  // Reveal-on-scroll (progressive enhancement; content is visible without JS).
  var revealables = document.querySelectorAll(".section, .hero__inner, .trust__inner");
  revealables.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("in"); });
  }

  // Nav: solid background once scrolled past the hero top.
  var nav = document.querySelector(".nav");
  var onScroll = function () {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Burger menu (morphs to X via CSS on body.menu-open).
  var burger = document.querySelector(".nav__burger");
  if (burger) {
    var toggle = function (open) {
      document.body.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    };
    burger.addEventListener("click", function () {
      toggle(!document.body.classList.contains("menu-open"));
    });
    document.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () { toggle(false); });
    });
  }

  // Logo click -> smooth scroll to top.
  document.querySelectorAll('.brand[href="#top"]').forEach(function (brand) {
    brand.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.classList.remove("menu-open");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
})();
