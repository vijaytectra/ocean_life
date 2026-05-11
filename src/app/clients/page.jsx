import Image from "next/image";
import styles from "./clients.module.css";

const Logos = [
  "/clients/1.webp",
  "/clients/2.webp",
  "/clients/3.webp",
  "/clients/4.webp",
  "/clients/5.webp",
  "/clients/6.webp",
  "/clients/7.webp",
  "/clients/8.webp",
  "/clients/9.webp",
  "/clients/10.webp",
  "/clients/11.webp",
  "/clients/12.webp",
  "/clients/13.webp",
  "/clients/14.webp",
  "/clients/15.webp",
  "/clients/16.webp",
  "/clients/17.webp",
  "/clients/18.webp",
  "/clients/19.webp",
  "/clients/20.webp",
  "/clients/21.webp",
  "/clients/22.webp",
  "/clients/23.webp",
  "/clients/24.webp",
  "/clients/25.webp",
  "/clients/26.webp",
  "/clients/27.webp",
  "/clients/28.webp",
  "/clients/29.webp",
  "/clients/30.webp",
  "/clients/31.webp",
  "/clients/32.webp",
  "/clients/33.webp",
  "/clients/34.webp",
  "/clients/35.webp",
];
const OngoingLogos = [
  "/clients/on5.webp",
  "/clients/on7.webp",
  "/clients/on11.webp",
  "/logo/workday.jpeg",
  "/logo/alldigi.svg",
  "/logo/accenture.jpeg",
  "/logo/rsp.jpeg",
  "/logo/nametech.jpeg",
  "/logo/IIT HYDERABAD.jpeg",
  "/logo/sifi.jpeg",
  "/logo/st_telemedia.webp",
  "/logo/IRON MOUNTAIN.jpeg",
  "/logo/CITY UNION BANK.jpeg",
];

export const metadata = {
  title: "Clients | Ocean Lifespaces India Pvt Ltd",
  description:
    "See who trusts us! Discover the clients behind Ocean Lifespaces India Pvt Ltd's success in construction and infrastructure delivery.",
  keywords: "Ocean Lifespaces India Pvt Ltd",
  alternates: {
    canonical: "https://www.olipl.com/clients",
  },
};

function Clients() {
  return (
    <section className={styles.clients}>
      <div className="container">
        <div className={styles.rowMainClients}>
          <h1 className="h1">Our Clients</h1>
          <h2 className="h2">Fitout Corporate Clients</h2>
          <div className={styles.rowClients}>
            {Logos.map((logo) => (
              <div key={logo} className={styles.columnClients}>
                <Image width={184} height={104} src={logo} alt="image" />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.rowMainClients} style={{ marginTop: "50px" }}>
          <h2 className="h2">Ongoing Project</h2>
          <div className={`${styles.rowClients} ${styles.rowClientsOngoing}`}>
            {OngoingLogos.map((logo) => (
              <div key={logo} className={styles.columnClients}>
                <Image width={184} height={84} src={logo} alt="image" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Clients;
