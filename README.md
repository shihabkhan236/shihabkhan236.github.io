# Personal Portfolio Website

A fast, responsive, single-page personal portfolio website built with plain **HTML5, CSS3, and vanilla JavaScript** (zero build steps, zero external dependencies). Pre-configured and optimized for direct deployment to **GitHub Pages**.

---

## 🌟 Features

- **Dark & Minimalist Aesthetic**: Styled with near-black backgrounds (`#0a0c0b`), olive/moss-green accents (`#7a8c4f`), and subtle starfield cosmic dust particle canvas.
- **Sticky Pill Navigation**: Fixed header with smooth scrolling and `IntersectionObserver` active section indicators.
- **Theme Toggle**: Switch between Dark and Light mode (persisted via `localStorage`).
- **Hero Profile Card**: Circular avatar with soft glow, quick highlights, and 2x2 stat chips (`Major Projects`, `Focus`, `Semester`, `Campus`).
- **About & Education Timeline**: Clean card grids, profile summary, and an education timeline with dot markers and status pills.
- **Categorized Skills**: Three organized cards for Languages, Frameworks & Tools, and Core Computer Science Concepts.
- **Interactive Project Carousel**:
  - Circular project preview with dark vignette overlays and hover zoom.
  - Previous / Next navigation controls, touch swipe support for mobile, and dot indicators.
  - **Data-Driven**: Powered by a simple `projects` JavaScript array. Adding a new project is as simple as adding an object.
- **Project Detail Modal**:
  - Circular pop-up window with accent glow, tech tag pills, bulleted highlights, and direct GitHub repository links.
  - Accessible via mouse click, touch, and keyboard (`Escape` to close, `Enter` / `Space` to open).
- **Contact Card & Footer**: Clean contact methods with hover transitions and direct `mailto:`, `tel:`, and social links.

---

## 📁 Project Structure

```
shihabkhan236.github.io/
├── index.html                  # Main markup and semantic structure
├── styles.css                  # Custom CSS variables, responsive styling & animations
├── script.js                   # Project data array, carousel, modal, theme, & canvas
├── README.md                   # Documentation and deployment guide
└── assets/                     # Media & artwork
    ├── farmos-cover.png        # farmOS project artwork
    ├── deadline-dash-cover.png # Deadline Dash project artwork
    └── avatar-placeholder.svg  # Circular avatar placeholder
```

---

## 🚀 Deploying to GitHub Pages

Because this site uses pure HTML, CSS, and vanilla JS with relative asset paths, it requires **zero build tools** to deploy.

### Option 1: User/Organization Site (`<username>.github.io`)
1. Create a GitHub repository named `<your-github-username>.github.io`.
2. Commit and push the files directly to the `main` branch:
   ```bash
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-github-username>/<your-github-username>.github.io.git
   git push -u origin main
   ```
3. Your site will automatically go live at `https://<your-github-username>.github.io`.

### Option 2: Project Repository (e.g., `portfolio`)
1. Push this repository to GitHub.
2. In your repository on GitHub, navigate to **Settings** > **Pages** (under the "Code and automation" sidebar).
3. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
4. Under **Branch**, select `main` (or `master`) and folder `/(root)`.
5. Click **Save**. Within 1–2 minutes, your site will be live at `https://<your-github-username>.github.io/<repo-name>/`.

---

## 🛠️ How to Customize

### 1. Adding or Editing Projects
Open [`script.js`](file:///d:/versity/semester_4/Portfolio/shihabkhan236.github.io/script.js) and look for the `projects` array at the top:

```js
const projects = [
  {
    name: "New Project",
    status: "Completed", // or "Ongoing"
    tags: ["Tech1", "Tech2", "Tech3"],
    description: "Brief summary of the project.",
    highlights: [
      "Key achievement or architecture detail 1.",
      "Key achievement or architecture detail 2."
    ],
    repo: "https://github.com/username/project",
    image: "assets/your-project-cover.png"
  },
  // ... more projects
];
```

The carousel, dots, and detail modal will automatically adapt to any number of projects.

### 2. Updating Profile Information & Contact Links
- Edit [`index.html`](file:///d:/versity/semester_4/Portfolio/shihabkhan236.github.io/index.html) to change your name, title, bio, education, and contact links (`mailto:`, `tel:`, GitHub, and LinkedIn URLs).
- Place your photo into the `assets/` folder (e.g., `assets/profile.jpg`) and update the `src` attribute of the avatar image in `index.html`.

### 3. Changing Theme Colors
Open [`styles.css`](file:///d:/versity/semester_4/Portfolio/shihabkhan236.github.io/styles.css) to adjust the CSS custom properties in `:root`:

```css
:root {
  --bg-primary: #0a0c0b;     /* Main background color */
  --accent: #7a8c4f;         /* Primary olive accent */
  --accent-bright: #96af5e;  /* Brighter olive hover accent */
  --surface-card: #161a17;   /* Card surface background */
}
```

---

## 📄 License
MIT License. Feel free to use and modify for your personal portfolio.
