// Use relative API URLs for deployment compatibility
const API_URL = '/api';

// Load projects
async function loadProjects() {
  try {
    const response = await fetch(`${API_URL}/projects`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projects = await response.json();
    
    const container = document.getElementById('projectsContainer');
    
    if (projects.length === 0) {
      container.innerHTML = '<p class="loading">No projects available yet</p>';
      return;
    }

    container.innerHTML = projects.map((project, index) => `
      <div class="project-card">
        <img src="${project.image}" alt="${project.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22450%22 height=%22350%22%3E%3Crect fill=%22%23ddd%22 width=%22450%22 height=%22350%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2216%22 fill=%22%23999%22%3EImage not found%3C/text%3E%3C/svg%3E'">
        <div class="project-card-content">
          <h3>${project.name}</h3>
          <p class="project-location">Project name, location</p>
          <button class="btn btn-orange">Read More</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading projects:', error);
    document.getElementById('projectsContainer').innerHTML = '<p class="loading">Error loading projects</p>';
  }
}

// Load clients
async function loadClients() {
  try {
    const response = await fetch(`${API_URL}/clients`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const clients = await response.json();
    
    const container = document.getElementById('clientsContainer');
    
    if (clients.length === 0) {
      container.innerHTML = '<p class="loading">No clients available yet</p>';
      return;
    }

    container.innerHTML = clients.map(client => `
      <div class="client-card">
        <img src="${client.image}" alt="${client.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Ccircle cx=%2260%22 cy=%2260%22 r=%2260%22 fill=%22%23ddd%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2214%22 fill=%22%23999%22%3ENo Image%3C/text%3E%3C/svg%3E'">
        <h3>${client.name}</h3>
        <p class="designation">${client.designation}</p>
        <p>${client.description}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading clients:', error);
    document.getElementById('clientsContainer').innerHTML = '<p class="loading">Error loading clients</p>';
  }
}

// Handle contact form submission
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    full_name: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    mobile_number: document.getElementById('mobile').value,
    city: document.getElementById('city').value
  };

  try {
    const response = await fetch(`${API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const messageEl = document.getElementById('contactMessage');
    
    if (response.ok) {
      messageEl.textContent = 'Thank you! Your message has been sent successfully.';
      messageEl.classList.add('success');
      messageEl.classList.remove('hidden', 'error');
      document.getElementById('contactForm').reset();
      
      setTimeout(() => {
        messageEl.classList.add('hidden');
      }, 5000);
    } else {
      const error = await response.json();
      messageEl.textContent = 'Error: ' + (error.error || 'Failed to send message');
      messageEl.classList.add('error');
      messageEl.classList.remove('hidden', 'success');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    const messageEl = document.getElementById('contactMessage');
    messageEl.textContent = 'Error sending message. Please try again.';
    messageEl.classList.add('error');
    messageEl.classList.remove('hidden', 'success');
  }
});

// Handle newsletter subscription
document.getElementById('newsletterForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = e.target.querySelector('input[name="email"]').value;

  try {
    const response = await fetch(`${API_URL}/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    const messageEl = document.getElementById('newsletterMessage');
    
    if (response.ok) {
      messageEl.textContent = 'Successfully subscribed to newsletter!';
      messageEl.classList.add('success');
      messageEl.classList.remove('hidden', 'error');
      e.target.reset();
      
      setTimeout(() => {
        messageEl.classList.add('hidden');
      }, 5000);
    } else {
      const error = await response.json();
      messageEl.textContent = 'Error: ' + (error.error || 'Failed to subscribe');
      messageEl.classList.add('error');
      messageEl.classList.remove('hidden', 'success');
    }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    const messageEl = document.getElementById('newsletterMessage');
    messageEl.textContent = 'Error subscribing. Please try again.';
    messageEl.classList.add('error');
    messageEl.classList.remove('hidden', 'success');
  }
});

// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  loadClients();
  
  // Contact Modal Functionality
  const contactBtn = document.getElementById('contactBtn');
  const footerContactBtn = document.getElementById('footerContactBtn');
  const footerHomeBtn = document.getElementById('footerHomeBtn');
  const contactModal = document.getElementById('contactModal');
  const closeContactModal = document.getElementById('closeContactModal');
  
  // Function to open contact modal
  const openContactModal = () => {
    contactModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  };
  
  // Function to close contact modal
  const closeModal = () => {
    contactModal.classList.remove('show');
    document.body.style.overflow = 'auto';
  };
  
  // Top contact button
  if (contactBtn) {
    contactBtn.addEventListener('click', openContactModal);
  }
  
  // Footer contact button
  if (footerContactBtn) {
    footerContactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal();
    });
  }
  
  // Footer home button - scroll to top
  if (footerHomeBtn) {
    footerHomeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Close button
  if (closeContactModal) {
    closeContactModal.addEventListener('click', closeModal);
  }
  
  // Click outside modal to close
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        closeModal();
      }
    });
  }
});
