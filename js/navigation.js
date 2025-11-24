/**
 * NAVIGATION
 * Funcionalidades:
 * - Navegação responsiva (mobile menu)
 * - Header com efeito de scroll
 * - Fechamento de menu ao clicar em link
 */

(function() {
  'use strict';

  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Atualizar ARIA
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
    
    // Prevenir scroll quando menu está aberto
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Fechar menu ao clicar em link
  const closeMobileMenu = () => {
    if (hamburger.classList.contains('active')) {
      toggleMobileMenu();
    }
  };

  // Header Scroll Effect
  const handleScroll = () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Highlight Active Navigation Link
  const highlightActiveLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        correspondingLink?.classList.add('active');
      } else {
        correspondingLink?.classList.remove('active');
      }
    });
  };

  // Event Listeners
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('scroll', () => {
    handleScroll();
    highlightActiveLink();
  });

  // Fechar menu ao pressionar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('active')) {
      toggleMobileMenu();
    }
  });

  // Inicializar
  handleScroll();
  highlightActiveLink();
})();
