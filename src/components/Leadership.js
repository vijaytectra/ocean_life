import Image from "next/image";
import styles from "./Leadership.module.css";

function Leadership() {
  return (
    <section className={styles.Leadership}>
      <div className={styles.mainRowLeadership}>
        <div className={styles.columnLeadership}>
          <Image width={500} height={200} src="/leader.webp" alt="Leader" />
          <div className={styles.floatRow}>
            <h3 className="h4">Mr S.K. Peter</h3>
            <p className="description">Managing Director & CEO</p>
          </div>
        </div>
        <div className={styles.columnLeadership}>
          <h4>Leading with Excellence</h4>
          <h2>Meet our Managing Director & CEO</h2>
          <p>
            Under the visionary leadership of Mr. S.K. Peter, the organization
            has reached new heights of excellence. His strategic foresight,
            relentless drive, and commitment to innovation have been
            instrumental in shaping the company&apos;s success and industry
            leadership.
          </p>
          <p>
            Recognizing the potential of offering comprehensive solutions, he
            transformed the company into a full-service turnkey general
            contracting firm, encompassing Interior Works, Civil Construction,
            and Infrastructure Development. By fostering strong alliances with
            leading architects, he further elevated the company&apos;s
            capabilities, evolving it from a general contracting firm into a
            prominent EPC contractor—solidifying Ocean&apos;s formidable
            presence in the fields of Interiors, Infrastructure Development, and
            Civil Construction.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Leadership;
