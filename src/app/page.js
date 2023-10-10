import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Izvorno kodo dobite na &nbsp;<a href="/simulator/send-referral">Github-u</a>
        </p>
        <div>
          <a
            href="http://wwww.premisa.si"
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
            href="http://wwww.patologija.si"
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
            Pošiljanje <span>-&gt;</span>
          </h2>
          <p>Pošljite naročilnico v e-labex.</p>
        </a>

        <a
          href="/simulator/status-referral"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Status <span>-&gt;</span>
          </h2>
          <p>Pridobite status naročilnice po ID ali po vaši interni številki.</p>
        </a>

        <a
          href="/simulator/status-list-referral"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Seznam statusov <span>-&gt;</span>
          </h2>
          <p>Pridobite seznam statusov za določen dan.</p>
        </a>

        <a
          href="/simulator/medical-report-referral"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Izvidi <span>-&gt;</span>
          </h2>
          <p>
            Pridobite vse izvide za naročilnico.
          </p>
        </a>
      </div>
    </main>
  )
}
