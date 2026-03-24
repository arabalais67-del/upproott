import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CITIES, LISTINGS, JOBS } from '../data/index.js'
import ListingCard from '../components/ListingCard'
import styles from './Search.module.css'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeType, setActiveType] = useState(searchParams.get('type') || 'all')
  const [cityFilter, setCityFilter] = useState(searchParams.get('city') || '')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [remoteOnly, setRemoteOnly] = useState(false)

  const allItems = [...LISTINGS, ...JOBS]

  const filtered = allItems.filter(item => {
    if (activeType === 'housing' && item.type !== 'housing') return false
    if (activeType === 'jobs' && item.type !== 'job') return false
    if (cityFilter) {
      const city = CITIES.find(c => c.id === item.cityId)
      if (!city) return false
      if (!city.name.toLowerCase().includes(cityFilter.toLowerCase()) &&
          !city.state.toLowerCase().includes(cityFilter.toLowerCase())) return false
    }
    if (item.type === 'housing') {
      if (priceMin && item.price < parseInt(priceMin)) return false
      if (priceMax && item.price > parseInt(priceMax)) return false
    }
    if (item.type === 'job') {
      if (remoteOnly && item.remote === 'On-site') return false
    }
    return true
  })

  const housingCount = filtered.filter(i => i.type === 'housing').length
  const jobCount = filtered.filter(i => i.type === 'job').length

  function getCity(cityId) {
    return CITIES.find(c => c.id === cityId)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <h1>Find your next <em>opportunity</em></h1>
          <div className={styles.searchBar}>
            <input
              className={styles.cityInput}
              type="text"
              placeholder="Search by city (e.g. Austin, Denver…)"
              value={cityFilter}
              onChange={e => setCityFilter(e.target.value)}
            />
          </div>
          <div className={styles.typeTabs}>
            {[['all', `All (${allItems.length})`], ['housing', `🏠 Housing`], ['jobs', `💼 Jobs`]].map(([val, label]) => (
              <button
                key={val}
                className={`${styles.typeTab} ${activeType === val ? styles.activeTypeTab : ''}`}
                onClick={() => setActiveType(val)}
              >{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Filters */}
        <aside className={styles.filters}>
          <h3 className={styles.filterTitle}>Filters</h3>

          {(activeType === 'all' || activeType === 'housing') && (
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Monthly Rent</label>
              <div className={styles.rangeRow}>
                <input
                  className={styles.rangeInput}
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={e => setPriceMin(e.target.value)}
                />
                <span>–</span>
                <input
                  className={styles.rangeInput}
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={e => setPriceMax(e.target.value)}
                />
              </div>
            </div>
          )}

          {(activeType === 'all' || activeType === 'jobs') && (
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Work Style</label>
              <label className={styles.checkLabel}>
                <input
                  type="checkbox"
                  checked={remoteOnly}
                  onChange={e => setRemoteOnly(e.target.checked)}
                />
                <span>Remote / Hybrid only</span>
              </label>
            </div>
          )}

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Browse by city</label>
            <div className={styles.cityList}>
              {CITIES.map(c => (
                <button
                  key={c.id}
                  className={`${styles.cityBtn} ${cityFilter === c.name ? styles.cityBtnActive : ''}`}
                  onClick={() => setCityFilter(cityFilter === c.name ? '' : c.name)}
                >
                  {c.name}, {c.state}
                  <span className={styles.cityCount}>
                    {[...LISTINGS, ...JOBS].filter(i => i.cityId === c.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            className={styles.clearAll}
            onClick={() => { setCityFilter(''); setPriceMin(''); setPriceMax(''); setRemoteOnly(false); setActiveType('all') }}
          >
            Clear all filters
          </button>
        </aside>

        {/* Results */}
        <div className={styles.results}>
          <div className={styles.resultsHeader}>
            <span className={styles.resultsCount}>
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              {activeType === 'all' && ` (${housingCount} homes, ${jobCount} jobs)`}
              {cityFilter && ` in ${cityFilter}`}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3>No results found</h3>
              <p>Try adjusting your filters or searching a different city.</p>
              <button onClick={() => { setCityFilter(''); setPriceMin(''); setPriceMax(''); setRemoteOnly(false) }}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map(item => {
                const city = getCity(item.cityId)
                return (
                  <div key={item.id} className={styles.itemWrap}>
                    {city && (
                      <Link to={`/city/${city.slug}`} className={styles.cityTag}>
                        📍 {city.name}, {city.state}
                      </Link>
                    )}
                    <ListingCard item={item} />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
