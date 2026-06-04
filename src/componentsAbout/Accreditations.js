import styles from "./Accreditations.module.css";

const ACCRED_ITEMS = [
  {
    image: "/about/awr-2.png.webp",
    title: "IMS",
    description: `
      ISO 9001:2015 - Quality <br>
      ISO 14001:2015 - EMS <br>
      ISO 45001:2018 Certified for Occupational Health and Safety Management System.
    `,
  },
  {
    image: "/about/awr-1.png.webp",
    title: "CCR A- / STABLE RATING",
    description:
      "CRISIL has upgraded our corporate credit rating to CCR A Stable from CCR BBB+/Positive.",
  },
  {
    image: "/about/awr-3.png.webp",
    title: "D&B D-U-N-S",
    description:
      "Ocean has been evaluated and is now part of the Dun & Bradstreet Global Database.",
  },
  {
    image: "/about/awr-4.png.webp",
    title: "IGBC",
    description: "Ocean is a member of Indian Green Building Council.",
  },
  {
    image: "/about/awr-8.png.webp",
    title: "ESA License",
    description:
      "Ocean has an in-house electrical team and SA grade license to carry out electrical works of any kind.",
  },
  {
    image: "/about/awr-9.png.webp",
    title: "FIDIC",
    description:
      "Ocean is a member of the Consulting Engineers Association of India.",
  },
];

export default function Accreditations() {
  return (
    <section className={styles.accreditations} aria-labelledby="accreditations-heading">
      <div className="container">
        <header className={styles.header}>
          <h2 id="accreditations-heading" className={styles.title}>
            Accreditations
          </h2>
          <p className={styles.lead}>
            Recognized standards and memberships that reflect our commitment to
            quality, safety, and industry excellence.
          </p>
        </header>

        <ul className={styles.grid}>
          {ACCRED_ITEMS.map((item) => (
            <li key={item.title} className={styles.card}>
              <div className={styles.logoWrap}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.logo}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p
                className={styles.cardText}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
