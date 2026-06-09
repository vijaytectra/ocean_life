import Image from "next/image";
import AboutHeaderStats from "./AboutHeaderStats";
import styles from "./AboutHeader.module.css";

export default function AboutHeader() {
  return (
    <section className={styles.aboutHeader}>
      <div className={styles.heroOverlay} aria-hidden />
      <div className={styles.topBand} aria-hidden />
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.grid}>
          <div className={styles.mediaCol}>
            <div className={styles.mediaFrame}>
              <Image
                src="/about/header-left.webp"
                alt="Ocean Lifespaces workspace"
                width={480}
                height={560}
                className={styles.mediaImg}
                priority
              />
            </div>
          </div>

          <div className={styles.contentCol}>
            <p className={styles.eyebrowLight}>About Ocean Lifespaces</p>
            <h1 className={styles.title}>Experience the difference</h1>
            <p className={styles.lead}>
              We create exceptional interior design solutions and build expertise
              that stands among the best in the industry.
            </p>

            <p className={styles.results}>Outstanding results</p>
            <AboutHeaderStats />
          </div>

          <div className={styles.mediaCol}>
            <div className={styles.mediaFrame}>
              <Image
                src="/about/header-right.webp"
                alt="Ocean Lifespaces project"
                width={480}
                height={560}
                className={styles.mediaImg}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
