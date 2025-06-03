document.addEventListener('DOMContentLoaded', () => {
  // 1. Fetch the JSON file (adjust path if your JSON is somewhere else)
  fetch('projects.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // 2. Shuffle the array and take the first two entries
      const shuffled = data.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 2);

      // 3. Find the container inside #projects
      const container = document.querySelector('#projects .container');
      if (!container) {
        console.error('Could not find #projects .container in the DOM');
        return;
      }

      // 4. Remove any existing .card elements under that container
      container.querySelectorAll('.card').forEach(card => card.remove());

      // 5. For each of the two selected projects, create a new .card
      selected.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-4');

        // Title
        const titleEl = document.createElement('h3');
        titleEl.textContent = project.title;
        card.appendChild(titleEl);

        // Description
        const descEl = document.createElement('p');
        descEl.textContent = project.description;
        card.appendChild(descEl);

        // “View Project” button (update href if you have a real link)
        const linkEl = document.createElement('a');
        linkEl.href = 'projects.html';
        linkEl.classList.add('btn', 'btn-secondary');
        linkEl.textContent = 'View Project';
        card.appendChild(linkEl);

        // Append the new card into the Projects container
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error loading projects.json:', error);
    });
});
