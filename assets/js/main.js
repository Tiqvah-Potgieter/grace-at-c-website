const reveals = document.querySelectorAll('.reveal');

const revealIfInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const inView = rect.top < viewportHeight * 0.9 && rect.bottom > 0;

  if (inView) {
    element.classList.add('visible');
    return true;
  }

  return false;
};

if ('IntersectionObserver' in window) {
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

    // Safari can occasionally skip the initial observer callback until first scroll.
    if (!revealIfInViewport(element)) {
      observer.observe(element);
    }
  });

  // Safety pass after initial paint for mobile browsers.
  window.setTimeout(() => {
    reveals.forEach((element) => {
      if (!element.classList.contains('visible')) {
        revealIfInViewport(element);
      }
    });
  }, 250);
} else {
  reveals.forEach((element, index) => {
    element.style.transitionDelay = `${index * 120}ms`;
    element.classList.add('visible');
  });
}
