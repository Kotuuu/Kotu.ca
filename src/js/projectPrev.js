document.addEventListener('DOMContentLoaded', async () => {
  const projectsGrid = document.querySelector('.projects-grid');
  const jsonPath = 'projects.json';

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const projects = await response.json();
    if (!Array.isArray(projects)) throw new Error('projects.json did not return an array');

    projectsGrid.innerHTML = projects.map(project => {
      const {
        title = '',
        year = '',
        description = '',
        details = [],
        technologies = [],
        link = ''
      } = project;

      const detailsHTML = Array.isArray(details) && details.length
        ? `<ul class="project-details">${details.map(item => `<li>${item}</li>`).join('')}</ul>`
        : '';

      const technologiesHTML = technologies.length
        ? `<div style="height: 1rem;"></div><p class="project-tech"><strong>Technologies:</strong> ${technologies.join(', ')}</p>`
        : '';

      return `
        <div class="card project-card">
          ${title ? `<h3>${title}</h3>` : ''}
          ${year ? `<p class="project-year">Year: ${year}</p>` : ''}
          ${description ? `<p>${description}</p>` : ''}
          ${detailsHTML}
          ${technologiesHTML}
          ${link ? `<a class="btn btn-secondary" href="${link}" target="_blank" rel="noopener noreferrer">View Project</a>` : ''}
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error('Error loading projects:', error);
    projectsGrid.innerHTML = '<p>Unable to load projects at this time.</p>';
  }
});