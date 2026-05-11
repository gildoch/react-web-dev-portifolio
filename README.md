# React Web Dev Portfolio

A personal portfolio built with React, focused on smooth animations, clean navigation, and showcase-ready project pages.

## Highlights

- Modern single-page portfolio experience
- Animated UI with `animate.css`, `react-loaders`, and `gsap`
- Client-side routing with `react-router-dom`
- Contact workflow using EmailJS and Firebase integration points
- Portfolio content powered by local JSON data
- Ready-to-deploy to GitHub Pages

## Tech Stack

- React 17
- React Router 6
- Sass (SCSS)
- Font Awesome
- Leaflet / React Leaflet
- Firebase
- EmailJS
- Create React App tooling (`react-scripts`)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run in development

```bash
npm start
```

The app runs at:

```text
http://localhost:3000/
```

## Available Scripts

```bash
npm start      # Start dev server
npm test       # Run tests in watch mode
npm run build  # Create production build
npm run deploy # Deploy build folder to GitHub Pages
```

## Deployment Notes

This project is configured for local development at `/` and production deployment under `/react-web-dev-portifolio`.

- `homepage` is set to `.` in `package.json`
- Router `basename` switches by environment in `src/index.js`

This avoids the common issue where development starts at a subpath instead of root.

## Project Structure

```text
src/
	assets/            # Fonts and images
	components/        # UI sections (Home, About, Contact, Portfolio, etc.)
	data/              # Static data files (portfolio.json)
	App.js             # Route definitions
	index.js           # App bootstrap and router basename
```

## Main Routes

- `/` (Home)
- `/about`
- `/contact`
- `/portfolio`
- `/dashboard`

## Troubleshooting

If routes or assets behave unexpectedly after changing deployment settings:

1. Remove old build artifacts: `rm -rf build` (PowerShell: `Remove-Item -Recurse -Force build`)
2. Rebuild: `npm run build`
3. Redeploy: `npm run deploy`

If local development opens on a subpath, verify the environment-based `basename` in `src/index.js`.

## License

This project is for personal portfolio use.
