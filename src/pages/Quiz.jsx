import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CITIES, QUIZ_QUESTIONS } from '../data/index.js'
import styles from './Quiz.module.css'

export default function Quiz() {
  const [step, setStep] = useState(0) // 0 = intro, 1..n = questions, n+1 = results
  const [answers, setAnswers] = useState({})

  const totalSteps = QUIZ_QUESTIONS.length
  const isIntro = step === 0
  const isResults = step > totalSteps
  const currentQ = QUIZ_QUESTIONS[step - 1]

  function selectAnswer(qId, option) {
    setAnswers(prev => ({ ...prev, [qId]: option }))
    setTimeout(() => setStep(s => s + 1), 300)
  }

  function computeResults() {
    const scores = {}
    CITIES.forEach(c => { scores[c.id] = 0 })

    Object.values(answers).forEach(option => {
      option.tags.forEach(cityId => {
        if (scores[cityId] !== undefined) scores[cityId] += 1
      })
    })

    return CITIES
      .map(c => ({ ...c, score: scores[c.id] || 0 }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  }

  if (isResults) {
    const results = computeResults()
    return (
      <div className={styles.page}>
        <div className={styles.resultsPage}>
          <span className={styles.eyebrow}>Your matches are in</span>
          <h1>Here's where you <em>belong</em></h1>
          <p className={styles.resultsSub}>Based on your answers, these cities fit your lifestyle and goals best.</p>

          <div className={styles.resultsGrid}>
            {results.map((city, i) => (
              <div key={city.id} className={`${styles.resultCard} ${i === 0 ? styles.topMatch : ''}`}>
                {i === 0 && <div className={styles.topBadge}>🏆 Top Match</div>}
                <div className={styles.resultImgWrap}>
                  <img src={city.thumb} alt={city.name} />
                  <div className={styles.resultOverlay} />
                  <div className={styles.resultCityName}>{city.name}, {city.state}</div>
                </div>
                <div className={styles.resultBody}>
                  <p className={styles.resultTagline}>{city.tagline}</p>
                  <div className={styles.resultStats}>
                    <div><strong>${city.avgRent.toLocaleString()}/mo</strong><span>avg rent</span></div>
                    <div><strong>${Math.round(city.avgSalary/1000)}k</strong><span>avg salary</span></div>
                    <div><strong>{city.jobCount.toLocaleString()}</strong><span>jobs</span></div>
                  </div>
                  <Link to={`/city/${city.slug}`} className={styles.resultCta}>
                    Explore {city.name} →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.retakeRow}>
            <button className={styles.retakeBtn} onClick={() => { setStep(0); setAnswers({}) }}>
              ↺ Retake Quiz
            </button>
            <Link to="/explore" className={styles.exploreAllBtn}>Browse All Cities</Link>
          </div>
        </div>
      </div>
    )
  }

  if (isIntro) {
    return (
      <div className={styles.page}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>City Match Quiz</span>
          <h1>Find your <em>perfect city</em></h1>
          <p>Answer {totalSteps} quick questions and we'll match you with the cities that fit your life, career, and personality.</p>
          <div className={styles.features}>
            {['🏠 Housing fit', '💼 Career match', '🌿 Lifestyle alignment', '💰 Budget reality-check'].map(f => (
              <span key={f} className={styles.featurePill}>{f}</span>
            ))}
          </div>
          <button className={styles.startBtn} onClick={() => setStep(1)}>
            Start Quiz →
          </button>
          <p className={styles.timeNote}>Takes about 2 minutes</p>
        </div>
      </div>
    )
  }

  // Question step
  return (
    <div className={styles.page}>
      <div className={styles.quizContainer}>
        {/* Progress */}
        <div className={styles.progress}>
          <div className={styles.progressBar} style={{ width: `${((step - 1) / totalSteps) * 100}%` }} />
        </div>
        <div className={styles.progressLabel}>
          Question {step} of {totalSteps}
        </div>

        <div className={styles.questionCard}>
          <h2 className={styles.question}>{currentQ.question}</h2>
          <div className={styles.options}>
            {currentQ.options.map(option => (
              <button
                key={option.value}
                className={`${styles.option} ${answers[currentQ.id]?.value === option.value ? styles.selected : ''}`}
                onClick={() => selectAnswer(currentQ.id, option)}
              >
                <span className={styles.optionLabel}>{option.label}</span>
                <span className={styles.optionArrow}>→</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.navRow}>
          {step > 1 && (
            <button className={styles.backBtn} onClick={() => setStep(s => s - 1)}>
              ← Back
            </button>
          )}
          <button className={styles.skipBtn} onClick={() => setStep(s => s + 1)}>
            Skip →
          </button>
        </div>
      </div>
    </div>
  )
}
