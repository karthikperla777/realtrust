const API_URL = 'http://localhost:5000/api';

// Tab Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.getAttribute('data-tab');
    switchTab(tabName);
  });
});

function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active from all nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  document.getElementById(`${tabName}-tab`).classList.add('active');
  
  // Mark nav button as active
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  
  // Reset forms and show lists for each tab
  if (tabName === 'projects') {
    projectForm.classList.add('hidden');
    projectsList.classList.remove('hidden');
    loadProjects();
  }
  else if (tabName === 'clients') {
    clientForm.classList.add('hidden');
    clientsList.classList.remove('hidden');
    loadClients();
  }
  else if (tabName === 'contacts') {
    loadContacts();
  }
  else if (tabName === 'newsletter') {
    loadNewsletterSubscribers();
  }
}

// ===== PROJECTS MANAGEMENT =====
const projectFormEl = document.getElementById('projectFormEl');
const addProjectBtn = document.getElementById('addProjectBtn');
const cancelProjectBtn = document.getElementById('cancelProjectBtn');
const projectForm = document.getElementById('projectForm');
const projectsList = document.getElementById('projectsList');
const projectImage = document.getElementById('projectImage');
const projectImagePreview = document.getElementById('projectImagePreview');

addProjectBtn.addEventListener('click', () => {
  projectForm.classList.remove('hidden');
  projectsList.classList.add('hidden');
  projectFormEl.reset();
  projectImagePreview.classList.add('hidden');
});

cancelProjectBtn.addEventListener('click', () => {
  projectForm.classList.add('hidden');
  projectsList.classList.remove('hidden');
  projectFormEl.reset();
  projectImagePreview.classList.add('hidden');
});

// Image preview for projects
projectImage.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      document.getElementById('projectPreviewImg').src = event.target.result;
      projectImagePreview.classList.remove('hidden');
      // Set default crop dimensions
      document.getElementById('projectCropWidth').value = '450';
      document.getElementById('projectCropHeight').value = '350';
    };
    reader.readAsDataURL(file);
  }
});

projectFormEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('name', document.getElementById('projectName').value);
  formData.append('description', document.getElementById('projectDesc').value);
  formData.append('image', projectImage.files[0]);
  
  // Add crop data if provided
  const cropX = document.getElementById('projectCropX').value;
  const cropY = document.getElementById('projectCropY').value;
  const cropWidth = document.getElementById('projectCropWidth').value;
  const cropHeight = document.getElementById('projectCropHeight').value;
  
  if (cropX && cropY && cropWidth && cropHeight) {
    formData.append('cropX', cropX);
    formData.append('cropY', cropY);
    formData.append('cropWidth', cropWidth);
    formData.append('cropHeight', cropHeight);
  }

  try {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert('Project added successfully!');
      projectForm.classList.add('hidden');
      projectsList.classList.remove('hidden');
      projectFormEl.reset();
      projectImagePreview.classList.add('hidden');
      loadProjects();
    } else {
      const error = await response.json();
      alert('Error: ' + error.error);
    }
  } catch (error) {
    console.error('Error adding project:', error);
    alert('Error adding project');
  }
});

