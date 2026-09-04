/**
 * Portfolio JavaScript
 * Single-Page Personal Portfolio Logic
 */

// =============================================================================
// Project Data (Easily extensible by appending objects to this array)
// =============================================================================
const projects = [
  {
    name: "farmOS",
    status: "Completed",
    tags: ["C", "C++", "CLI", "File Systems", "Data Management"],
    description: "A terminal-based farm management system designed for managing agricultural data, inventory, human resources, and operations via an intuitive CLI.",
    highlights: [
      "Built with C/C++ emphasizing structured CLI navigation and modular file processing.",
      "Provides inventory tracking, resource management, and state updates for farming workflows.",
      "Designed as a lightweight, robust, and terminal-native utility."
    ],
    repo: "https://github.com/sanmugdho/farmOS",
    image: "assets/farmos-cover.png"
  },
  {
    name: "Deadline Dash",
    status: "Ongoing",
    tags: ["Java", "LibGDX", "Tiled", "Gradle"],
    description: "A 2D campus adventure game built around a story where a project deadline gets shortened, forcing the player into a chaotic campus adventure.",
    highlights: [
      "Powered by Java and the LibGDX framework with custom game loop mechanics.",
      "Uses Tiled Map Editor for detailed 2D tilemap design and collision layer creation.",
      "Features custom story-driven quest progression inspired by real-life student deadline rushes.",
      "Managed and built via Gradle tooling."
    ],
    repo: "https://github.com/Shaquibbai/Deadline-Dash",
    image: "assets/deadline-dash-cover.png"
  },
  {
    name: "Discretia",
    status: "Completed",
    tags: ["C", "Raylib", "Algorithms", "OOP in C", "Simulation"],
    description: "An educational 2D platformer and algorithm simulator built with C and Raylib that visualizes sorting algorithms through interactive parkour mechanics.",
    highlights: [
      "Simulates Bubble Sort, Merge Sort, Insertion Sort, and Selection Sort through physics-based platforming gameplay.",
      "Engineered Object-Oriented architecture natively in pure C for modular game states and entity manipulation.",
      "Interactive mechanics where the player controls a block entity to move and sort numerical values between containers."
    ],
    repo: "https://github.com/shihabkhan236/Discretia",
    image: "assets/discretia-cover.png"
  },
  {
    name: "2D Parkour Game",
    status: "Ongoing",
    tags: ["Godot", "GDScript", "2D Platformer", "Game Jam", "Mechanics"],
    description: "A fast-paced 2D platformer built with the Godot engine for a game jam, centered around responsive parkour movement and fluid platforming mechanics.",
    highlights: [
      "Developed using the Godot game engine with responsive physics and platforming controls.",
      "Engineered rich movement mechanics including double jumps, dashes, and obstacle traversal.",
      "Built for the ICT Game Jam with custom level layouts and interactive challenges."
    ],
    repo: "https://github.com/Pafez/ict-game-jam",
    image: "assets/project-4-cover.png"
  }
];

// =============================================================================
// State & DOM Elements
// =============================================================================
let currentProjectIndex = 0;

// Carousel DOM
const projectCoverBg = document.getElementById("project-cover-bg");
const projectNameDisplay = document.getElementById("project-name-display");
const projectStatusContainer = document.getElementById("project-status-container");
const carouselPrevBtn = document.getElementById("carousel-prev");
const carouselNextBtn = document.getElementById("carousel-next");
const carouselDotsContainer = document.getElementById("carousel-dots-container");
const projectCardTrigger = document.getElementById("project-card-trigger");

// Modal DOM
const projectModal = document.getElementById("project-modal");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalStatusBadge = document.getElementById("modal-status-badge");
const modalProjectTitle = document.getElementById("modal-project-title");
const modalTags = document.getElementById("modal-tags");
const modalDescription = document.getElementById("modal-desc") || document.getElementById("modal-description");
const modalHighlightsList = document.getElementById("modal-highlights-list");
const modalRepoLink = document.getElementById("modal-repo-link");

// Theme DOM
const themeToggleBtn = document.getElementById("theme-toggle");

// Navigation DOM
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

// Canvas DOM
const canvas = document.getElementById("starfield-canvas");

// =============================================================================
// 1. Project Carousel Implementation
// =============================================================================
function renderCarouselDots() {
  if (!carouselDotsContainer) return;
  carouselDotsContainer.innerHTML = "";
  
  projects.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.className = `dot-btn ${idx === currentProjectIndex ? "active" : ""}`;
    dot.setAttribute("aria-label", `Go to project ${idx + 1}`);
    dot.addEventListener("click", () => {
      currentProjectIndex = idx;
      updateProjectDisplay();
    });
    carouselDotsContainer.appendChild(dot);
  });
}

