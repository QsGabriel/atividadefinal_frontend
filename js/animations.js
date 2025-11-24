/**
 * ANIMATIONS
 * Funcionalidades:
 * - Intersection Observer para animações de scroll
 * - Animações customizadas
 */

(function() {
  'use strict';

  // ===== SCROLL REVEAL ANIMATIONS =====
  const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('[data-scroll-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  };

  // ===== TYPING EFFECT (Hero Title) =====
  const initTypingEffect = () => {
    const heroName = document.querySelector('.hero-name');
    if (!heroName) return;

    const text = heroName.textContent;
    heroName.textContent = '';
    heroName.style.borderRight = '2px solid #2563eb';
    
    let charIndex = 0;
    
    const typeChar = () => {
      if (charIndex < text.length) {
        heroName.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, 100);
      } else {
        setTimeout(() => {
          heroName.style.borderRight = 'none';
        }, 500);
      }
    };

    // Iniciar após pequeno delay
    setTimeout(typeChar, 500);
  };

  // ===== COUNTER ANIMATION =====
  const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          animateCounter(entry.target);
          entry.target.classList.add('counted');
        }
      });
    }, {
      threshold: 0.5
    });

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  };

  const animateCounter = (element) => {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      
      if (current < target) {
        element.textContent = Math.ceil(current) + '+';
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + '+';
      }
    };

    updateCounter();
  };

  // ===== PARALLAX EFFECT =====
  const initParallax = () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
      parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  };

  // ===== HOVER TILT EFFECT =====
  const initTiltEffect = () => {
    const tiltElements = document.querySelectorAll('.skill-card, .portfolio-card');

    tiltElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  };

  // ===== INITIALIZE ALL ANIMATIONS =====
  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    // initTypingEffect(); // Comentado para não interferir com o texto original
    animateCounters();
    // initParallax(); // Comentado - ativar se necessário
    initTiltEffect();
  });
})();
