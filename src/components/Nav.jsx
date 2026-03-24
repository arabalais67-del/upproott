import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Nav.module.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  const isHome = location.pathname === '/'

  return (
    <nav className={`${styles.nav} ${scrolled || !isHome ? styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo}>
        up<span>root</span>
      </Link>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        <li><Link to="/explore" className={styles.link}>Explore Cities</Link></li>
        <li><Link to="/search?type=housing" className={styles.link}>Housing</Link></li>
        <li><Link to="/search?type=jobs" className={styles.link}>Jobs</Link></li>
        <li><Link to="/quiz" className={styles.link}>City Match</Link></li>
        <li><Link to="/explore" className={styles.cta}>Get Started</Link></li>
      </ul>

      <button
        className={styles.burger}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span className={menuOpen ? styles.burgerLineOpen : styles.burgerLine} />
        <span className={menuOpen ? styles.burgerLineHide : styles.burgerLine} />
        <span className={menuOpen ? styles.burgerLineOpenAlt : styles.burgerLine} />
      </button>
    </nav>
  )
}
