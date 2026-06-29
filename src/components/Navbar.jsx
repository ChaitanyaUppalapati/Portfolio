import { useEffect, useState } from 'react'
import { profile } from '../data.js'
import { MenuIcon, CloseIcon } from './icons.jsx'

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a href="#top" className="nav-logo">
          C<span>U</span>.
        </a>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((link, i) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                <span className="num">0{i + 1}.</span>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              className="nav-resume"
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </a>
          </li>
        </ul>

        <button
          className="nav-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </nav>
  )
}
