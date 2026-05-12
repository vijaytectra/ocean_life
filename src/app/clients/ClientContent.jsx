"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./clients.module.css";

export default function ClientContent() {
  const [logos, setLogos] = useState([]);
  const [ongoingLogos, setOngoingLogos] = useState([]);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await fetch('/api/clients/logos');
        const data = await res.json();
        if (Array.isArray(data)) {
          setLogos(data.filter(l => l.category === 'corporate'));
          setOngoingLogos(data.filter(l => l.category === 'ongoing'));
        }
      } catch (e) {
        console.error("Failed to fetch logos:", e);
      }
    };
    fetchLogos();
  }, []);

  return (
    <section className={styles.clients}>
      <div className="container">
        <div className={styles.rowMainClients}>
          <h1 className="h1">Our Clients</h1>
          <h2 className="h2">Fitout Corporate Clients</h2>
          <div className={styles.rowClients}>
            {logos.map((logo) => (
              <div key={logo.id} className={styles.columnClients}>
                <Image width={184} height={104} src={logo.image} alt="image" />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.rowMainClients} style={{ marginTop: "50px" }}>
          <h2 className="h2">Ongoing Project</h2>
          <div className={`${styles.rowClients} ${styles.rowClientsOngoing}`}>
            {ongoingLogos.map((logo) => (
              <div key={logo.id} className={styles.columnClients}>
                <Image width={184} height={84} src={logo.image} alt="image" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
