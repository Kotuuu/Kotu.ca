// src/js/projects.js
document.addEventListener('DOMContentLoaded', () => {
  const projectsGrid = document.querySelector('.projects-grid');
  const jsonPath = 'projects.json'; // adjust path if needed

  fetch(jsonPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(projects => {
      if (!Array.isArray(projects)) {
        throw new Error('projects.json did not return an array');
      }

      // Shuffle the array and take the first two entries
      const shuffled = projects.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 2);

      // Build HTML for the two selected projects
      let html = '';
      selected.forEach(project => {
        html += '<div class="card project-card">';
        
        // Title
        if (project.title) {
          html += `<h3>${project.title}</h3>`;
        }

        // Year
        if (project.year) {
          html += `<p class="project-year">Year: ${project.year}</p>`;
        }

        // Description
        if (project.description) {
          html += `<p>${project.description}</p>`;
        }

        // Details
        if (Array.isArray(project.details) && project.details.length) {
          html += '<ul class="project-details">';
          project.details.forEach(item => {
            html += `<li>${item}</li>`;
          });
          html += '</ul>';
        }

        // Technologies
        if (Array.isArray(project.technologies) && project.technologies.length) {
          html += `<p class="project-tech"><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>`;
        }

        // Link (if provided in JSON; otherwise omit)
        if (project.link) {
          html += `<a class="btn btn-secondary" href="${project.link}" target="_blank" rel="noopener noreferrer">View Project</a>`;
        }

        html += '</div>';
      });

      // Insert the generated HTML into the grid container
      projectsGrid.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading projects:', error);
      projectsGrid.innerHTML = '<p>Unable to load projects at this time.</p>';
    });
});