async function loadProjects() {
  try {
    const response = await fetch(`${API_URL}/projects`);
    const projects = await response.json();
    
    const container = document.getElementById('projectsList');
    
    if (projects.length === 0) {
      container.innerHTML = '<p class="loading">No projects yet</p>';
      return;
    }

    container.innerHTML = projects.map(project => `
      <div class="item-card">
        <img src="${project.image}" alt="${project.name}">
        <div class="item-card-content">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <div class="card-actions">
            <button class="btn btn-danger" onclick="deleteProject(${project.id})">Delete</button>
          </div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading projects:', error);
    document.getElementById('projectsList').innerHTML = '<p class="loading">Error loading projects</p>';
  }
}

async function deleteProject(id) {
  if (!confirm('Are you sure you want to delete this project?')) return;
  
  try {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Project deleted successfully');
      loadProjects();
    } else {
      alert('Error deleting project');
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    alert('Error deleting project');
  }
}

// ===== CLIENTS MANAGEMENT =====
const clientFormEl = document.getElementById('clientFormEl');
const addClientBtn = document.getElementById('addClientBtn');
const cancelClientBtn = document.getElementById('cancelClientBtn');
const clientForm = document.getElementById('clientForm');
const clientsList = document.getElementById('clientsList');
const clientImage = document.getElementById('clientImage');
const clientImagePreview = document.getElementById('clientImagePreview');

addClientBtn.addEventListener('click', () => {
  clientForm.classList.remove('hidden');
  clientsList.classList.add('hidden');
  clientFormEl.reset();
  clientImagePreview.classList.add('hidden');
});

cancelClientBtn.addEventListener('click', () => {
  clientForm.classList.add('hidden');
  clientsList.classList.remove('hidden');
  clientFormEl.reset();
  clientImagePreview.classList.add('hidden');
});

// Image preview for clients
clientImage.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      document.getElementById('clientPreviewImg').src = event.target.result;
      clientImagePreview.classList.remove('hidden');
      // Set default crop dimensions
      document.getElementById('clientCropWidth').value = '450';
      document.getElementById('clientCropHeight').value = '350';
    };
    reader.readAsDataURL(file);
  }
});

clientFormEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('name', document.getElementById('clientName').value);
  formData.append('description', document.getElementById('clientDesc').value);
  formData.append('designation', document.getElementById('clientDesignation').value);
  formData.append('image', clientImage.files[0]);
  
  // Add crop data if provided
  const cropX = document.getElementById('clientCropX').value;
  const cropY = document.getElementById('clientCropY').value;
  const cropWidth = document.getElementById('clientCropWidth').value;
  const cropHeight = document.getElementById('clientCropHeight').value;
  
  if (cropX && cropY && cropWidth && cropHeight) {
    formData.append('cropX', cropX);
    formData.append('cropY', cropY);
    formData.append('cropWidth', cropWidth);
    formData.append('cropHeight', cropHeight);
  }

  try {
    const response = await fetch(`${API_URL}/clients`, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert('Client added successfully!');
      clientForm.classList.add('hidden');
      clientsList.classList.remove('hidden');
      clientFormEl.reset();
      clientImagePreview.classList.add('hidden');
      loadClients();
    } else {
      const error = await response.json();
      alert('Error: ' + error.error);
    }
  } catch (error) {
    console.error('Error adding client:', error);
    alert('Error adding client');
  }
});

async function loadClients() {
  try {
    const response = await fetch(`${API_URL}/clients`);
    const clients = await response.json();
    
    const container = document.getElementById('clientsList');
    
    if (clients.length === 0) {
      container.innerHTML = '<p class="loading">No clients yet</p>';
      return;
    }

    container.innerHTML = clients.map(client => `
      <div class="item-card">
        <img src="${client.image}" alt="${client.name}">
        <div class="item-card-content">
          <h3>${client.name}</h3>
          <span class="designation">${client.designation}</span>
          <p>${client.description}</p>
          <div class="card-actions">
            <button class="btn btn-danger" onclick="deleteClient(${client.id})">Delete</button>
          </div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading clients:', error);
    document.getElementById('clientsList').innerHTML = '<p class="loading">Error loading clients</p>';
  }
}

async function deleteClient(id) {
  if (!confirm('Are you sure you want to delete this client?')) return;
  
  try {
    const response = await fetch(`${API_URL}/clients/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Client deleted successfully');
      loadClients();
    } else {
      alert('Error deleting client');
    }
  } catch (error) {
    console.error('Error deleting client:', error);
    alert('Error deleting client');
  }
}

// ===== CONTACTS MANAGEMENT =====
async function loadContacts() {
  try {
    const response = await fetch(`${API_URL}/contacts`);
    const contacts = await response.json();
    
    const tbody = document.getElementById('contactsTableBody');
    
    if (contacts.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="loading">No contact submissions yet</td></tr>';
      return;
    }

    tbody.innerHTML = contacts.map(contact => `
      <tr>
        <td>${contact.full_name}</td>
        <td>${contact.email}</td>
        <td>${contact.mobile_number}</td>
        <td>${contact.city}</td>
        <td>${new Date(contact.created_at).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteContact(${contact.id})">Delete</button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading contacts:', error);
    document.getElementById('contactsTableBody').innerHTML = '<tr><td colspan="6" class="loading">Error loading contacts</td></tr>';
  }
}

async function deleteContact(id) {
  if (!confirm('Are you sure you want to delete this contact?')) return;
  
  try {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      loadContacts();
    } else {
      alert('Error deleting contact');
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
    alert('Error deleting contact');
  }
}

// ===== NEWSLETTER MANAGEMENT =====
async function loadNewsletterSubscribers() {
  try {
    const response = await fetch(`${API_URL}/newsletter`);
    const subscribers = await response.json();
    
    const tbody = document.getElementById('newsletterTableBody');
    
    if (subscribers.length === 0) {
      tbody.innerHTML = '<tr><td colspan="3" class="loading">No subscribers yet</td></tr>';
      return;
    }

    tbody.innerHTML = subscribers.map(subscriber => `
      <tr>
        <td>${subscriber.email}</td>
        <td>${new Date(subscriber.created_at).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteSubscriber(${subscriber.id})">Delete</button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading subscribers:', error);
    document.getElementById('newsletterTableBody').innerHTML = '<tr><td colspan="3" class="loading">Error loading subscribers</td></tr>';
  }
}

async function deleteSubscriber(id) {
  if (!confirm('Are you sure you want to delete this subscriber?')) return;
  
  try {
    const response = await fetch(`${API_URL}/newsletter/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      loadNewsletterSubscribers();
    } else {
      alert('Error deleting subscriber');
    }
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    alert('Error deleting subscriber');
  }
}

// Load initial data
loadProjects();
