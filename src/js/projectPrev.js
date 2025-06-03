document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.querySelector('.projects-grid');
    const jsonPath = 'projects.json'; // since projects.json is in the same folder as projects.html
  
    fetch(jsonPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((projects) => {
        if (!Array.isArray(projects)) {
          throw new Error('projects.json did not return an array');
        }
  
        let html = '';
        projects.forEach((project) => {
          let cardHTML = '<div class="card project-card">';
  
          // Title
          if (project.title) {
            cardHTML += `<h3>${project.title}</h3>`;
          }
  
          // Year
          if (project.year) {
            cardHTML += `<p class="project-year">Year: ${project.year}</p>`;
          }
  
          // Description
          if (project.description) {
            cardHTML += `<p>${project.description}</p>`;
          }
  
          // Details
          if (Array.isArray(project.details) && project.details.length) {
            cardHTML += '<ul class="project-details">';
            project.details.forEach((item) => {
              cardHTML += `<li>${item}</li>`;
            });
            cardHTML += '</ul>';
          }
  
          // Technologies
          if (Array.isArray(project.technologies) && project.technologies.length) {
            cardHTML += `<p class="project-tech"><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>`;
          }
  
          // Link
          if (project.link) {
            cardHTML += `<a class="btn btn-secondary" href="${project.link}" target="_blank" rel="noopener noreferrer">View Project</a>`;
          }
  
          cardHTML += '</div>';
          html += cardHTML;
        });
  
        projectsGrid.innerHTML = html;
      })
      .catch((error) => {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = '<p>Unable to load projects at this time.</p>';
      });
  });
  