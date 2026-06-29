import { motion } from 'framer-motion'
import { projects } from '../data.js'
import { GitHubIcon, ExternalIcon, ArrowIcon } from './icons.jsx'
import { fadeUp, stagger, viewport } from '../motion.js'

function ProjectRow({ project, index }) {
  const primary = project.links.live || project.links.github || '#'

  return (
    <motion.article className="project-row" variants={fadeUp}>
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

        <div className="projects-list">
          {projects.map((project, i) => (
            <ProjectRow key={project.title} project={project} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
