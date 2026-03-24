import { Link } from 'react-router-dom'
import styles from './CityCard.module.css'

const TAG_STYLES = { sage: styles.tagSage, rust: styles.tagRust, gold: styles.tagGold }

export default function CityCard({ city }) {
  return (
    <Link to={`/city/${city.slug}`} className={styles.card}>
      <div className={styles.imgWrap}>
        <img src={city.thumb} alt={city.name} loading="lazy" />
        <div className={styles.overlay} />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{city.name}, {city.state}</h3>
        <div className={styles.pills}>
          {city.tags.map((tag, i) => (
            <span key={tag} className={`${styles.pill} ${TAG_STYLES[city.tagTypes[i]] || styles.tagSage}`}>{tag}</span>
          ))}
        </div>
        <div className={styles.stats}>
          <div>
            <strong>${city.avgRent.toLocaleString()}/mo</strong>
            <span>avg rent</span>
          </div>
          <div>
            <strong>{city.jobCount.toLocaleString()}</strong>
            <span>jobs</span>
          </div>
          <div>
            <strong>${Math.round(city.avgSalary / 1000)}k</strong>
            <span>avg salary</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
