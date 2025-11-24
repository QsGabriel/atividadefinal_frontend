/**
 * MAIN JAVASCRIPT
 * Funcionalidades gerais e inicializações
 */

(function() {
  'use strict';

  // ===== LOADING STATE =====
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // ===== PREVENT DEFAULT BEHAVIORS =====
  const init = () => {
    // Prevenir comportamento padrão de links vazios
    const emptyLinks = document.querySelectorAll('a[href="#"]');
    emptyLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
      });
    });
  };

  // ===== ACCESSIBILITY: Focus Visible =====
  const handleFocusVisible = () => {
    let isUsingKeyboard = false;

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        isUsingKeyboard = true;
      }
    });

    document.addEventListener('mousedown', () => {
      isUsingKeyboard = false;
    });

    document.addEventListener('focusin', (e) => {
      if (isUsingKeyboard) {
        e.target.classList.add('focus-visible');
      }
    });

    document.addEventListener('focusout', (e) => {
      e.target.classList.remove('focus-visible');
    });
  };

  // ===== LAZY LOADING IMAGES =====
  const initLazyLoading = () => {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  };

  // ===== EXTERNAL LINKS =====
  const handleExternalLinks = () => {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
      // Garantir segurança
      if (!link.hasAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  };

  // ===== COPY TO CLIPBOARD =====
  const initCopyToClipboard = () => {
    const copyButtons = document.querySelectorAll('[data-copy]');

    copyButtons.forEach(button => {
      button.addEventListener('click', async () => {
        const text = button.dataset.copy;
        
        try {
          await navigator.clipboard.writeText(text);
          
          // Feedback visual
          const originalText = button.textContent;
          button.textContent = 'Copiado!';
          button.classList.add('copied');
          
          setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
          }, 2000);
        } catch (error) {
          console.error('Erro ao copiar:', error);
        }
      });
    });
  };

  // ===== PRINT CONSOLE INFO =====
  const printConsoleInfo = () => {
    const styles = [
      'color: #2563eb',
      'font-size: 16px',
      'font-weight: bold',
      'padding: 10px'
    ].join(';');

    console.log('%c🚀 Portfólio Gabriel Queiroz', styles);
    console.log('%cDesenvolvido com HTML5, CSS3 e JavaScript', 'color: #808080');
    console.log('%cGitHub: https://github.com/QsGabriel', 'color: #0A1F44');
  };

  // ===== EASTER EGG: KONAMI CODE =====
  const initKonamiCode = () => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
          activateEasterEgg();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    });
  };

  const activateEasterEgg = () => {
    console.log('%c🎮 Konami Code Ativado!', 'color: #FFD700; font-size: 20px; font-weight: bold');
    
    // Adicionar efeito especial
    document.body.style.animation = 'rainbow 5s infinite';
    
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  };

  // ===== PERFORMANCE MONITORING =====
  const monitorPerformance = () => {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          const loadTime = perfData.loadEventEnd - perfData.fetchStart;
          
          console.log(`⚡ Página carregada em ${loadTime.toFixed(0)}ms`);
        }, 0);
      });
    }
  };

  // ===== INITIALIZE ALL =====
  document.addEventListener('DOMContentLoaded', () => {
    init();
    handleFocusVisible();
    initLazyLoading();
    handleExternalLinks();
    initCopyToClipboard();
    printConsoleInfo();
    initKonamiCode();
    monitorPerformance();
  });

  // ===== SERVICE WORKER (PWA) =====
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('✅ Service Worker registrado:', registration.scope);
        })
        .catch(error => {
          console.log('❌ Erro ao registrar Service Worker:', error);
        });
    });
  }
})();
