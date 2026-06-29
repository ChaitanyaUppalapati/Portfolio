import { motion } from 'framer-motion'
import { profile } from '../data.js'
import { MailIcon } from './icons.jsx'
import { fadeUp, stagger, viewport } from '../motion.js'
import Magnetic from './Magnetic.jsx'

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <motion.div
        className="container"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger}
      >
        <motion.p className="section-label" variants={fadeUp}>
          04. Contact
        </motion.p>
        <motion.h2 variants={fadeUp}>Let's build something together</motion.h2>
        <motion.p variants={fadeUp}>
          I'm currently open to new opportunities and collaborations. Whether you have a question or
          just want to say hi, my inbox is always open — I'll do my best to get back to you.
        </motion.p>
        <motion.div variants={fadeUp}>
          <Magnetic>
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>
              <MailIcon /> Say hello
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  )
}
