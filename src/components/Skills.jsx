import { motion } from 'framer-motion'
import { skills } from '../data.js'
import { fadeUp, stagger, viewport } from '../motion.js'

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <motion.div
        className="container"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger}
      >
        <motion.p className="section-label" variants={fadeUp}>
          03. Skills
        </motion.p>
        <motion.h2 className="section-title" variants={fadeUp}>
          Technologies I work with
        </motion.h2>

        <div className="skills-grid">
          {skills.map((group) => (
            <motion.div className="skill-group" key={group.group} variants={fadeUp}>
              <h3>{group.group}</h3>
              <div className="skill-chips">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
