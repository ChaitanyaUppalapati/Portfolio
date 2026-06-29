# Portfolio

A dark, modern personal portfolio built with **React + Vite**, served as a static site behind **nginx** in a Docker container.

## Sections
- **Hero** — name, role, tagline, social links
- **About** — bio + quick facts card
- **Projects** — featured project cards with tags and links
- **Skills** — grouped tech stack chips
- **Contact** — email call-to-action

## Customize

All content lives in [`src/data.js`](src/data.js). Edit your name, bio, projects, skills, and social links there — no need to touch components.

To use the Resume button, drop a `resume.pdf` into the [`public/`](public) folder (it's served at `/resume.pdf`).

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

## Docker

> Make sure Docker Desktop is running first.

### Option A — docker compose (recommended)

```bash
docker compose up -d --build
```

The site is served at **http://localhost:8080**. Stop it with:

```bash
docker compose down
```

### Option B — plain docker

```bash
# Build the image
docker build -t portfolio:latest .

# Run the container (host port 8080 -> container port 80)
docker run -d --name portfolio -p 8080:80 portfolio:latest
```

Stop and remove:

```bash
docker rm -f portfolio
```

### How the image works
The [`Dockerfile`](Dockerfile) is a multi-stage build:
1. **Build stage** (`node:22-alpine`) installs deps with `npm ci` and runs `vite build`.
2. **Runtime stage** (`nginx:1.27-alpine`) serves the static `dist/` output using [`nginx.conf`](nginx.conf), which includes gzip, asset caching, and an SPA fallback.

The final image is small (just nginx + static files) and includes a healthcheck.

## Deploying elsewhere
Because the output is a plain static bundle, you can also deploy `dist/` to any static host (Netlify, Vercel, GitHub Pages, S3/CloudFront). For container hosts, push the image to a registry:

```bash
docker tag portfolio:latest <registry>/<user>/portfolio:latest
docker push <registry>/<user>/portfolio:latest
```