function updateProjectDisplay() {
  if (!projects || projects.length === 0) return;
  const project = projects[currentProjectIndex];

  // Update Cover Image with smooth fade
  if (projectCoverBg) {
    projectCoverBg.style.opacity = "0";
    setTimeout(() => {
      projectCoverBg.style.backgroundImage = `url('${project.image}')`;
      projectCoverBg.style.opacity = "1";
    }, 150);
  }

  // Update Title
  if (projectNameDisplay) {
    projectNameDisplay.textContent = project.name;
  }

  // Update Status Pill
  if (projectStatusContainer) {
    const isCompleted = project.status.toLowerCase() === "completed";
    const statusClass = isCompleted ? "status-completed" : "status-ongoing";
    projectStatusContainer.innerHTML = `
      <span class="pill-badge ${statusClass}">
        <span class="badge-dot ${isCompleted ? 'green-dot' : ''}"></span>
        ${project.status}
      </span>
    `;
  }

  // Update Dots
  const dots = carouselDotsContainer.querySelectorAll(".dot-btn");
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentProjectIndex);
  });
}

function showNextProject() {
  currentProjectIndex = (currentProjectIndex + 1) % projects.length;
  updateProjectDisplay();
}

function showPrevProject() {
  currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
  updateProjectDisplay();
}

// Event Listeners for Carousel Controls
if (carouselNextBtn) carouselNextBtn.addEventListener("click", showNextProject);
if (carouselPrevBtn) carouselPrevBtn.addEventListener("click", showPrevProject);

// Touch Swipe Support for Mobile Carousel
let touchStartX = 0;
let touchEndX = 0;

if (projectCardTrigger) {
  projectCardTrigger.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  projectCardTrigger.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
}

function handleSwipe() {
  const threshold = 45;
  if (touchEndX < touchStartX - threshold) {
    showNextProject();
  } else if (touchEndX > touchStartX + threshold) {
    showPrevProject();
  }
}

// =============================================================================
// 2. Project Detail Modal Implementation
// =============================================================================
let lastFocusedElement = null;

function openProjectModal(index) {
  const project = projects[index];
  if (!project || !projectModal) return;

  lastFocusedElement = document.activeElement;

  // Status Badge
  const isCompleted = project.status.toLowerCase() === "completed";
  const statusClass = isCompleted ? "status-completed" : "status-ongoing";
  if (modalStatusBadge) {
    modalStatusBadge.innerHTML = `
      <span class="pill-badge ${statusClass}">
        <span class="badge-dot ${isCompleted ? 'green-dot' : ''}"></span>
        ${project.status}
      </span>
    `;
  }

  // Title
  if (modalProjectTitle) {
    modalProjectTitle.textContent = project.name;
  }

  // Tags
  if (modalTags) {
    modalTags.innerHTML = project.tags
      .map(tag => `<span class="tag-pill">${tag}</span>`)
      .join("");
  }

  // Description
  if (modalDescription) {
    modalDescription.textContent = project.description;
  }

  // Highlights List
  if (modalHighlightsList) {
    modalHighlightsList.innerHTML = project.highlights
      .map(item => `<li>${item}</li>`)
      .join("");
  }

  // Repo Link
  if (modalRepoLink) {
    modalRepoLink.href = project.repo;
  }

  // Open Modal
  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Prevent page scroll
  if (modalCloseBtn) modalCloseBtn.focus();
}

function closeProjectModal() {
  if (!projectModal) return;
  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

// Trigger Modal open on clicking circle
if (projectCardTrigger) {
  projectCardTrigger.addEventListener("click", () => {
    openProjectModal(currentProjectIndex);
  });

  projectCardTrigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProjectModal(currentProjectIndex);
    }
  });
}

// Close Modal Events
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", closeProjectModal);
}

if (projectModal) {
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && projectModal && projectModal.classList.contains("open")) {
    closeProjectModal();
  }
});

// =============================================================================
// 3. Navigation Active Highlight via IntersectionObserver
// =============================================================================
function setupNavigationObserver() {
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// =============================================================================
// 4. Dark / Light Theme Toggle
// =============================================================================
function setupThemeToggle() {
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("portfolio-theme", newTheme);
    });
  }
}

// =============================================================================
// 5. Subtle Dynamic Canvas Starfield / Particle Background
// =============================================================================
function setupStarfield() {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  let animationFrameId;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    const count = Math.floor((width * height) / 12000); // Responsive particle density
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        baseAlpha: Math.random() * 0.5 + 0.2,
        alpha: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.015 + 0.005,
        glow: Math.random() > 0.8,
        color: Math.random() > 0.6 ? "122, 140, 79" : "220, 225, 220" // Olive and soft starlight
      });
    }
  }

  function renderStars() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.alpha += p.speed;
      const currentAlpha = Math.abs(Math.sin(p.alpha)) * p.baseAlpha;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
      ctx.fill();

      if (p.glow) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha * 0.25})`;
        ctx.fill();
      }
    });

    animationFrameId = requestAnimationFrame(renderStars);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  renderStars();

  // Stop canvas animation when page is invisible to save CPU/battery
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      renderStars();
    }
  });
}

// =============================================================================
// Initialize Everything on DOMContentLoaded
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderCarouselDots();
  updateProjectDisplay();
  setupNavigationObserver();
  setupThemeToggle();
  setupStarfield();
});
