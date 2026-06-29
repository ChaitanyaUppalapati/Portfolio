// Edit this file to customize your portfolio content.

export const profile = {
  name: 'Chaitanya Uppalapati',
  role: 'Software Developer',
  tagline: 'I build AI systems that are safe, auditable, and actually usable.',
  blurb:
    "I'm a software developer focused on agentic AI and safety-critical systems — the kind where machine learning does the heavy lifting but deterministic, auditable logic makes the decisions that matter. I care about reliability, clean architecture, and shipping tools that hold up in the real world.",
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
    group: 'AI / ML',
    items: ['Multi-Agent Systems', 'RAG', 'Multimodal LLMs', 'XGBoost', 'SHAP', 'Fairlearn'],
  },
  {
    group: 'Backend & Data',
    items: ['FastAPI', 'Node.js', 'PostgreSQL', 'Vector Search', 'REST APIs'],
  },
  {
    group: 'Tools & DevOps',
    items: ['Git', 'Docker', 'Linux', 'Streamlit', 'Browser Automation', 'CI/CD'],
  },
]

export const projects = [
  {
    title: 'Lighthouse — Multi-Agent Guardian System',
    description:
      'A multi-agent guardian system that autonomously handles safe digital tasks for people with cognitive decline and escalates risky ones to family, gated by a deterministic safety layer.',
    tags: ['Python', 'Multi-Agent Framework', 'Browser Automation', 'PostgreSQL'],
    links: {
      github: 'https://github.com/ChaitanyaUppalapati/LightHouse',
      live: null,
    },
    featured: true,
  },
  {
    title: 'OpenPill — Medication Safety Assistant',
    description:
      'A medication-safety assistant that reads a pill bottle, checks for dangerous drug interactions through a deterministic, fully auditable safety core, and explains the risk in plain language — keeping language models at the edges and never in the safety decision.',
    tags: ['Python', 'Multimodal LLM', 'RAG (BM25 + Vector Search)', 'PostgreSQL'],
    links: {
      github: 'https://github.com/ChaitanyaUppalapati/OpenPill',
      live: null,
    },
    featured: true,
  },
  {
    title: 'Hurricane Food Relief Priority — Predictive ML for Disaster Response',
    description:
      'A pre-landfall ML system that ranks ZIP codes by predicted hurricane damage and food fragility — fusing 13 federal datasets, audited for equity with Fairlearn and explained with SHAP — to help emergency managers target food relief before damage reports arrive.',
    tags: ['Python', 'XGBoost', 'SHAP', 'Geospatial Analysis', 'Streamlit'],
    links: {
      github: 'https://github.com/ChaitanyaUppalapati/hurricane-food-relief-ml',
      live: null,
    },
    featured: false,
  },
]
