/**
 * MEDIA INTERACTIONS
 * Funcionalidades:
 * - Controle de vídeo interativo
 * - Animação de partículas em canvas
 * - Demo interativo
 */

(function() {
  'use strict';

  // ===== VIDEO PLAYER CONTROL =====
  const videoPlayBtn = document.getElementById('videoPlayBtn');
  const videoContainer = document.getElementById('videoContainer');

  if (videoPlayBtn && videoContainer) {
    videoPlayBtn.addEventListener('click', () => {
      const iframe = videoContainer.querySelector('iframe');
      
      if (iframe) {
        // Para YouTube, adicionar autoplay ao src
        const currentSrc = iframe.src;
        if (currentSrc.includes('youtube.com')) {
          iframe.src = currentSrc + (currentSrc.includes('?') ? '&' : '?') + 'autoplay=1';
        }
        videoPlayBtn.style.display = 'none';
      }
    });
  }

  // ===== INTERACTIVE DEMO =====
  const animateBtn = document.getElementById('animateBtn');
  const resetBtn = document.getElementById('resetBtn');
  const demoElements = document.querySelectorAll('.demo-element');

  if (animateBtn && demoElements.length > 0) {
    animateBtn.addEventListener('click', () => {
      demoElements.forEach((element, index) => {
        setTimeout(() => {
          element.style.transform = 'translateY(-50px) rotate(360deg) scale(1.2)';
          element.style.borderRadius = '50%';
        }, index * 200);
      });
    });
  }

  if (resetBtn && demoElements.length > 0) {
    resetBtn.addEventListener('click', () => {
      demoElements.forEach(element => {
        element.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        element.style.borderRadius = '0.5rem';
      });
    });
  }

  // ===== PARTICLES CANVAS ANIMATION =====
  const initParticles = () => {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Connect particles
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.2 - distance / 500})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      requestAnimationFrame(animate);
    };

    animate();
  };

  // ===== INITIALIZE =====
  document.addEventListener('DOMContentLoaded', () => {
    initParticles();
  });
})();
