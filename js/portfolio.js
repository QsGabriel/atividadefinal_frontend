/**
 * PORTFOLIO
 * Funcionalidades:
 * - Carregamento de projetos via JSON
 * - Filtro de categorias
 * - Sistema de favoritos com LocalStorage
 * - Load more functionality
 */

(function() {
  'use strict';

  const portfolioGrid = document.getElementById('portfolioGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  let allProjects = [];
  let currentFilter = 'all';
  let displayedProjects = 6;
  const projectsPerLoad = 3;

  // ===== FETCH PROJECTS FROM JSON =====
  const fetchProjects = async () => {
    try {
      const response = await fetch('data/projects.json');
      if (!response.ok) throw new Error('Erro ao carregar projetos');
      
      const data = await response.json();
      allProjects = data.projects;
      
      displayProjects();
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
      portfolioGrid.innerHTML = `
        <div class="error-message">
          <p>Erro ao carregar projetos. Por favor, tente novamente mais tarde.</p>
        </div>
      `;
    }
  };

  // ===== DISPLAY PROJECTS =====
  const displayProjects = () => {
    if (!portfolioGrid) return;

    const filteredProjects = currentFilter === 'all' 
      ? allProjects 
      : allProjects.filter(project => project.category === currentFilter);

    const projectsToShow = filteredProjects.slice(0, displayedProjects);

    portfolioGrid.innerHTML = projectsToShow.map(project => createProjectCard(project)).join('');

    // Mostrar/ocultar botão "Load More"
    if (loadMoreBtn) {
      loadMoreBtn.style.display = filteredProjects.length > displayedProjects ? 'inline-flex' : 'none';
    }

    // Adicionar event listeners aos botões de favorito
    attachFavoriteListeners();
  };

  // ===== CREATE PROJECT CARD =====
  const createProjectCard = (project) => {
    const isFavorited = isFavorite(project.id);
    
    return `
      <article class="portfolio-card" data-category="${project.category}">
        <img src="${project.image}" alt="${project.title}" class="portfolio-image" loading="lazy">
        
        <button 
          class="favorite-btn ${isFavorited ? 'favorited' : ''}" 
          data-project-id="${project.id}"
          aria-label="${isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
        >
          <i class="fas fa-star"></i>
        </button>
        
        <div class="portfolio-overlay">
          <h3 class="portfolio-title">${project.title}</h3>
          <p class="portfolio-category">${getCategoryName(project.category)}</p>
          <p class="portfolio-description">${project.description}</p>
          
          <div class="portfolio-tags">
            ${project.tags.map(tag => `<span class="portfolio-tag">${tag}</span>`).join('')}
          </div>
          
          <div class="portfolio-links">
            ${project.liveUrl ? `
              <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="portfolio-link" aria-label="Ver projeto ao vivo">
                <i class="fas fa-external-link-alt"></i>
                <span>Demo</span>
              </a>
            ` : ''}
            ${project.githubUrl ? `
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="portfolio-link" aria-label="Ver código no GitHub">
                <i class="fab fa-github"></i>
                <span>Code</span>
              </a>
            ` : ''}
          </div>
        </div>
      </article>
    `;
  };

  // ===== FILTER PROJECTS =====
  const filterProjects = (category) => {
    currentFilter = category;
    displayedProjects = 6;
    displayProjects();

    // Atualizar botões ativos
    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === category);
    });
  };

  // ===== LOAD MORE PROJECTS =====
  const loadMoreProjects = () => {
    displayedProjects += projectsPerLoad;
    displayProjects();
  };

  // ===== FAVORITES SYSTEM (LocalStorage) =====
  const getFavorites = () => {
    const favorites = localStorage.getItem('portfolioFavorites');
    return favorites ? JSON.parse(favorites) : [];
  };

  const saveFavorites = (favorites) => {
    localStorage.setItem('portfolioFavorites', JSON.stringify(favorites));
  };

  const isFavorite = (projectId) => {
    const favorites = getFavorites();
    return favorites.includes(projectId);
  };

  const toggleFavorite = (projectId) => {
    let favorites = getFavorites();
    
    if (favorites.includes(projectId)) {
      favorites = favorites.filter(id => id !== projectId);
    } else {
      favorites.push(projectId);
    }
    
    saveFavorites(favorites);
    return favorites.includes(projectId);
  };

  const attachFavoriteListeners = () => {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = parseInt(btn.dataset.projectId);
        const isFavorited = toggleFavorite(projectId);
        
        btn.classList.toggle('favorited', isFavorited);
        btn.setAttribute('aria-label', isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
        
        // Feedback visual
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => {
          btn.style.transform = '';
        }, 200);
      });
    });
  };

  // ===== HELPER FUNCTIONS =====
  const getCategoryName = (category) => {
    const categories = {
      'web': 'Web App',
      'design': 'UI/UX Design',
      'landing': 'Landing Page'
    };
    return categories[category] || category;
  };

  // ===== EVENT LISTENERS =====
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterProjects(btn.dataset.filter);
    });
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMoreProjects);
  }

  // ===== INITIALIZE =====
  document.addEventListener('DOMContentLoaded', fetchProjects);
})();
