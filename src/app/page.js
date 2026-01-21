import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Izvorno kodo dobite na &nbsp;<a href="https://github.com/premisa-si/e-labex-bis-simulator" target="_blank" rel="noopener noreferrer">Github-u</a>
        </p>
        <div>
          <a
            href="http://www.premisa.si"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/premisa.svg"
              alt="Premisa Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
          <a
            href="http://www.patologija.si"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/institut_za_patologijo.svg"
              alt="Inštitut za patologijo Logo"
              className={styles.vercelLogo}
              width={42}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/labex.svg"
          alt="Labex Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="/simulator/send-referral"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Pošiljanje
          </h2>
          <p>Pošljite naročilnico v e-labex.</p>
        </a>

        <a
          href="/simulator/image-referral"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Slika
          </h2>
          <p>Pridobite sliko naročilnice po ID.</p>
        </a>

        <a
          href="/simulator/status-referral"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Status
          </h2>
          <p>Pridobite status naročilnice po ID ali po BIS številki naročilnice.</p>
        </a>

        <a
          href="/simulator/labels-referral-details"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Nalepke
          </h2>
          <p>Pridobite nalepke po ID naročilnice.</p>
        </a>

        <a
          href="/simulator/status-list-referral"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Seznam statusov
          </h2>
          <p>Pridobite seznam statusov za določen dan.</p>
        </a>

        <a
          href="/simulator/retrieve-token"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Pridobi žeton
          </h2>
          <p>Pridobite žeton za dostop do uporabniškega vmesnika.</p>
        </a>

        <a
          href="/simulator/medical-reports-referral"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Izvidi
          </h2>
          <p>
            Pridobite vse izvide za naročilnico.
          </p>
        </a>

        <a
          href="/labex-simulator/labex-actions"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Labex ukazi
          </h2>
          <p>Simulirajte akcije v Labex-u.</p>
        </a>        
      </div>

    </main>
  )
}
