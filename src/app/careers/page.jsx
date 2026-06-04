import Image from "next/image";
import CareerApplicationForm from "@/components/careers/CareerApplicationForm";
import CareersWhyJoin from "@/components/careers/CareersWhyJoin";
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

export default function CareersPage() {
  return (
    <>
      <section className={styles.hero}>
        <Image
          src="/career/career.png"
          alt="Careers at Ocean Lifespaces"
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />
        <div className={styles.heroOverlay} aria-hidden />
        <div className={styles.heroInner}>
          <h1>Build Your Career With Ocean</h1>
          <p>
            We are always looking for talented professionals in construction,
            project management, and design. Submit your application and resume
            below.
          </p>
        </div>
      </section>

      <CareersWhyJoin />

      <section className={styles.applySection}>
        <div className="container">
          <CareerApplicationForm />
        </div>
      </section>

      <Newsletter />
    </>
  );
}
