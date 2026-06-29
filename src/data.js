// Edit this file to customize your portfolio content.
// Projects live in ./projects.json. Edit them by hand, or run `npm run add-project -- <github-url>`.
import projectsData from './projects.json'

export const projects = projectsData

export const profile = {
  name: 'Chaitanya Uppalapati',
  role: 'Software Developer',
  tagline: 'I build reliable software end to end: full-stack products and AI systems that hold up in the real world.',
  blurb:
    "I'm a software developer who works across the whole stack, building full-stack applications and backend services, and designing the data-intensive AI systems behind them. I care about clean architecture, readable code, and shipping things that are reliable, explainable, and actually used.",
  location: 'San Jose, CA',
  email: 'chaitanya372.uppalapati@gmail.com',
  resumeUrl: '/files/resume.pdf',
  socials: {
    github: 'https://github.com/ChaitanyaUppalapati',
    linkedin: 'https://linkedin.com/in/chaitanyauppalapati',
  },
}

export const skills = [
  {
    group: 'Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL', 'C++'],
  },
  {
    group: 'Software & Web',
    items: ['React', 'Node.js', 'REST APIs', 'Vite', 'HTML/CSS', 'System Design'],
  },
  {
    group: 'Backend & Data',
    items: ['FastAPI', 'Express', 'PostgreSQL', 'Vector Search', 'Data Pipelines'],
  },
  {
    group: 'AI / ML',
    items: ['Multi-Agent Systems', 'RAG', 'Multimodal LLMs', 'XGBoost', 'SHAP', 'Fairlearn'],
  },
  {
    group: 'Tools & DevOps',
    items: ['Git', 'Docker', 'Linux', 'AWS', 'CI/CD', 'Streamlit'],
  },
]
