import Link from "next/link";
import styles from "./contact.module.css";
import ContactForm from "../../components/ContactForm";
import FAQ from "../../components/FAQ";
import MapComponent from "@/components/MapComponent";
import Image from "next/image";

export const metadata = {
  title: "Contact Us | Ocean Lifespaces India Pvt Ltd",
  description:
    "Let's connect! Contact Ocean Lifespaces India Pvt Ltd for expert civil construction and project consultation across Chennai.",
  keywords: "Ocean Lifespaces India Pvt Ltd",
  alternates: {
    canonical: "https://www.olipl.com/contact",
  },
};

function Contact() {
  return (
    <>
      <section className={styles.contact}>
        <div className="container">
          <div className={styles.rowMainContact}>
            <div className={styles.rowContact}>
              <Link href={"#map"}>
                <div className={styles.columnContact}>
                  <Image
                    width={200}
                    height={100}
                    src="/contact/map.webp"
                    alt="image"
                  />
                  <div className={styles.content}>
                    <h5 className="h5">Address</h5>
                    <p className="description">
                      Ocean Lifespaces India Pvt Ltd MF-1, Industrial Estate,
                      CIPET Hostel Road, Chennai – 600 032, Tamil Nadu, India.
                    </p>
                  </div>
                </div>
              </Link>
              <div className={styles.columnContact}>
                <Image
                  width={200}
                  height={100}
                  src="/contact/mail.webp"
                  alt="image"
                />
                <div className={styles.content}>
                  <h5 className="h5">Email</h5>
                  <p className="description">info@ocean.net.in</p>
                </div>
              </div>
              <div className={styles.columnContact}>
                <Image
                  width={200}
                  height={100}
                  src="/contact/phone.webp"
                  alt="image"
                />
                <div className={styles.content}>
                  <h5 className="h5">Call</h5>
                  <p className="description">
                    Call Us:{" "}
                    <Link href="tel:919841022110"> +91-98410 22110</Link>
                    <br></br>Tel:{" "}
                    <Link href="tel:919841022110">+91-44-6919 9900</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.contactForm}>
        <div className="container">
          <div className={styles.otherLocations}>
            <h2 className="h2">Other Locations</h2>
            <div className={styles.rowOtherLocations}>
              <div className={styles.columnOtherLocations}>
                <div className={styles.columnContact}>
                  <Image
                    width={200}
                    height={100}
                    src="/contact/map.webp"
                    alt="image"
                  />
                  <div className={styles.content}>
                    <h5 className="h5">Telangana</h5>
                    <p className="description">
                      102/11,103/108&104/9, Ground Floor, Boss Tower, Patrika
                      Nagar, Madhapur, Hyderabad, 500081
                    </p>
                    <Link
                      href=""
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.getDirection}
                    >
                      <button className="inner-blue-button">
                        <span>Get Direction</span>
                        <svg width="15px" height="10px" viewBox="0 0 13 10">
                          <path d="M1,5 L11,5"></path>
                          <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles.columnOtherLocations}>
                <div className={styles.columnContact}>
                  <Image
                    width={200}
                    height={100}
                    src="/contact/map.webp"
                    alt="image"
                  />
                  <div className={styles.content}>
                    <h5 className="h5">Karnataka</h5>
                    <p className="description">
                      Door No.748/2, Shri Krishna Temple Road, HAL 1st Stage,
                      Indiranagar, Bengaluru, 560038
                    </p>
                    <Link
                      href="https://g.co/kgs/dTA1oc1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.getDirection}
                    >
                      <button className="inner-blue-button">
                        <span>Get Direction</span>
                        <svg width="15px" height="10px" viewBox="0 0 13 10">
                          <path d="M1,5 L11,5"></path>
                          <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              {/* <div className={styles.columnOtherLocations}>
                <div className={styles.columnContact}>
                  <Image width={200} height={100} src="/contact/map.webp" alt="image" />
                  <div className={styles.content}>
                    <h5 className="h5">Andhra Pradesh</h5>
                    <p className="description">
                      No.14903, Shar Road, Near Flyover Bridge, Kollamitta, Sri
                      Potti Sriramulu, Nellore, 524121
                    </p>
                    <Link
                      href=""
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.getDirection}
                    >
                      <button className="inner-blue-button">
                        <span>Get Direction</span>
                        <svg width="15px" height="10px" viewBox="0 0 13 10">
                          <path d="M1,5 L11,5"></path>
                          <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles.columnOtherLocations}>
                <div className={styles.columnContact}>
                  <Image width={200} height={100} src="/contact/map.webp" alt="image" />
                  <div className={styles.content}>
                    <h5 className="h5">Pondicherry</h5>
                    <p className="description">
                      Plot No.25, 1st Cross, 1st Cross Street, Anadham Nagar,
                      Moolakulam, Puducherry - 605010
                    </p>
                    <Link
                      href=""
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.getDirection}
                    >
                      <button className="inner-blue-button">
                        <span>Get Direction</span>
                        <svg width="15px" height="10px" viewBox="0 0 13 10">
                          <path d="M1,5 L11,5"></path>
                          <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles.columnOtherLocations}>
                <div className={styles.columnContact}>
                  <Image width={200} height={100} src="/contact/map.webp" alt="image" />
                  <div className={styles.content}>
                    <h5 className="h5">Kerala</h5>
                    <p className="description">
                      No. III / 728, Sabari, South Chittoor, Ernakulam, 682027
                    </p>
                    <Link
                      href=""
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.getDirection}
                    >
                      <button className="inner-blue-button">
                        <span>Get Direction</span>
                        <svg width="15px" height="10px" viewBox="0 0 13 10">
                          <path d="M1,5 L11,5"></path>
                          <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles.columnOtherLocations}>
                <div className={styles.columnContact}>
                  <Image width={200} height={100} src="/contact/map.webp" alt="image" />
                  <div className={styles.content}>
                    <h5 className="h5">Ahmedabad</h5>
                    <p className="description">
                      Block B, Shop no.404, Sumel Business Park 9, Dudheshwar
                      Road, Gujarat, Ahmedabad - 380004
                    </p>
                    <Link
                      href=""
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.getDirection}
                    >
                      <button className="inner-blue-button">
                        <span>Get Direction</span>
                        <svg width="15px" height="10px" viewBox="0 0 13 10">
                          <path d="M1,5 L11,5"></path>
                          <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <section id="map" style={{ paddingBottom: "50px" }}>
        <div className="container">
          <MapComponent />
        </div>
      </section>
      <section className={styles.faqSection}>
        <div className="container">
          <FAQ />
        </div>
      </section>
    </>
  );
}

export default Contact;
