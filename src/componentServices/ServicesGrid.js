import Link from "next/link";
import styles from "./ServicesGrid.module.css";
import Image from "next/image";

const ServicesItems = [
  {
    image: "/services/Link.webp",
    title: "Turnkey Solutions",
    description: `From concept to completion, our turnkey solutions handle every aspect of your project. We deliver end-to-end services, ensuring seamless execution and timely delivery, tailored to your specific requirements.`,
    link: "/services/turnkey-solutions",
  },
  {
    image: "/services/Link-3.webp",
    title: "Interior Fit-Out Services",
    description: `Transform spaces into functional and aesthetically pleasing environments with our specialized Interior Fit-Out Services. We provide customized interior solutions that blend design innovation with practicality.`,
    link: "/services/interior-fit-out-services",
  },
  {
    image: "/services/Link-1.webp",
    title: "Civil Construction",
    description: `With expertise in civil construction, we specialize in delivering high-quality projects, including commercial complexes. Our team is committed to robust engineering, strict adherence to project timelines, and sustainable construction practices.`,
    link: "/services/civil-construction",
  },
  {
    image: "/services/Link-2.webp",
    title: "Real Estate Development",
    description: `Our real estate development services focus on creating exceptional residential and commercial properties. We combine strategic planning, innovative designs, and world-class construction for unmatched results.`,
    link: "/services/real-estate-development",
  },
  {
    image: "/services/Link-4.webp",
    title: "Infrastructure Development",
    description: `Our expertise extends to specialized facilities, including international airports, electric battery factories, sporting facilities, petroleum lube plants and nuclear power plant maintenance, where we deliver corrosion-resistant coatings, fireproofing solutions, and safety-compliant designs, to name a few.`,
    link: "/services/infrastructure-development",
  },
  {
    image: "/interior/interior-service.webp",
    title: "Data Centre Project Expertise",
    description: `At the forefront of mission-critical infrastructure development, we have established ourselves as a trusted execution partner for the construction of world-class Data Centre facilities. With an impressive track record of delivering high-value projects for leading multinational corporations (MNCs) across Tamil Nadu.`,
    link: "/services/data-centre-project-expertise",
  },
  {
    image: "/services/hotelgreysuit.webp",
    title: "Hospitals and Hospitality",
    description: `End-to-End Hospitals and Hospitality Development. Our services in these two domains shape thoughtful health consumer and guest-centric spaces that blend comfort with efficiency.`,
    link: "/services/hospitals-and-hospitality",
  },
];

function ServicesGrid() {
  return (
    <section className={styles.servicesGrid}>
      <div className="container">
        <div className={styles.rowMainServicesGrid}>
          <div className={styles.rowServicesGrid}>
            {ServicesItems.map((item) => (
              <div key={item.title} className={styles.columnServicesGrid}>
                <Image width={500} height={200} src={item.image} alt="image" />
                <div className={styles.contentBoxSg}>
                  <h2 className="h3">{item.title}</h2>
                  <p className="description">{item.description}</p>
                  <Link href={item.link}>
                    <button className="inner-blue-button">
                      <span>Read More</span>
                      <svg width="15px" height="10px" viewBox="0 0 13 10">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesGrid;
