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

---

# Automation pipelines

Two chained pipelines keep the site updated with minimal effort:

```
add-project (laptop)  →  git push  →  GitHub Actions builds arm64 → GHCR  →  Watchtower redeploys on the Pi
        Pipeline 2                              Pipeline 1 (build)              Pipeline 1 (host)
```

## Pipeline 2 — add a project from a GitHub link (laptop)

Turns a repo URL into a polished `projects.json` entry using the **OpenAI API**.

```bash
cp .env.example .env        # then put your OPENAI_API_KEY in it
npm run add-project -- https://github.com/<owner>/<repo>
```

It fetches the repo's metadata + README from the GitHub API, asks OpenAI (Structured
Outputs, default model `gpt-5.4-mini` — override with `OPENAI_MODEL`) to draft a
**title, description, tags, and categories**, shows a preview for you to confirm, then
appends the entry to [`src/projects.json`](src/projects.json). Review it and push:

```bash
git add src/projects.json && git commit -m "Add project: ..." && git push
```

That push triggers Pipeline 1. The `openai` SDK is a **devDependency** — it's used only
by the CLI and is never bundled into the deployed app.

## Pipeline 1 — build & host (GitHub Actions → GHCR → Raspberry Pi)

**Build half** — [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on every
push to `main`: it cross-builds the `linux/arm64` image and pushes it to GHCR as
`ghcr.io/<your-username>/portfolio:latest`. No secrets to configure — it uses the
built-in `GITHUB_TOKEN`. (Make the GHCR package **public** under your repo's *Packages*
settings so the Pi can pull without auth, or `docker login ghcr.io` on the Pi once.)

**Host half** — on the Raspberry Pi, run the prebuilt image plus Watchtower:

```bash
# 64-bit Raspberry Pi OS with Docker installed
IMAGE=ghcr.io/<your-username>/portfolio docker compose -f docker-compose.pi.yml up -d
```

[`docker-compose.pi.yml`](docker-compose.pi.yml) serves the site on port 80
(`http://<pi-ip>`) and runs **Watchtower**, which polls GHCR every 60s and
auto-redeploys when CI publishes a new image. End to end: a `git push` on your laptop
becomes a live update on the Pi with no SSH and no build load on the Pi.
