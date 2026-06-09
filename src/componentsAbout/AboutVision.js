import Image from "next/image";
import styles from "./AboutVision.module.css";

export default function AboutVision() {
  return (
    <div className={styles.visionWrap}>
      <section className={styles.quoteSection}>
        <div className="container">
          <div className={styles.quoteCard}>
            <span className={styles.quotePill}>Industry partnerships</span>
            <blockquote className={styles.quoteBlock}>
              <Image
                width={48}
                height={30}
                src="/about/quote.webp"
                alt=""
                className={styles.quoteIcon}
              />
              <p className={styles.quoteText}>
                We have collaborated with some of the leading Architects and
                Project Management Consultants (PMCs) in India, on one-of-a-kind
                projects.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <section className={styles.mission}>
        <div className="container">
          <div className={styles.missionLayout}>
            <div className={styles.missionMain}>
              <div className={styles.missionHighlight}>
                <span className={styles.eyebrow}>Our purpose</span>
                <h2 className={styles.missionTitle}>Mission and Vision</h2>

                <div className={styles.missionPoints}>
                  <article className={styles.pointCard}>
                    <p className={styles.missionText}>
                      We strive for excellence by continuously evolving our
                      systems, processes, and teams to stay ahead of our
                      clients&apos; present and future needs. Through innovation
                      and dedication, we ensure unparalleled service and
                      customer satisfaction. <br />
                      <br />
                      To establish ourselves as the most trusted and
                      sought-after name across industries, building lasting
                      partnerships and achieving success that transcends
                      boundaries.
                    </p>
                  </article>
                </div>
              </div>

              <div className={styles.missionImgWide}>
                <Image
                  width={560}
                  height={280}
                  src="/about/vision-left.webp"
                  alt="Ocean Lifespaces mission"
                  className={styles.missionImg}
                  sizes="(max-width: 900px) 100vw, 60vw"
                />
              </div>
            </div>

            <aside className={styles.missionAside}>
              <div className={styles.asideFrame}>
                <Image
                  width={420}
                  height={520}
                  src="/about/vision-right.webp"
                  alt="Ocean Lifespaces vision"
                  className={styles.sideImg}
                  sizes="(max-width: 900px) 100vw, 40vw"
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
