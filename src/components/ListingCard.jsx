import { Link } from 'react-router-dom'
import styles from './ListingCard.module.css'

export default function ListingCard({ item }) {
  const isJob = item.type === 'job'

  return (
    <div className={styles.card}>
      {isJob ? (
        <>
          <div className={styles.jobHeader}>
            <div className={styles.companyLogo}>{item.companyLogo}</div>
            <div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.sub}>{item.company} · {item.neighborhood}</p>
            </div>
            <span className={styles.remote}>{item.remote}</span>
          </div>
          <p className={styles.desc}>{item.description.slice(0, 120)}…</p>
          <div className={styles.tagRow}>
            {item.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
          </div>
          <div className={styles.footer}>
            <span className={styles.salary}>
              ${item.salary.toLocaleString()} – ${item.salaryMax.toLocaleString()}
            </span>
            <span className={styles.posted}>{item.posted}</span>
          </div>
        </>
      ) : (
        <>
          <div className={styles.housingImg}>
            <img src={item.image} alt={item.title} loading="lazy" />
            <div className={styles.price}>${item.price.toLocaleString()}/mo</div>
          </div>
          <div className={styles.housingBody}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.sub}>{item.neighborhood} · {item.commuteMin} min commute</p>
            <div className={styles.housingStats}>
              <span>{item.beds === 0 ? 'Studio' : `${item.beds} bed`}</span>
              <span>·</span>
              <span>{item.baths} bath</span>
              <span>·</span>
              <span>{item.sqft.toLocaleString()} sqft</span>
            </div>
            <div className={styles.tagRow}>
              {item.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
