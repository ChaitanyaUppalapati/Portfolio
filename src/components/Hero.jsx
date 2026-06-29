import { motion } from 'framer-motion'
import { profile } from '../data.js'
import { GitHubIcon, LinkedInIcon, MailIcon, ArrowIcon } from './icons.jsx'
import { fadeUp, stagger, wordParent, wordChild } from '../motion.js'
import ParticleField from './ParticleField.jsx'
import Magnetic from './Magnetic.jsx'

const keywords = [
  'Full-Stack Development',
  'System Design',
  'Multi-Agent Systems',
  'REST APIs',
  'Machine Learning',
  'Data Pipelines',
  'RAG',
  'Auditable by Design',
]

// Animated headline: each word rises out of a clipping mask.
function RevealLine({ text, className }) {
  return (
    <motion.span className={className} variants={wordParent}>
      {text.split(' ').map((word, i) => (
        <span className="word-mask" key={i}>
          <motion.span className="word" variants={wordChild}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <ParticleField />
      <div className="container hero-inner">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div className="hero-status" variants={fadeUp}>
            <span className="status-dot" />
            Available for new opportunities
          </motion.div>

          <motion.p className="hero-intro" variants={fadeUp}>
            Hi, my name is
          </motion.p>

          <motion.h1 className="hero-name" initial="hidden" animate="show" variants={wordParent}>
            <RevealLine text={profile.name} />
          </motion.h1>
          <motion.h2 className="hero-role" initial="hidden" animate="show" variants={wordParent}>
            <RevealLine text={profile.role} />
          </motion.h2>

          <motion.p className="hero-tagline" variants={fadeUp}>
            {profile.tagline}
          </motion.p>

          <motion.div className="hero-cta" variants={fadeUp}>
            <Magnetic>
              <a className="btn btn-primary" href="#projects">
                View my work <ArrowIcon />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href="#contact">
                Get in touch
              </a>
            </Magnetic>
          </motion.div>

          <motion.div className="hero-socials" variants={fadeUp}>
            <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <MailIcon />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>{keywords.join(' ◆ ')}</span>
          <span>{keywords.join(' ◆ ')}</span>
        </div>
      </div>
    </section>
  )
}
