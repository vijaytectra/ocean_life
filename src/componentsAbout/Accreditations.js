import styles from "./Accreditations.module.css";
import { DEFAULT_ACCREDITATIONS } from "@/lib/defaultAccreditations";

/** Server-rendered accreditations section on the About page. */
export default function Accreditations({ initialItems = [] }) {
  const items = initialItems?.length > 0 ? initialItems : DEFAULT_ACCREDITATIONS;

  return (
    <section className={styles.accreditations} aria-labelledby="accreditations-heading">
      <div className="container">
        <header className={styles.header}>
          <h2 id="accreditations-heading" className={styles.title}>
            Accreditations
          </h2>
          <p className={styles.lead}>
            Recognized standards and memberships that reflect our commitment to
            quality, safety, and industry excellence.
          </p>
        </header>

        <ul className={styles.grid}>
          {items.map((item) => (
            <li key={item.id ?? item.title} className={styles.card}>
              <div className={styles.logoWrap}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.logo}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p
                className={styles.cardText}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
