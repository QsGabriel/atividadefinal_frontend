/**
 * SCROLL FUNCTIONALITY
 * Funcionalidades:
 * - Smooth scroll para links internos
 * - Scroll progress indicator
 * - Back to top button
 * - Scroll reveal animations
 */

(function() {
  'use strict';

  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  // ===== SMOOTH SCROLL =====
  const initSmoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Verificar se é apenas '#' ou se o elemento existe
        if (href === '#' || href === '#!') {
          e.preventDefault();
          return;
        }

        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // ===== SCROLL PROGRESS INDICATOR =====
  const updateScrollProgress = () => {
    if (!scrollProgress) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    scrollProgress.style.width = `${scrollPercentage}%`;
  };

  // ===== BACK TO TOP BUTTON =====
  const handleBackToTop = () => {
    if (!backToTop) return;

    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealOnScroll = () => {
    const reveals = document.querySelectorAll('[data-scroll-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Opcional: parar de observar após revelar
          // revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(element => {
      revealObserver.observe(element);
    });
  };

  // ===== EVENT LISTENERS =====
  window.addEventListener('scroll', () => {
    updateScrollProgress();
    handleBackToTop();
  });

  if (backToTop) {
    backToTop.addEventListener('click', scrollToTop);
  }

  // ===== INITIALIZE =====
  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    revealOnScroll();
    updateScrollProgress();
    handleBackToTop();
  });
})();
