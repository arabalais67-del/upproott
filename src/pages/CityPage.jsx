import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CITIES, LISTINGS, JOBS } from '../data/index.js'
import ListingCard from '../components/ListingCard'
import styles from './CityPage.module.css'

function ScoreBar({ label, value, max = 100 }) {
  return (
    <div className={styles.scoreBar}>
      <div className={styles.scoreLabel}>
        <span>{label}</span>
        <span className={styles.scoreNum}>{value}/100</span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${(value / max) * 100}%` }} />
      </div>
    </div>
  )
}

export default function CityPage() {
  const { slug } = useParams()
  const city = CITIES.find(c => c.slug === slug)
  const [activeTab, setActiveTab] = useState('housing')

  if (!city) {
    return (
      <div className={styles.notFound}>
        <h2>City not found</h2>
        <Link to="/explore">← Back to Explore</Link>
      </div>
    )
  }

  const cityListings = LISTINGS.filter(l => l.cityId === city.id)
  const cityJobs = JOBS.filter(j => j.cityId === city.id)

  return (
    <div className={styles.page}>
      {/* Hero banner */}
      <div className={styles.hero}>
        <img src={city.image} alt={city.name} className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <Link to="/explore" className={styles.back}>← All Cities</Link>
          <h1>{city.name}, <span>{city.state}</span></h1>
          <p className={styles.tagline}>{city.tagline}</p>
          <div className={styles.heroPills}>
            {city.tags.map(t => <span key={t} className={styles.pill}>{t}</span>)}
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className={styles.quickStats}>
        {[
          { label: 'Avg Rent', value: `$${city.avgRent.toLocaleString()}/mo` },
          { label: 'Avg Salary', value: `$${Math.round(city.avgSalary/1000)}k/yr` },
          { label: 'Population', value: city.population.toLocaleString() },
          { label: 'Open Jobs', value: city.jobCount.toLocaleString() },
          { label: 'Cost of Living', value: `${city.costOfLiving} index` },
        ].map(s => (
          <div key={s.label} className={styles.quickStat}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.body}>
        <div className={styles.mainCol}>
          {/* Tabs */}
          <div className={styles.tabs}>
            {[
              { key: 'housing', label: `🏠 Housing (${cityListings.length})` },
              { key: 'jobs',    label: `💼 Jobs (${cityJobs.length})` },
              { key: 'about',   label: '📊 City Info' },
            ].map(t => (
              <button
                key={t.key}
                className={`${styles.tab} ${activeTab === t.key ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(t.key)}
              >{t.label}</button>
            ))}
          </div>

          {/* Housing listings */}
          {activeTab === 'housing' && (
            <div className={styles.listingsGrid}>
              {cityListings.length > 0 ? cityListings.map(l => (
                <ListingCard key={l.id} item={l} />
              )) : (
                <p className={styles.noResults}>No housing listings yet for {city.name}. Check back soon!</p>
              )}
            </div>
          )}

          {/* Job listings */}
          {activeTab === 'jobs' && (
            <div className={styles.listingsGrid}>
              {cityJobs.length > 0 ? cityJobs.map(j => (
                <ListingCard key={j.id} item={j} />
              )) : (
                <p className={styles.noResults}>No job listings yet for {city.name}. Check back soon!</p>
              )}
            </div>
          )}

          {/* City info */}
          {activeTab === 'about' && (
            <div className={styles.about}>
              <div className={styles.aboutCard}>
                <h3>Livability Scores</h3>
                <ScoreBar label="Walk Score" value={city.walkScore} />
                <ScoreBar label="Transit Score" value={city.transitScore} />
                <ScoreBar label="Bike Score" value={city.bikeScore} />
              </div>
              <div className={styles.aboutCard}>
                <h3>Top Employers</h3>
                <ul className={styles.simpleList}>
                  {city.topEmployers.map(e => <li key={e}>{e}</li>)}
                </ul>
              </div>
              <div className={styles.aboutCard}>
                <h3>Top Industries</h3>
                <div className={styles.industryPills}>
                  {city.industries.map(i => <span key={i} className={styles.industryPill}>{i}</span>)}
                </div>
              </div>
              <div className={styles.aboutCard}>
                <h3>Neighborhoods</h3>
                <div className={styles.industryPills}>
                  {city.neighborhoods.map(n => <span key={n} className={styles.nbrPill}>{n}</span>)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sideCard}>
            <h4>Cost of Living</h4>
            <p className={styles.costIndex}>{city.costOfLiving}</p>
            <p className={styles.costNote}>Index (100 = US average)</p>
            <div className={styles.costBreakdown}>
              <div><span>Avg Rent</span><strong>${city.avgRent.toLocaleString()}/mo</strong></div>
              <div><span>Avg Salary</span><strong>${city.avgSalary.toLocaleString()}/yr</strong></div>
              <div><span>Monthly surplus est.</span><strong>${Math.round((city.avgSalary / 12) - city.avgRent).toLocaleString()}</strong></div>
            </div>
          </div>

          <div className={styles.sideCard}>
            <h4>Safety</h4>
            <p className={styles.crimeScore} style={{ color: city.crimeIndex < 40 ? 'var(--sage)' : city.crimeIndex < 55 ? '#c8a86a' : 'var(--rust)' }}>
              {city.crimeIndex < 40 ? 'Low' : city.crimeIndex < 55 ? 'Moderate' : 'Higher'} Crime
            </p>
            <p className={styles.costNote}>Crime index: {city.crimeIndex}/100</p>
          </div>

          <div className={styles.sideCard}>
            <h4>Take the City Quiz</h4>
            <p className={styles.quizNote}>See if {city.name} is truly your best match.</p>
            <Link to="/quiz" className={styles.quizBtn}>Start Quiz →</Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
