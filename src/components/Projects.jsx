import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data.js'
import { GitHubIcon, ExternalIcon, ArrowIcon } from './icons.jsx'
import { fadeUp, stagger, viewport } from '../motion.js'

const FILTER_ORDER = ['All', 'Software', 'AI / ML', 'Data']
const present = new Set(projects.flatMap((p) => p.categories || []))
const filters = FILTER_ORDER.filter((f) => f === 'All' || present.has(f))

function ProjectRow({ project, index }) {
  const primary = project.links.live || project.links.github || '#'

  return (
    <motion.article
      className="project-row"
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="project-index">{String(index + 1).padStart(2, '0')}</span>

      <div className="project-body">
        <div className="project-headline">
          <a className="project-title-link" href={primary} target="_blank" rel="noreferrer">
            <h3>{project.title}</h3>
            <span className="project-arrow">
              <ArrowIcon />
            </span>
          </a>
          {project.featured && <span className="featured-badge">★ Featured</span>}
        </div>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="project-links">
        {project.links.github && (
          <a href={project.links.github} target="_blank" rel="noreferrer" aria-label="GitHub repo">
            <GitHubIcon width={18} height={18} />
          </a>
        )}
        {project.links.live && (
          <a href={project.links.live} target="_blank" rel="noreferrer" aria-label="Live site">
            <ExternalIcon />
          </a>
        )}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [active, setActive] = useState('All')
  const visible = projects.filter(
    (p) => active === 'All' || (p.categories || []).includes(active),
  )

  return (
    <section className="projects" id="projects">
      <motion.div
        className="container"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger}
      >
        <motion.p className="section-label" variants={fadeUp}>
          02. Work
        </motion.p>
        <motion.h2 className="section-title" variants={fadeUp}>
          Selected projects
        </motion.h2>

        <motion.div className="filter-tabs" variants={fadeUp} role="tablist" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={active === f}
              className={`filter-tab ${active === f ? 'is-active' : ''}`}
              onClick={() => setActive(f)}
            >
              <span>{f}</span>
              {active === f && (
                <motion.span
                  layoutId="tab-pill"
                  className="tab-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        <motion.div className="projects-list" layout>
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectRow key={project.title} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  )
}
