import Link from "next/link";
import prisma from "@/lib/prisma";
import { getServiceCategoryPath } from "@/lib/serviceCategoryRoutes";
import styles from "./offering.module.css";

export async function generateMetadata({ params }) {
  const id = parseInt((await params).id, 10);
  if (Number.isNaN(id)) {
    return { title: "Service | Ocean Lifespaces" };
  }
  const service = await prisma.service.findUnique({ where: { id } });
  return {
    title: service ? `${service.name} | Ocean Lifespaces` : "Service | Ocean Lifespaces",
    description: service?.description?.slice(0, 160) || "",
  };
}

export default async function ServiceOfferingPage({ params }) {
  const id = parseInt((await params).id, 10);
  if (Number.isNaN(id)) {
    return (
      <div className="container" style={{ padding: "80px 20px" }}>
        <p>Invalid link.</p>
        <Link href="/services">Back to services</Link>
      </div>
    );
  }

  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) {
    return (
      <div className="container" style={{ padding: "80px 20px" }}>
        <h1 className="h2">Offering not found</h1>
        <Link href="/services" className={styles.backLink}>
          ← All services
        </Link>
      </div>
    );
  }

  const categoryHref = getServiceCategoryPath(service.type);
  const subItems =
    typeof service.subServices === "string" && service.subServices.trim().length > 0
      ? service.subServices.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

  return (
    <article className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/services">Our services</Link>
          <span aria-hidden>/</span>
          <Link href={categoryHref}>{service.type}</Link>
          <span aria-hidden>/</span>
          <span className={styles.breadcrumbCurrent}>{service.name}</span>
        </nav>

        <div className={styles.hero}>
          {service.image ? (
            <div className={styles.heroMedia}>
              <img
                src={service.image}
                alt=""
                className={styles.heroImg}
                decoding="async"
              />
            </div>
          ) : null}
          <div className={styles.heroText}>
            <p className={styles.kicker}>{service.type}</p>
            <h1 className={styles.title}>{service.name}</h1>
            {service.description ? <p className={styles.lead}>{service.description}</p> : null}
          </div>
        </div>

        {(subItems.length > 0 || service.recentProject || service.ongoingProject) && (
          <section className={styles.panel}>
            {subItems.length > 0 ? (
              <div className={styles.block}>
                <h2 className={styles.h2}>Focus areas</h2>
                <ul className={styles.chipList}>
                  {subItems.map((item) => (
                    <li key={item} className={styles.chip}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {(service.recentProject || service.ongoingProject) && (
              <div className={styles.metaGrid}>
                {service.recentProject ? (
                  <div className={styles.metaCard}>
                    <span className={styles.metaLabel}>Recent project</span>
                    <p className={styles.metaValue}>{service.recentProject}</p>
                  </div>
                ) : null}
                {service.ongoingProject ? (
                  <div className={styles.metaCard}>
                    <span className={styles.metaLabel}>Ongoing</span>
                    <p className={styles.metaValue}>{service.ongoingProject}</p>
                  </div>
                ) : null}
              </div>
            )}
          </section>
        )}

        <div className={styles.actions}>
          <Link href={categoryHref} className={styles.btnSecondary}>
            ← Back to {service.type}
          </Link>
          <Link href="/contact" className={styles.btnPrimary}>
            Enquire about this
          </Link>
        </div>
      </div>
    </article>
  );
}
