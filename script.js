// ---- EDIT ME: your details ----
const OWNER = { name: "Your Name", email: "hello@example.com" };

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme: respect saved + system preference
const root = document.documentElement;
const saved = localStorage.getItem("theme");
if (saved) root.dataset.theme = saved;
else if (matchMedia("(prefers-color-scheme: light)").matches) root.dataset.theme = "light";

document.getElementById("themeToggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", root.dataset.theme);
});

// Mobile menu
const navLinks = document.getElementById("navLinks");
document.getElementById("menuBtn").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.addEventListener("click", (e) => { if (e.target.tagName === "A") navLinks.classList.remove("open"); });

// Typing effect
const phrases = ["React apps.", "REST APIs.", "clean UIs.", "fast sites."];
const typedEl = document.getElementById("typed");
let pi = 0, ci = 0, del = false;
(function type() {
  const p = phrases[pi];
  typedEl.textContent = p.slice(0, ci);
  if (!del && ci < p.length) ci++;
  else if (!del && ci === p.length) { del = true; return setTimeout(type, 1400); }
  else if (del && ci > 0) ci--;
  else { del = false; pi = (pi + 1) % phrases.length; }
  setTimeout(type, del ? 40 : 70);
})();

// Scroll reveal
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Project filters
document.getElementById("filterRow").addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  btn.classList.add("active");
  const f = btn.dataset.filter;
  document.querySelectorAll(".project").forEach((p) => {
    p.classList.toggle("hide", f !== "all" && p.dataset.cat !== f);
  });
});

// Contact form (frontend demo — wire to Formspree / backend later)
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const msg = document.getElementById("formMsg");
  if (!fd.get("name") || !fd.get("email") || !fd.get("message")) {
    msg.textContent = "Please fill in all fields.";
    return;
  }
  msg.textContent = `Thanks ${fd.get("name")}! Demo form — connect it to Formspree or your backend to receive messages at ${OWNER.email}.`;
  e.target.reset();
});
