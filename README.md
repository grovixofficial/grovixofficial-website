# Grovix Landing Page (Standalone)

Standalone extraction of the Grovix landing page website.

## Getting Started

Follow these steps to run the landing page locally:

### 1. Extract the Project
Extract the contents of `landing-page.zip` into a directory on your machine.

### 2. Open the Folder in Terminal
Open your terminal (PowerShell, Command Prompt, or bash) and navigate into the extracted folder:
```bash
cd landing-page
```

### 3. Install Dependencies
Install all required packages:
```bash
npm install
```

### 4. Start Development Server
Launch the Vite development server:
```bash
npm run dev
```

### 5. Open in Browser
Open the localhost URL displayed in the terminal (typically `http://localhost:5173`).
The landing page will load immediately with all sections, animations, video showcase, and custom styles intact.

---

## Production Build
To create an optimized production build:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## Environment Variables
This standalone landing page does not require any backend API keys, secrets, or environment variables. All features and animations run client-side. See `.env.example` for details.

---

## Project Structure
```text
landing-page/
├── index.html              # HTML entry point with fonts & Material Symbols Outlined
├── package.json            # Minimal dependencies (framer-motion, gsap, lenis, react, react-router-dom, tailwindcss, vite)
├── postcss.config.js       # PostCSS configuration with TailwindCSS & Autoprefixer
├── tailwind.config.js      # Complete Tailwind design system tokens, colors, & typography
├── vite.config.js          # Vite React configuration
├── .env.example            # Environment variables info
├── README.md               # Setup & usage instructions
├── public/
│   ├── favicon.svg         # Favicon icon
│   └── icons.svg           # Vector icons asset
└── src/
    ├── main.jsx            # Application root mount
    ├── App.jsx             # React Router configuration
    ├── index.css           # Tailwind directives & glassmorphic styling
    ├── assets/
    │   ├── hero.png        # Brand assets
    │   └── watermark-removed-creat_the_full_video_from_this.mp4  # Showcase video
    ├── pages/
    │   └── LandingPage.jsx # Core Landing Page layout with GSAP smooth scroll & mesh background
    └── components/
        └── landing/        # Modular landing page components
            ├── Navbar.jsx
            ├── HeroSection.jsx
            ├── TrustedBySection.jsx
            ├── ProblemSolutionSection.jsx
            ├── BusinessTypesSection.jsx
            ├── B2BSection.jsx
            ├── FeaturesSection.jsx
            ├── AIFeaturesSection.jsx
            ├── DashboardPreviewSection.jsx
            ├── WhyChooseSection.jsx
            ├── TestimonialsSection.jsx
            ├── FAQSection.jsx
            ├── CustomCursor.jsx
            ├── CTASection.jsx
            ├── Footer.jsx
            ├── SolutionsSection.jsx
            └── landingData.js
```
