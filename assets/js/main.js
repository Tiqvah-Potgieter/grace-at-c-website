const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -20px 0px',
  }
);

reveals.forEach((element, index) => {
  element.style.transitionDelay = `${index * 120}ms`;
  observer.observe(element);
});
