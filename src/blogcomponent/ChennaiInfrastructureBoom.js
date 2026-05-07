"use client";

import Head from "next/head";
import { useState } from "react";
import styles from "./InfrastructureBlog.module.css";
import Image from "next/image";
import Link from "next/link";

export default function ChennaiInfrastructureBoom() {
  const [expandedReasons, setExpandedReasons] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState(Array(7).fill(true));

  const toggleProject = (index) => {
    const newExpanded = [...expandedProjects];
    newExpanded[index] = !newExpanded[index];
    setExpandedProjects(newExpanded);
  };

  return (
    <>
      <Head>
        <title>
          Chennai&apos;s Infrastructure Boom: Projects Shaping the Next Decade |
          Ocean Lifespaces
        </title>
        <meta
          name="description"
          content="Discover the 7 major infrastructure projects transforming Chennai's landscape and how Ocean Lifespaces is contributing to this growth."
        />
      </Head>

      <main className={styles.blogContainer}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1>
            Chennai&apos;s Infrastructure Boom: Projects That Will Shape the
            Next Decade
          </h1>
          <div className={styles.heroImage}>
            <Image
              src="/blogs/boom-projects.webp"
              alt="Chennai city skyline"
              width={1200}
              height={600}
            />
          </div>
        </section>

        {/* Introduction */}
        <section className={styles.section}>
          <p className={styles.introText}>
            <Link href={"https://en.wikipedia.org/wiki/Chennai"}>Chennai</Link>{" "}
            is considered one of the fastest-growing urban hubs in India. The
            next decade is planned to transform this city entirely, having an
            ambitious pipeline of infrastructure projects, a growing real estate
            sector, and smart city programs.
          </p>
          <p className={styles.introText}>
            Chennai is attracting global investors for its metro rail projects,
            IT corridors, and expressway projects. All these projects will make
            this city a prominent player in the Indian markets. And, companies
            like{" "}
            <Link href={"https://www.olipl.com/"}>
              Ocean Lifespaces Pvt. Ltd
            </Link>
            . will benefit majorly as they are at the forefront of
            Chennai&apos;s infrastructure transformation.
          </p>
          <p className={styles.introText}>
            We&apos;ve explored the seven top projects that will shape the
            city&apos;s skyline in the next decade. So, give this blog a quick
            read and learn about the major developments planned for the
            city&apos;s upgrade.
          </p>
        </section>

        {/* Why Chennai is Growing */}
        <section className={styles.section}>
          <div
            className={styles.sectionHeader}
            onClick={() => setExpandedReasons(!expandedReasons)}
          >
            <h2>Why is Chennai Growing its Infrastructure Rapidly?</h2>
            <span className={styles.toggleIcon}>
              {expandedReasons ? "−" : "+"}
            </span>
          </div>

          {expandedReasons && (
            <div className={styles.sectionContent}>
              <p>
                The city of Chennai is undergoing a massive evolution in terms
                of jobs, facilities, and a good residential atmosphere. All
                these factors make it a great city for real estate investments,
                thus facilitating its growth. Here are the four key reasons that
                are driving this momentum:
              </p>

              <div className={styles.reasonsGrid}>
                <div className={styles.reasonCard}>
                  <h3>1. Urban Population Growth</h3>
                  <p>
                    The increasing growth in urban population is fuelling demand
                    for better housing, transportation, and roads.
                  </p>
                </div>
                <div className={styles.reasonCard}>
                  <h3>2. Smart City Programs</h3>
                  <p>
                    It enhances the liveability of the city, sustainability, and
                    digital infrastructure, making the city much more
                    convenient.
                  </p>
                </div>
                <div className={styles.reasonCard}>
                  <h3>3. Public-Private Partnerships (PPPs)</h3>
                  <p>
                    The pace of project completion is accelerated because of
                    PPPs, making new projects emerge heavily in Chennai.
                  </p>
                </div>
                <div className={styles.reasonCard}>
                  <h3>4. Strategic Investments</h3>
                  <p>
                    The government&apos;s plan to invest in ports, logistics
                    parks, and IT and Industrial corridors is fostering rapid
                    development.
                  </p>
                </div>
              </div>

              <p className={styles.note}>
                All these factors are promoting the growth of Chennai
                extensively. Also, Ocean Lifespaces Pvt. Ltd. looks at this as a
                great opportunity and is involved in several new projects for
                the city&apos;s development.
              </p>
            </div>
          )}
        </section>

        {/* Major Projects Section */}
        <section className={styles.section}>
          <h2>Major Projects Set to Transform Chennai&apos;s Infrastructure</h2>
          <p>
            As we know that Chennai is set to expand drastically in the next
            decade, let&apos;s know about the key infrastructure projects that
            will make this possible. The following seven are the top projects
            that will contribute to this decade-long journey predominantly:
          </p>

          <div className={styles.projectsContainer}>
            {[
              {
                title: "Chennai Metro Rail Phase 2",
                content:
                  "It is important to connect the underserved parts of Chennai, and for this purpose, the Chennai Metro Phase 2 is planned. It costs over INR 61,843 crores and spans nearly 118.9km, thus connecting every corner of the city. It will help to reduce traffic congestion and improve commuting times in the city. This project comprises three major corridors, and they are Madhavaram-Sholinganallur, Lighthouse-Poonamallee, and Madhavaram-SIPCOT. Also, with residential and commercial projects connecting the metro line offers a future-ready connectivity, thus boosting the property value and liveability.",
              },
              {
                title: "Peripheral Ring Road (PRR)",
                content:
                  "The next big thing in Chennai's infrastructure development is the Peripheral Ring Road (PRR) project. It is an INR 12,31 crore project and it aims to link Chennai's northern region with the southern suburbs. It will be a 133km outer loop that will connect major national and state highways like NH-16, SH-57, and NH-48. It will improve the freight movements and reduce the internal city congestion. Also, it will support both city dwellers and businesses who are looking for better logistics opportunities. Ocean Lifespaces Pvt. Ltd. will benefit from this as their upcoming sites are aligned with the ring road.",
              },
              {
                title: "FinTech City",
                content:
                  "The city aims to transform into a global financial service hub in the upcoming decade. For this purpose, the FinTech City is being developed in Chennai. It will accommodate both banking and non-banking firms, and this project is undertaken by TIDCO. The plan is divided into three phases, and the government has allocated 122.8 acres of land for this project. It will be situated in the Nandambakkam and Kavanur region of Chennai. The overall budget of this project is 165 crores, and it will open various business and job opportunities to the locals and nearby residents of Chennai and its nearby towns.",
              },
              {
                title: "Chennai Port-Maduravoyal Expressway",
                content:
                  "The National Highway Authority of India (NHAI) is set to build the much-anticipated Chennai Port-Maduravoyal Expressway. It will be a 20.6km elevated expressway, designed to decongest the city traffic and facilitate container movement directly from the port to the city outskirts. It is an extremely useful project because of its proximity to high-speed corridors and enhanced appeal for residential and commercial projects. Many real estate developments will be made in this region, thus improving the liveability around the expressway region, improving business scalability, and regional growth.",
              },
              {
                title: "Aerospace and Defence Park",
                content:
                  "Chennai is set to become the defence and aerospace hub by establishing the aerospace and defence park in Sriperumbudur. It will span across an area of 700 acres, and it is built to create a strong industrial ecosystem for defence and aerospace manufacturing. This project has a budget of INR 3000 crores by 30 aerospace firms, and is undertaken by TIDCO along with SIPCOT. It will provide facilities to design, manufacture, service, and engineer aircraft for the civil and defence sectors. It will enhance aerospace architecture in the city and open pathways through aviation transport, making it a valuable investment.",
              },
              {
                title: "Expansion of IT Corridors",
                content:
                  "The IT corridors in OMR (Old Mahabalipuram Road) and the upcoming Southern IT corridor (Chengalpattu to Guduvanchery) are supposed to shape the IT infrastructure in Chennai. These projects are receiving massive investments to support and boost the growing tech ecosystem in the country. Ocean Lifespaces Pvt. Ltd. is a strong player in this segment, as they are actively developing premium commercial and residential projects catering to the needs of the IT professionals. Their focus is to provide modern amenities, work-from-home features, and smart design solutions for sustainability.",
              },
              {
                title: "Smart City Initiatives",
                content:
                  "Chennai is considered among the top 100 smart cities in India. It focuses on energy saving, water management, sustainable living, and digital connectivity. All these developments make it a great city to reside in, and make it one of the best cities to settle in the upcoming years. As a result, in the next decade, the city is expected to not only grow rapidly, but also focus on a sustainable and liveable atmosphere. Companies are focusing on green building practices like rainwater harvesting, solar solutions, and energy efficiency to make living better for people and maintain Chennai's environment.",
              },
            ].map((project, index) => (
              <div key={index} className={styles.projectCard}>
                <div
                  className={styles.projectHeader}
                  onClick={() => toggleProject(index)}
                >
                  <h3>
                    {index + 1}. {project.title}
                  </h3>
                  <span className={styles.toggleIcon}>
                    {expandedProjects[index] ? "−" : "+"}
                  </span>
                </div>
                {expandedProjects[index] && (
                  <div className={styles.projectContent}>
                    <p>{project.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className={styles.note}>
            These were the seven top infrastructure projects that Chennai is
            focusing on. All these projects will contribute significantly to the
            city&apos;s economic, residential, IT, and business growth, making
            it one of the top-ranking metro cities in the country.
          </p>
        </section>

        {/* Conclusion */}
        <section className={styles.conclusion}>
          <h2>Final Words</h2>
          <p>
            The Chennai infrastructure boom is no longer just a promise, it is
            happening right now. The city will witness dramatic growth over the
            next decade in terms of mobility, sustainability, and urban
            planning. But, this transformation is only possible with the
            contribution of builders and civil contractors in the city, who will
            bring this dream into reality, fostering the lives of individuals
            and smaller businesses.
          </p>
          <p>
            Ocean Lifespaces Pvt. Ltd. is best positioned in this infrastructure
            development program as they have a strong local presence, smart city
            initiatives, ongoing commercial projects, and the ability to build
            much-needed infrastructure projects as per the needs of the city.
            Hence, if you wish to make profits through Chennai&apos;s growth,
            then collaborating with them will make a huge difference.
          </p>
          <Link href="/contact">
            <button className={styles.ctaButton}>
              Contact Ocean Lifespaces
            </button>
          </Link>
        </section>
      </main>
    </>
  );
}
