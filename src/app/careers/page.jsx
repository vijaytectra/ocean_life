import Link from "next/link";
import CareerApplicationForm from "@/components/careers/CareerApplicationForm";
import Newsletter from "@/components/Newsletter";
import styles from "./careers.module.css";

export const metadata = {
  title: "Careers | Ocean Lifespaces India Pvt Ltd",
  description:
    "Join Ocean Lifespaces. Explore career opportunities in civil construction, project management, and interior fit-out across India.",
  keywords: "Ocean Lifespaces careers jobs Chennai",
  alternates: {
    canonical: "https://www.olipl.com/careers",
  },
};

const OPEN_ROLES = [
  { title: "Civil Engineer", dept: "Construction" },
  { title: "Project Manager", dept: "Operations" },
  { title: "Site Engineer", dept: "Site Execution" },
  { title: "Interior Designer", dept: "Interior Fit-out" },
  { title: "Quantity Surveyor", dept: "Estimation" },
  { title: "MEP Engineer", dept: "MEP" },
  { title: "Safety Officer", dept: "HSE" },
  { title: "General Application", dept: "Open Pool" },
];

const WHY_JOIN = [
  {
    title: "30 Years of Legacy",
    text: "Be part of a trusted name in construction and real estate development across South India.",
  },
  {
    title: "Diverse Projects",
    text: "Work on corporate campuses, data centres, hospitals, and large-scale commercial builds.",
  },
  {
    title: "Growth & Learning",
    text: "Structured roles with mentorship from experienced project and engineering leaders.",
  },
  {
    title: "Multi-City Presence",
    text: "Opportunities in Chennai, Bangalore, Hyderabad, and expanding locations.",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1>Build Your Career With Ocean</h1>
          <p>
            We are always looking for talented professionals in construction,
            project management, and design. Submit your application and resume
            below.
          </p>
        </div>
      </section>

      <section className={styles.why}>
        <div className="container">
          <h2 className={`h2 ${styles.sectionTitle}`}>Why Join Us</h2>
          <div className={styles.whyGrid}>
            {WHY_JOIN.map((item) => (
              <article key={item.title} className={styles.whyCard}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.openings}>
        <div className="container">
          <h2 className={`h2 ${styles.sectionTitle}`}>Open Positions</h2>
          <p className={styles.sectionLead}>
            Select a role when applying, or choose General Application if your
            profile fits multiple teams.
          </p>
          <div className={styles.openingsList}>
            {OPEN_ROLES.map((role) => (
              <div key={role.title} className={styles.openingItem}>
                <h4>{role.title}</h4>
                <span>{role.dept}</span>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center" }}>
            <Link href="#apply" className={styles.ctaLink}>
              Apply now ↓
            </Link>
          </p>
        </div>
      </section>

      <section className={styles.applySection}>
        <div className="container">
          <CareerApplicationForm />
        </div>
      </section>

      <Newsletter />
    </>
  );
}
