import { motion } from 'framer-motion'
import { profile } from '../data.js'
import { fadeUp, stagger, viewport } from '../motion.js'
import Counter from './Counter.jsx'

const stats = [
  { value: 3, suffix: '', label: 'Flagship builds' },
  { value: 13, suffix: '', label: 'Datasets fused' },
  { value: 100, suffix: '%', label: 'Auditable cores' },
  { value: 0, suffix: '', label: 'LLMs in the safety path' },
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
              Most of my work lives at the intersection of <strong>machine learning</strong> and{' '}
              <strong>safety-critical engineering</strong> — multi-agent systems, RAG pipelines, and
              predictive models for high-stakes domains like healthcare and disaster response. My
              guiding principle is to keep language models at the edges and put a{' '}
              <strong>deterministic, auditable core</strong> in charge of the decisions that matter.
            </p>
            <p>
              I like building things end to end: the data and models, the services behind them, and
              the interfaces that make them usable. Whether it's automating a digital task or ranking
              ZIP codes by hurricane risk, I care about systems that are reliable, explainable, and
              ready for the real world.
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
