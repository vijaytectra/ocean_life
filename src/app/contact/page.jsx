import Image from "next/image";
import Link from "next/link";
import styles from "./contact.module.css";
import ContactForm from "../../components/ContactForm";
import FAQ from "../../components/FAQ";
import MapComponent from "@/components/MapComponent";

export const metadata = {
  title: "Contact Us | Ocean Lifespaces India Pvt Ltd",
  description:
    "Let's connect! Contact Ocean Lifespaces India Pvt Ltd for expert civil construction and project consultation across Chennai.",
  keywords: "Ocean Lifespaces India Pvt Ltd",
  alternates: {
    canonical: "https://www.olipl.com/contact",
  },
};

const CHENNAI_MAPS_URL =
  "https://www.google.com/maps/place/Ocean+Lifespaces/@13.0151675,80.2008328,17z";

const LOCATIONS = [
  {
    state: "Telangana",
    address:
      "102/11, 103/108 & 104/9, Ground Floor, Boss Tower, Patrika Nagar, Madhapur, Hyderabad, 500081",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Boss+Tower+Patrika+Nagar+Madhapur+Hyderabad",
  },
  {
    state: "Karnataka",
    address:
      "Door No.748/2, Shri Krishna Temple Road, HAL 1st Stage, Indiranagar, Bengaluru, 560038",
    mapsUrl: "https://g.co/kgs/dTA1oc1",
  },
];

function Contact() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/contact/contact-pg-head.webp"
          alt=""
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />
        <div className={styles.heroOverlay} aria-hidden />
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Get in touch</p>
            <h1 className={styles.heroTitle}>Contact Us</h1>
            <p className={styles.heroLead}>
              Reach our team for project enquiries, site visits, and partnerships.
              We respond to every message with care and clarity.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.headOfficeSection} id="map">
        <div className="container">
          <header className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Head office</h2>
            <p className={styles.sectionSub}>
              Chennai headquarters — visit, call, or email our team directly.
            </p>
          </header>

          <div className={styles.headOfficeCard}>
            <div className={styles.mapBlock}>
              <div className={styles.mapBlockHeader}>
                <div>
                  <p className={styles.mapEyebrow}>Location</p>
                  <h3 className={styles.mapTitle}>Find us on the map</h3>
                  <p className={styles.mapSub}>Ocean Lifespaces — Chennai head office</p>
                </div>
                <Link
                  href={CHENNAI_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openMapsBtn}
                >
                  Open in Google Maps
                  <svg width="15" height="10" viewBox="0 0 13 10" aria-hidden>
                    <path d="M1,5 L11,5" stroke="currentColor" strokeWidth="2" fill="none" />
                    <polyline
                      points="8 1 12 5 8 9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </Link>
              </div>
              <div className={styles.mapFrame}>
                <MapComponent className={styles.mapIframe} />
              </div>
            </div>

            <div className={styles.headOfficeDivider} aria-hidden />

            <div className={styles.headOfficePanel}>
              <div className={styles.headOfficeMain}>
                <span className={styles.hqBadge}>Headquarters</span>
                <div className={styles.headOfficeTitleRow}>
                  <Image
                    src="/contact/map.webp"
                    alt=""
                    width={40}
                    height={40}
                    className={styles.headOfficeIcon}
                  />
                  <div>
                    <h3 className={styles.headOfficeCity}>Chennai</h3>
                    <p className={styles.headOfficeLabel}>Tamil Nadu, India</p>
                  </div>
                </div>
                <p className={styles.headOfficeAddress}>
                  Ocean Lifespaces India Pvt Ltd, MF-1, Industrial Estate, CIPET
                  Hostel Road, Chennai – 600 032.
                </p>
              </div>

              <div className={styles.headOfficeActions}>
                <Link href="mailto:info@ocean.net.in" className={styles.actionTile}>
                  <Image
                    src="/contact/mail.webp"
                    alt=""
                    width={36}
                    height={36}
                    className={styles.actionIcon}
                  />
                  <div className={styles.actionCopy}>
                    <span className={styles.actionLabel}>Email us</span>
                    <strong className={styles.actionValue}>info@ocean.net.in</strong>
                  </div>
                </Link>

                <div className={styles.actionTile}>
                  <Image
                    src="/contact/phone.webp"
                    alt=""
                    width={36}
                    height={36}
                    className={styles.actionIcon}
                  />
                  <div className={styles.actionCopy}>
                    <span className={styles.actionLabel}>Call us</span>
                    <strong className={styles.actionValue}>
                      <Link href="tel:+919841022110">+91 98410 22110</Link>
                    </strong>
                    <strong className={styles.actionValue}>
                      <Link href="tel:+914469199900">+91 44 6919 9900</Link>
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionAccent} aria-hidden />
        <div className="container">
          <div className={styles.sectionInner}>
            <header className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Other locations</h2>
              <p className={styles.sectionSub}>
                Regional offices across South India for local project support.
              </p>
            </header>

            <div className={styles.locationsGrid}>
              {LOCATIONS.map((location) => (
                <article key={location.state} className={styles.locationCard}>
                  <h3 className={styles.locationState}>{location.state}</h3>
                  <p className={styles.locationAddress}>{location.address}</p>
                  <Link
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.directionBtn}
                  >
                    <span>Get directions</span>
                    <svg width="15" height="10" viewBox="0 0 13 10" aria-hidden>
                      <path d="M1,5 L11,5" stroke="currentColor" strokeWidth="2" fill="none" />
                      <polyline
                        points="8 1 12 5 8 9"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className="container">
          <header className={styles.formHeader}>
            <h2>Send us a message</h2>
            <p>
              Share your project details and our team will get back to you shortly.
            </p>
          </header>
          <div className={styles.formWrap}>
            <ContactForm title="" embedded />
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className="container">
          <FAQ />
        </div>
      </section>
    </div>
  );
}

export default Contact;
