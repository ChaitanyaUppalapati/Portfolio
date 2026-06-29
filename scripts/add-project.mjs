#!/usr/bin/env node
// Pipeline 2 — turn a GitHub repo URL into a portfolio project entry.
//
//   npm run add-project -- https://github.com/owner/repo
//
// Fetches the repo's metadata + README from the GitHub API, asks OpenAI to
// draft a title / description / tags / categories (Structured Outputs), shows a
// preview for you to confirm, then appends it to src/projects.json. Review and
// `git push` to trigger the deploy pipeline.
//
// Env (put in .env or your shell):
//   OPENAI_API_KEY   required
//   OPENAI_MODEL     optional, defaults to gpt-5.4-mini
//   GITHUB_TOKEN     optional, raises GitHub rate limits / reads private repos

import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline/promises'
import { fileURLToPath } from 'node:url'
import OpenAI from 'openai'

// Load .env if present (Node 22.5+; no dependency needed).
try {
  process.loadEnvFile(path.join(process.cwd(), '.env'))
} catch {
  /* no .env file — rely on the ambient environment */
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECTS_PATH = path.join(__dirname, '..', 'src', 'projects.json')
const MODEL = process.env.OPENAI_MODEL || 'gpt-5.4-mini'
const CATEGORIES = ['Software', 'AI / ML', 'Data']
const README_LIMIT = 8000

const die = (msg) => {
  console.error(`✖ ${msg}`)
  process.exit(1)
}

const url = process.argv[2]
if (!url) die('Usage: npm run add-project -- <github-repo-url>')
if (!process.env.OPENAI_API_KEY) die('OPENAI_API_KEY is not set (add it to .env or your environment).')

const match = url.match(/github\.com\/([^/\s]+)\/([^/\s#?]+)/i)
if (!match) die('That does not look like a GitHub repo URL.')
const owner = match[1]
const repo = match[2].replace(/\.git$/, '')

async function gh(suffix, raw = false) {
  const headers = {
    Accept: raw ? 'application/vnd.github.raw+json' : 'application/vnd.github+json',
    'User-Agent': 'portfolio-add-project',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}${suffix}`, { headers })
  if (res.status === 404) {
    if (suffix === '/readme') return null // repos without a README are fine
    die(`Repo ${owner}/${repo} not found (404). Is it private? Set GITHUB_TOKEN.`)
  }
  if (!res.ok) die(`GitHub API returned ${res.status} for ${suffix || '/'}.`)
  return raw ? res.text() : res.json()
}

console.log(`→ Fetching ${owner}/${repo} from GitHub …`)
const meta = await gh('')
const langs = await gh('/languages')
const readmeRaw = await gh('/readme', true)

const context = {
  full_name: meta.full_name,
  description: meta.description,
  topics: meta.topics || [],
  languages: Object.keys(langs || {}),
  homepage: meta.homepage || null,
  readme: (readmeRaw || '').slice(0, README_LIMIT),
}

const schema = {
  type: 'object',
  additionalProperties: false,
  required: ['title', 'description', 'tags', 'categories'],
  properties: {
    title: {
      type: 'string',
      description: 'Polished project title. Optionally "Name — short tagline".',
    },
    description: {
      type: 'string',
      description: 'Two sentences, outcome-focused, portfolio quality. No marketing fluff.',
    },
    tags: {
      type: 'array',
      description: '3 to 5 specific tech tags: languages, frameworks, or techniques.',
      items: { type: 'string' },
    },
    categories: {
      type: 'array',
      description: '1 to 3 categories from the allowed set.',
      items: { type: 'string', enum: CATEGORIES },
    },
  },
}

console.log(`→ Drafting entry with ${MODEL} …`)
const client = new OpenAI()
let data
try {
  const completion = await client.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: 'system',
        content:
          'You write concise, outcome-focused portfolio entries for a software / AI developer. ' +
          'Match a polished, editorial tone. Choose 3–5 specific tech tags and 1–3 categories ' +
          'from the allowed set. Only state facts supported by the repo metadata and README; ' +
          'never invent capabilities.',
      },
      { role: 'user', content: `Create a portfolio entry from this GitHub repo:\n\n${JSON.stringify(context, null, 2)}` },
    ],
    response_format: { type: 'json_schema', json_schema: { name: 'project', strict: true, schema } },
  })
  data = JSON.parse(completion.choices[0].message.content)
} catch (err) {
  die(`OpenAI request failed: ${err.message}`)
}

const entry = {
  title: data.title,
  description: data.description,
  categories: data.categories,
  tags: data.tags,
  links: { github: meta.html_url, live: meta.homepage || null },
  featured: false,
}

console.log('\n── Preview ──')
console.log(`Title:       ${entry.title}`)
console.log(`Description: ${entry.description}`)
console.log(`Categories:  ${entry.categories.join(', ')}`)
console.log(`Tags:        ${entry.tags.join(', ')}`)
console.log(`GitHub:      ${entry.links.github}`)
console.log(`Live:        ${entry.links.live || '(none)'}`)
console.log('──────────')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const yes = (s) => ['y', 'yes'].includes(s.trim().toLowerCase())
const confirm = await rl.question('\nAdd this project? (y/N) ')
if (!yes(confirm)) {
  rl.close()
  die('Aborted — nothing written.')
}
entry.featured = yes(await rl.question('Mark as featured? (y/N) '))
rl.close()

const projects = JSON.parse(fs.readFileSync(PROJECTS_PATH, 'utf8'))
if (projects.some((p) => p.links?.github === entry.links.github)) {
  die('A project with this GitHub link is already in projects.json.')
}
projects.push(entry)
fs.writeFileSync(PROJECTS_PATH, JSON.stringify(projects, null, 2) + '\n')

console.log(`\n✓ Appended to ${path.relative(process.cwd(), PROJECTS_PATH)}`)
console.log('Review it, then deploy by pushing:')
console.log(`  git add src/projects.json && git commit -m "Add project: ${entry.title}" && git push`)
