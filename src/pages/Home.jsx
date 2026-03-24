import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CITIES } from '../data/index.js'
import CityCard from '../components/CityCard'
import styles from './Home.module.css'

const MOSAIC = [
  { city: 'Austin', img: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=700&q=80', span: 'tall' },
  { city: 'Denver', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80' },
  { city: 'Nashville', img: 'https://images.unsplash.com/photo-1601581875039-e899893d520c?w=500&q=80' },
  { city: 'Miami', img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=700&q=80', span: 'tall' },
  { city: 'Portland', img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&q=80' },
  { city: 'Raleigh', img: 'https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?w=500&q=80' },
]

const TABS = ['Housing + Jobs', 'Jobs Only', 'City Match']

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    if (activeTab === 2) { navigate('/quiz'); return }
    const params = new URLSearchParams()
    if (query) params.set('city', query)
    if (activeTab === 1) params.set('type', 'jobs')
    else if (activeTab === 0) params.set('type', 'all')
    navigate(`/search?${params.toString()}`)
  }

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.eyebrow}>Your relocation platform</span>
          <h1 className={styles.headline}>
            Find your <em>next city,</em><br />not just a next apartment.
          </h1>
          <p className={styles.sub}>
            Uproot combines job listings, housing search, and neighborhood data
            so you can make your move with full confidence — not just a prayer.
          </p>

          <form className={styles.searchWidget} onSubmit={handleSearch}>
            <div className={styles.searchTabs}>
              {TABS.map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  className={`${styles.searchTab} ${activeTab === i ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab(i)}
                >{tab}</button>
              ))}
            </div>
            <div className={styles.searchRow}>
              {activeTab < 2 ? (
                <input
                  className={styles.searchInput}
                  type="text"
                  placeholder="Where do you want to go? (e.g. Austin, TX)"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              ) : (
                <div className={styles.quizHint}>Answer a few questions → get your perfect city match</div>
              )}
              <button type="submit" className={styles.searchBtn}>
                {activeTab === 2 ? 'Take Quiz →' : 'Explore →'}
              </button>
            </div>
            <p className={styles.hint}>
              Or try our <Link to="/quiz">City Match Quiz</Link> to discover where you'd thrive.
            </p>
          </form>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.mosaic}>
            {MOSAIC.map((m) => (
              <div key={m.city} className={`${styles.mosaicCell} ${m.span === 'tall' ? styles.tall : ''}`}>
                <img src={m.img} alt={m.city} loading="lazy" />
                <span className={styles.cityLabel}>{m.city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className={styles.stats}>
        {[['240+','Cities Covered'],['1.2M','Active Listings'],['580K','Job Openings'],['94%','Match Accuracy']].map(([num, label]) => (
          <div key={label} className={styles.stat}>
            <span className={styles.statNum}>{num}</span>
            <span className={styles.statLabel}>{label}</span>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <section className={styles.howSection}>
        <p className={styles.sectionEyebrow}>The process</p>
        <h2 className={styles.sectionTitle}>Moving is hard. We make the <em>decision</em> easy.</h2>
        <div className={styles.steps}>
          {[
            { n:'01', icon:'🧭', title:'Tell us what matters to you', body:'Set your career priorities, budget, lifestyle preferences, and dealbreakers. Our algorithm does the rest — no more endless tab-switching.' },
            { n:'02', icon:'🏙️', title:'Explore cities side-by-side', body:'Compare housing prices, average salaries in your field, commute times, crime rates, and cultural fit — all in one view.' },
            { n:'03', icon:'📦', title:'Apply and book tours, together', body:'Apply to jobs and schedule housing tours in the same flow. Know before you go — line up your life before you land.' },
          ].map(s => (
            <div key={s.n} className={styles.step}>
              <div className={styles.stepNum}>{s.n}</div>
              <div className={styles.stepIcon}>{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED CITIES */}
      <section className={styles.citiesSection}>
        <div className={styles.citiesHeader}>
          <div>
            <p className={styles.sectionEyebrowLight}>Trending destinations</p>
            <h2 className={styles.sectionTitleLight}>Where people are <em>moving right now</em></h2>
          </div>
          <Link to="/explore" className={styles.viewAll}>View all cities →</Link>
        </div>
        <div className={styles.cityGrid}>
          {CITIES.map(city => <CityCard key={city.id} city={city} />)}
        </div>
      </section>

      {/* FEATURE HIGHLIGHT */}
      <section className={styles.featureSection}>
        <div className={styles.featureText}>
          <p className={styles.sectionEyebrow}>Smarter search</p>
          <h2 className={styles.sectionTitle}>Housing and jobs, <em>finally together</em></h2>
          <p className={styles.featureDesc}>
            Stop toggling between Zillow and Indeed. Uproot shows you available homes
            near your potential workplace, ranked by commute time — and it updates as you browse jobs.
          </p>
          <ul className={styles.featureList}>
            {[
              'See housing affordability on your projected salary',
              'Filter homes by commute time to job listings',
              'Neighborhood safety, schools & walkability scores',
              'Cost-of-living adjusted salary comparison',
              'Save cities and listings to compare later',
            ].map(f => (
              <li key={f}><span className={styles.check} />  {f}</li>
            ))}
          </ul>
          <Link to="/explore" className={styles.featureCta}>Start exploring →</Link>
        </div>
        <div className={styles.featureMock}>
          <div className={styles.mockPanel}>
            <div className={styles.mockHeader}>
              <span className={`${styles.mockTab} ${styles.mockTabActive}`}>Homes (142)</span>
              <span className={styles.mockTab}>Jobs (84)</span>
              <span className={styles.mockLocation}>Austin, TX</span>
            </div>
            {[
              { e:'🏠', t:'2BR in East Austin · Modern', s:'1,100 sqft · 8 min to downtown', p:'$2,200/mo', b:'New' },
              { e:'🏡', t:'3BR Home · Bouldin Creek', s:'1,450 sqft · 12 min to job', p:'$2,900/mo', b:'Popular' },
              { e:'🏢', t:'Studio · Mueller District', s:'620 sqft · 5 min walk to job', p:'$1,450/mo', b:'Match' },
              { e:'🏠', t:'1BR Condo · South Congress', s:'780 sqft · 15 min commute', p:'$1,850/mo', b:'Popular' },
            ].map(item => (
              <div key={item.t} className={styles.mockListing}>
                <div className={styles.mockEmoji}>{item.e}</div>
                <div className={styles.mockBody}>
                  <div className={styles.mockTitle}>{item.t}</div>
                  <div className={styles.mockSub}>{item.s}</div>
                  <div className={styles.mockPrice}>{item.p}</div>
                </div>
                <span className={styles.mockBadge}>{item.b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2>Ready to uproot your life?<br /><em>(In the best way.)</em></h2>
          <p>Join 80,000+ people who found their next city with Uproot.</p>
          <div className={styles.ctaBtns}>
            <Link to="/explore" className={styles.ctaBtnPrimary}>Start Your Search</Link>
            <Link to="/quiz" className={styles.ctaBtnOutline}>Take the City Quiz</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
