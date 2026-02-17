const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = [...sectionLinks].map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

window.addEventListener('scroll', () => {
  const point = window.scrollY + 120;
  sections.forEach((section) => {
    const link = document.querySelector(`.nav-links a[href="#${section.id}"]`);
    if (!link) return;
    if (point >= section.offsetTop && point < section.offsetTop + section.offsetHeight) {
      sectionLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});
