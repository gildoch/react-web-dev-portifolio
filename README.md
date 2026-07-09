# React Web Dev Portfolio

A personal portfolio built with React, focused on smooth animations, clean navigation, and showcase-ready project pages.

## Highlights

- Modern single-page portfolio experience
- Animated UI with `animate.css`, `react-loaders`, and `gsap`
- Client-side routing with `react-router-dom`
- Contact workflow using EmailJS
- Portfolio content powered by local JSON data
- Dashboard for adding new portfolio items (stored in localStorage)
- Ready-to-deploy to GitHub Pages

## Tech Stack

- React 17
- React Router 6
- Sass (SCSS)
- Font Awesome
- Leaflet / React Leaflet
- EmailJS
- ImageKit (image optimization and storage)
- Create React App tooling (`react-scripts`)

## Getting Started

### Environment Variables

Create a `.env` file in the root directory with ImageKit credentials:

```env
REACT_APP_IMAGEKIT_PRIVATE_KEY=your_private_key
REACT_APP_IMAGEKIT_PUBLIC_KEY=your_public_key
REACT_APP_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_account_id
REACT_APP_EMAILJS_SERVICEID=your_emailjs_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

Get these credentials from your [ImageKit dashboard](https://imagekit.io/dashboard).

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

## Data Management

### Portfolio Data & Images

Portfolio items are loaded from `src/data/portfolio.json`. The Portfolio page displays:
- Static items from the JSON file with ImageKit-hosted images
- Any new items added through the Dashboard (also stored in ImageKit)
- All images are optimized through ImageKit's transformation pipeline

Images are displayed using ImageKit's `IKImage` component which provides:
- Lazy loading for better performance
- Automatic optimization (quality, dimensions)
- LQIP (Low Quality Image Placeholder) for smooth loading
- Responsive image transformation

### Dashboard

The Dashboard provides a form to add new portfolio items with the following workflow:
1. User selects an image file
2. Image is automatically uploaded to ImageKit
3. Once uploaded, the form can be submitted
4. Portfolio item (with ImageKit URL) is stored in browser localStorage
5. New items appear immediately in the Portfolio view
6. Data persists across sessions

### Portfolio JSON Structure

Each portfolio item includes:
```json
{
  "cover": "https://ik.imagekit.io/...",  // ImageKit image URL
  "title": "Project name",
  "description": "Technologies used",
  "url": "Project link"
}
```

## Troubleshooting

If routes or assets behave unexpectedly after changing deployment settings:

1. Remove old build artifacts: `rm -rf build` (PowerShell: `Remove-Item -Recurse -Force build`)
2. Rebuild: `npm run build`
3. Redeploy: `npm run deploy`

If local development opens on a subpath, verify the environment-based `basename` in `src/index.js`.

## License

This project is for personal portfolio use.
