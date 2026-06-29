import { profile } from '../data.js'
import { GitHubIcon, LinkedInIcon, MailIcon } from './icons.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-socials">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <MailIcon />
          </a>
        </div>
        <p>
          Built with React &amp; Vite by {profile.name} · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
