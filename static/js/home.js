// Portfolio data
const projects = [
  { id: 1, title: 'E-Commerce Platform', category: 'web', description: 'Modern online shopping experience with cart functionality', icon: '🛒' },
  { id: 2, title: 'Fitness Tracking App', category: 'mobile', description: 'Track workouts and nutrition on the go', icon: '💪' },
  { id: 3, title: 'Brand Identity Design', category: 'branding', description: 'Complete brand refresh for tech startup', icon: '🎨' },
  { id: 4, title: 'Nature Illustrations', category: 'illustration', description: 'Hand-drawn botanical artwork series', icon: '🌿' },
  { id: 5, title: 'Restaurant Website', category: 'web', description: 'Appetizing design with online reservations', icon: '🍽️' },
  { id: 6, title: 'Banking Mobile App', category: 'mobile', description: 'Secure and intuitive financial management', icon: '💳' },
  { id: 7, title: 'Coffee Shop Branding', category: 'branding', description: 'Warm and inviting brand identity', icon: '☕' },
  { id: 8, title: 'Character Design Set', category: 'illustration', description: 'Whimsical characters for children\'s book', icon: '🎭' },
  { id: 9, title: 'SaaS Dashboard', category: 'web', description: 'Analytics and reporting interface', icon: '📊' },
  { id: 10, title: 'Travel Booking App', category: 'mobile', description: 'Plan and book trips seamlessly', icon: '✈️' },
  { id: 11, title: 'Fashion Brand Logo', category: 'branding', description: 'Elegant minimalist fashion identity', icon: '👗' },
  { id: 12, title: 'Urban Sketches', category: 'illustration', description: 'City life captured in ink', icon: '🏙️' }
];

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const resultsCount = document.getElementById('resultsCount');
const noResults = document.getElementById('noResults');
const menuToggle = document.getElementById('menuToggle');
const navList = document.getElementById('navList');

// State
let currentFilter = 'all';
let searchTerm = '';

// Initialize
function init() {
  renderGallery();
  setupEventListeners();
}

// Render gallery items
function renderGallery() {
  galleryGrid.innerHTML = '';
  
  let filteredProjects = projects.filter(project => {
    const matchesFilter = currentFilter === 'all' || project.category === currentFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  // Update results count
  resultsCount.textContent = filteredProjects.length;
  
  // Show/hide no results message
  if (filteredProjects.length === 0) {
    noResults.classList.add('show');
    return;
  } else {
    noResults.classList.remove('show');
  }
  
  // Render items
  filteredProjects.forEach((project, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.style.animationDelay = `${index * 0.1}s`;
    
    item.innerHTML = `
      <div class="item-image" data-text="${project.icon}"></div>
      <div class="item-content">
        <span class="item-category">${project.category}</span>
        <h3 class="item-title">${project.title}</h3>
        <p class="item-description">${project.description}</p>
      </div>
    `;
    
    galleryGrid.appendChild(item);
  });
}

// Setup event listeners
function setupEventListeners() {
  // Filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderGallery();
    });
  });
  
  // Search input
  searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    renderGallery();
  });
  
  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navList.classList.toggle('active');
  });
  
  // Close mobile menu on link click
  document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navList.classList.remove('active');
    });
  });
}

// Initialize app
init();
