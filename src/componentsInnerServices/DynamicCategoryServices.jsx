"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./DynamicCategoryServices.module.css";

const PLACEHOLDER_IMG = "/foot-logo.svg";

function ServiceMedia({ src, alt }) {
  const [url, setUrl] = useState(src || "");

  useEffect(() => {
    setUrl(src || "");
  }, [src]);

  if (!url) {
    return <div className={styles.mediaPlaceholder} aria-hidden />;
  }

  return (
    <div className={styles.mediaWrap}>
      <img
        src={url}
        alt={alt || ""}
        className={styles.cardImg}
        loading="lazy"
        decoding="async"
        onError={() => setUrl(PLACEHOLDER_IMG)}
      />
    </div>
  );
}

export default function DynamicCategoryServices({ categoryType, sectionTitle }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!categoryType) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    const url = `/api/services?type=${encodeURIComponent(categoryType)}`;

    fetch(url, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data)) {
          setItems(data);
          setError("");
        } else {
          setItems([]);
          setError(typeof data?.error === "string" ? data.error : "Could not load services.");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setItems([]);
          setError("Could not load services.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [categoryType]);

  const title = sectionTitle || "Our offerings in this category";

  if (loading) {
    return (
      <section className={styles.section} aria-busy="true">
        <div className="container">
          <p className={styles.loading}>Loading services…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.section}>
        <div className="container">
          <p className={styles.empty} role="alert">
            {error}
          </p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return null;
  }

  const subServiceList = (raw) =>
    typeof raw === "string" && raw.trim().length > 0
      ? raw.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>{title}</h2>
        <p className={styles.sub}>
          Managed from the admin Services screen. Tap a card to open the full offering page.
        </p>
        <div className={styles.grid}>
          {items.map((service) => (
            <Link key={service.id} href={`/services/offering/${service.id}`} className={styles.cardLink}>
              <article className={styles.card}>
                <ServiceMedia src={service.image} alt={service.name} />
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{service.name}</h3>
                  <span className={styles.readMore}>View details →</span>
                  {service.description ? <p className={styles.desc}>{service.description}</p> : null}
                  {subServiceList(service.subServices).length > 0 ? (
                    <div className={styles.chips}>
                      {subServiceList(service.subServices).map((chip) => (
                        <span key={chip} className={styles.chip}>
                          {chip}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className={styles.meta}>
                    {service.recentProject ? (
                      <div>
                        <strong>Recent project:</strong> {service.recentProject}
                      </div>
                    ) : null}
                    {service.ongoingProject ? (
                      <div>
                        <strong>Ongoing:</strong> {service.ongoingProject}
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
