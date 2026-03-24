import { useState } from 'react'
import { CITIES } from '../data/index.js'
import CityCard from '../components/CityCard'
import styles from './Explore.module.css'

const SORT_OPTIONS = [
  { value: 'default', label: 'Trending' },
  { value: 'rent-asc', label: 'Lowest Rent' },
  { value: 'rent-desc', label: 'Highest Rent' },
  { value: 'jobs', label: 'Most Jobs' },
  { value: 'cost', label: 'Lowest Cost of Living' },
]

const FILTER_TAGS = ['Tech Hub', 'Affordable', 'Outdoorsy', 'No State Tax', 'Fast Growth', 'Bike-Friendly', 'Creative', 'Finance Hub']

export default function Explore() {
  const [sort, setSort] = useState('default')
  const [activeTags, setActiveTags] = useState([])
  const [search, setSearch] = useState('')

  function toggleTag(tag) {
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  const filtered = CITIES
    .filter(c => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.state.toLowerCase().includes(search.toLowerCase())) return false
      if (activeTags.length > 0 && !activeTags.some(t => c.tags.includes(t))) return false
      return true
    })
    .sort((a, b) => {
      if (sort === 'rent-asc') return a.avgRent - b.avgRent
      if (sort === 'rent-desc') return b.avgRent - a.avgRent
      if (sort === 'jobs') return b.jobCount - a.jobCount
      if (sort === 'cost') return a.costOfLiving - b.costOfLiving
      return 0
    })

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Find your place</span>
          <h1>Explore <em>every city</em></h1>
          <p>Browse cities by lifestyle, budget, and opportunity. Compare at a glance, then dive deep.</p>
        </div>
      </div>

      <div className={styles.main}>
        {/* Filters sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.filterBlock}>
            <label className={styles.filterLabel}>Search cities</label>
            <input
              className={styles.filterInput}
              type="text"
              placeholder="e.g. Austin, TX"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.filterBlock}>
            <label className={styles.filterLabel}>Sort by</label>
            <select className={styles.filterSelect} value={sort} onChange={e => setSort(e.target.value)}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div className={styles.filterBlock}>
            <label className={styles.filterLabel}>Filter by vibe</label>
            <div className={styles.tagFilters}>
              {FILTER_TAGS.map(tag => (
                <button
                  key={tag}
                  className={`${styles.tagBtn} ${activeTags.includes(tag) ? styles.tagBtnActive : ''}`}
                  onClick={() => toggleTag(tag)}
                >{tag}</button>
              ))}
            </div>
          </div>

          {activeTags.length > 0 && (
            <button className={styles.clearBtn} onClick={() => setActiveTags([])}>
              Clear filters
            </button>
          )}
        </aside>

        {/* City grid */}
        <div className={styles.content}>
          <div className={styles.resultsHeader}>
            <span className={styles.resultCount}>{filtered.length} cities</span>
          </div>
          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map(city => <CityCard key={city.id} city={city} />)}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>No cities match your filters.</p>
              <button onClick={() => { setActiveTags([]); setSearch('') }}>Reset filters</button>
            </div>
          )}
        </div>
      </div>

      {/* Compare strip */}
      <div className={styles.compareStrip}>
        <div className={styles.compareInner}>
          <div>
            <h3>Not sure where to start?</h3>
            <p>Our City Match Quiz finds your best fit in under 2 minutes.</p>
          </div>
          <a href="/quiz" className={styles.compareBtn}>Take the Quiz →</a>
        </div>
      </div>
    </div>
  )
}
