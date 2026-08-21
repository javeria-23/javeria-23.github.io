const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");
const backTop = document.querySelector(".back-top");
const sections = document.querySelectorAll("main section[id]");
const revealEls = document.querySelectorAll(".reveal");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

navItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
  backTop.classList.toggle("show", window.scrollY > 500);

  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  navItems.forEach(item => item.classList.toggle("active", item.getAttribute("href") === `#${current}`));
});

backTop.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

revealEls.forEach(el => observer.observe(el));

const phrases = [
  "Computer Science Student",
  "Data Science & Research Enthusiast",
  "Healthcare Analytics Learner"
];

const typing = document.getElementById("typing");
let phraseIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const phrase = phrases[phraseIndex];
  typing.textContent = phrase.slice(0, charIndex);

  if (!deleting && charIndex < phrase.length) {
    charIndex++;
    setTimeout(typeLoop, 70);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typeLoop, 1700);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(typeLoop, 35);
  } else {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeLoop, 350);
  }
}
typeLoop();
