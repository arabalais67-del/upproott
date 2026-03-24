import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>up<span>root</span></Link>
          <p>The only platform that treats your move as a whole-life decision — not just an apartment hunt.</p>
          <div className={styles.social}>
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="Instagram">◈</a>
            <a href="#" aria-label="LinkedIn">in</a>
          </div>
        </div>
        <div className={styles.col}>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/explore">City Rankings</Link></li>
            <li><Link to="/explore">Cost of Living</Link></li>
            <li><Link to="/explore">Neighborhoods</Link></li>
            <li><Link to="/explore">School Ratings</Link></li>
          </ul>
        </div>
        <div className={styles.col}>
          <h4>Find</h4>
          <ul>
            <li><Link to="/search?type=housing">Housing Listings</Link></li>
            <li><Link to="/search?type=jobs">Job Openings</Link></li>
            <li><Link to="/quiz">City Match Quiz</Link></li>
            <li><Link to="/search">Salary Compare</Link></li>
          </ul>
        </div>
        <div className={styles.col}>
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">For Employers</a></li>
            <li><a href="#">For Landlords</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© 2026 Uproot Inc. All rights reserved.</span>
        <span className={styles.legal}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookies</a>
        </span>
      </div>
    </footer>
  )
}
