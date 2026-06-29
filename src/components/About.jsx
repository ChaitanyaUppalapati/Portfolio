import { motion } from 'framer-motion'
import { profile } from '../data.js'
import { fadeUp, stagger, viewport } from '../motion.js'
import Counter from './Counter.jsx'

const stats = [
  { value: 3, suffix: '', label: 'Flagship builds' },
  { value: 6, suffix: '+', label: 'Languages used' },
  { value: 13, suffix: '', label: 'Datasets fused' },
  { value: 100, suffix: '%', label: 'End-to-end ownership' },
]

export default function About() {
  return (
    <section className="about" id="about">
      <motion.div
        className="container"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger}
      >
        <motion.p className="section-label" variants={fadeUp}>
          01. About
        </motion.p>
        <motion.h2 className="section-title" variants={fadeUp}>
          A bit about me
        </motion.h2>

        <div className="about-grid">
          <motion.div className="about-text" variants={fadeUp}>
            <p>{profile.blurb}</p>
            <p>
              On the <strong>software engineering</strong> side, I build full-stack applications and
              backend services, designing REST APIs, modeling data in PostgreSQL, and wiring up the
              systems that hold everything together. On the <strong>AI/ML</strong> side, I work on
              multi-agent systems, RAG pipelines, and predictive models for high-stakes domains like
              healthcare and disaster response.
            </p>
            <p>
              What ties it together is an engineering mindset: keep the architecture clean, keep
              critical logic <strong>deterministic and auditable</strong>, and make sure the thing
              actually works in the real world, whether that's a web app, a data pipeline, or a
              model in production.
            </p>
          </motion.div>

          <motion.div className="about-card" variants={fadeUp}>
            <h3>Quick facts</h3>
            <div className="info-row">
              <span>Name</span>
              <span>{profile.name}</span>
            </div>
            <div className="info-row">
              <span>Role</span>
              <span>{profile.role}</span>
            </div>
            <div className="info-row">
              <span>Location</span>
              <span>{profile.location}</span>
            </div>
            <div className="info-row">
              <span>Email</span>
              <span>{profile.email}</span>
            </div>
          </motion.div>
        </div>

        <motion.div className="stats" variants={stagger}>
          {stats.map((s) => (
            <motion.div className="stat" key={s.label} variants={fadeUp}>
              <div className="stat-num">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
