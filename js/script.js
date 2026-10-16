"use strict";

// edit these lists with your own skills and projects
const SKILLS = [
  { name: "Python", short: "Py", color: "#c6ff1a" },
  { name: "NumPy / Pandas", short: "Np", color: "#a97dff" },
  { name: "scikit-learn", short: "Sk", color: "#2f8cff" },
  { name: "PyTorch", short: "Pt", color: "#ff5a2e" },
  { name: "HTML / CSS", short: "Ht", color: "#ffd400" },
  { name: "JavaScript", short: "Js", color: "#2fd6a0" },
  { name: "Git", short: "Gt", color: "#ff7ab8" }
];

const PROJECTS = [
  { title: "BMW car price model", type: "Machine learning", category: "ml", img: "images/project-2.svg",
    desc: "Regression on a public BMW dataset.",
    tags: ["Pandas", "scikit-learn"], link: "#" },
  { title: "Student portfolio", type: "Web", category: "web", img: "images/project-3.svg",
    desc: "This website, made for the WAMD lab with HTML, CSS and JavaScript.",
    tags: ["HTML", "CSS", "JS"], link: "#" },
  { title: "It fills you with determination", type: "Game dev", category: "game", img: "images/project-3.svg",
    desc: "an extension of toby fox game : undertale, using godot engine.",
    tags: ["HTML", "CSS", "JS"], link: "#" }
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "ml", label: "Machine learning" },
  { key: "web", label: "Web" }
  { key: "game", label: "Game dev" }
];

const $ = (s) => document.querySelector(s);

// mobile menu
const menuBtn = $("#menu-btn");
const nav = $("nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// skills
const skillGrid = $("#skill-grid");
SKILLS.forEach((s) => {
  const card = document.createElement("div");
  card.className = "skill";
  card.style.setProperty("--c", s.color);
  card.innerHTML = `<div class="ico" aria-hidden="true">${s.short}</div><b>${s.name}</b>`;
  skillGrid.appendChild(card);
});

// projects and filter buttons
const grid = $("#project-grid");
const filterBox = $("#filters");

function renderProjects(category) {
  grid.innerHTML = "";
  PROJECTS.filter((p) => category === "all" || p.category === category).forEach((p) => {
    const card = document.createElement("article");
    card.className = "project";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title} screenshot" loading="lazy" width="400" height="240">
      <div class="body">
        <h3>${p.title}</h3>
        <p><strong>${p.type}</strong></p>
        <p>${p.desc}</p>
        <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
        <a href="${p.link}" target="_blank" rel="noopener">Code on GitHub</a>
      </div>`;
    grid.appendChild(card);
  });
}

FILTERS.forEach((f, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = f.label;
  b.dataset.key = f.key;
  if (i === 0) b.classList.add("on");
  filterBox.appendChild(b);
});
filterBox.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  filterBox.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
  btn.classList.add("on");
  renderProjects(btn.dataset.key);
});
renderProjects("all");

// highlight the current section in the nav
const links = document.querySelectorAll("#nav-links a");
const obs = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section").forEach((s) => obs.observe(s));

// contact form
const form = $("#contact-form");
const status = $("#form-status");
const rules = {
  name: (v) => (v.trim().length >= 2 ? "" : "Enter your name."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email."),
  message: (v) => (v.trim().length >= 10 ? "" : "The message is too short.")
};

function check(field) {
  const msg = rules[field.name](field.value);
  $("#err-" + field.name).textContent = msg;
  field.classList.toggle("invalid", Boolean(msg));
  return !msg;
}

form.addEventListener("input", (e) => {
  if (e.target.classList.contains("invalid")) check(e.target);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  status.textContent = "";
  const fields = [...form.querySelectorAll("input, textarea")];
  const ok = fields.map(check).every(Boolean);
  if (!ok) { fields.find((f) => f.classList.contains("invalid")).focus(); return; }
  console.log("form data:", Object.fromEntries(new FormData(form)));
  status.textContent = "Message sent.";
  form.reset();
});

$("#year").textContent = new Date().getFullYear();
