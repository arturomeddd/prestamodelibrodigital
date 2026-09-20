document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const pills = document.querySelectorAll('.pill');
  const articles = document.querySelectorAll('.featured-post, .post-card');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');

  // 1. Control del Menú Hamburguesa en Móviles
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // 2. Filtrado de Artículos por Categoría
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Cambiar estado activo en los botones
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const selectedCategory = pill.getAttribute('data-category');

      articles.forEach(article => {
        const articleCategory = article.getAttribute('data-category');

        if (selectedCategory === 'todas' || articleCategory === selectedCategory) {
          article.style.display = 'flex';
        } else {
          article.style.display = 'none';
        }
      });
    });
  });

  // 3. Buscador en Tiempo Real por Título / Extracto
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => e.preventDefault());

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();

      articles.forEach(article => {
        const titleText = article.querySelector('.post-title, .card-title').textContent.toLowerCase();
        const excerptText = article.querySelector('.post-excerpt, .card-excerpt').textContent.toLowerCase();

        if (titleText.includes(query) || excerptText.includes(query)) {
          article.style.display = 'flex';
        } else {
          article.style.display = 'none';
        }
      });
    });
  }
});
