"use client";

import styles from "./Accordion.module.css";
import React from "react";
import { RiArrowRightDoubleFill } from "react-icons/ri";

const Accordion = () => {
  // Data sorted alphabetically by title
  const data = [
    // Architects
    { title: "Adrianse India Pvt Ltd", category: "Architect" },
    { title: "Architecture Red", category: "Architect" },
    { title: "Arvind Varuna", category: "Architect" },
    { title: "Aswathanarayana & Eswara", category: "Architect" },
    { title: "Atelier Global", category: "Architect" },
    { title: "C R Narayana Rao", category: "Architect" },
    { title: "C S Designs Pvt Ltd", category: "Architect" },
    { title: "Charles Correa", category: "Architect" },
    { title: "Decon Architects", category: "Architect" },
    { title: "Design Studio", category: "Architect" },
    { title: "Design Transit", category: "Architect" },
    { title: "Dsp Architects", category: "Architect" },
    { title: "Dwp Interiors", category: "Architect" },
    { title: "Edifice Consultants Pvt Ltd", category: "Architect" },
    { title: "Gensler", category: "Architect" },
    { title: "HBO + EMTB, Singapore", category: "Architect" },
    { title: "KGD Architects", category: "Architect" },
    { title: "M+W Group", category: "Architect" },
    { title: "Madras Designs", category: "Architect" },
    { title: "M-Cube Architects", category: "Architect" },
    { title: "Mmoser Associates", category: "Architect" },
    { title: "Praxis Inc", category: "Architect" },
    { title: "PSP Architects", category: "Architect" },
    { title: "PTK Architects", category: "Architect" },
    { title: "Quadra Architects Pvt Ltd", category: "Architect" },
    { title: "RAJ Consultants", category: "Architect" },
    { title: "Rapidcorp Architects", category: "Architect" },
    { title: "RSP Architects", category: "Architect" },
    { title: "Sankalpan", category: "Architect" },
    { title: "Sara Interiors", category: "Architect" },
    { title: "Space Matrix", category: "Architect" },
    { title: "Sudhakar Pai Associates", category: "Architect" },
    { title: "Swbi", category: "Architect" },
    { title: "Symmetrix", category: "Architect" },
    { title: "TATA Consulting Engineers", category: "Architect" },
    { title: "Varsha & Pradeep", category: "Architect" },
    { title: "Vijay Punjabi", category: "Architect" },

    // PMCs
    { title: "AN Prakash", category: "PMC" },
    { title: "Builtech", category: "PMC" },
    { title: "CBRE", category: "PMC" },
    { title: "Colliers International", category: "PMC" },
    { title: "Cushman & Wakefield", category: "PMC" },
    { title: "FABS", category: "PMC" },
    { title: "Faithful + Gould", category: "PMC" },
    { title: "Integrate PMC India Pvt Ltd", category: "PMC" },
    { title: "JLL", category: "PMC" },
    { title: "Potential Project Managers Pvt Ltd", category: "PMC" },
    { title: "Promat", category: "PMC" },
    { title: "SSJ PICIPL", category: "PMC" },
    { title: "Synergy", category: "PMC" },
    { title: "Turner & Townsend", category: "PMC" },
  ];

  // Filtering data based on section
  const architects = data.filter((item) => item.category === "Architect");
  const pmcs = data.filter((item) => item.category === "PMC");

  return (
    <section className={styles.accordion}>
      <div className="container">
        <div className={styles.rowMainAccordion}>
          <div className={styles.rowHeader}>
            <h1 className="h2">Our Partners</h1>
            <p className="description">
              We have collaborated with some of the leading Architects and
              Project Management Consultants (PMCs) in India, on one-of-a-kind
              projects.
            </p>
          </div>
          <h2 className="h3">Leading Architects Collaborated with</h2>
          <div className={styles.rowAccordion}>
            {architects.map((section, index) => (
              <div key={index} className={styles.accordionSection}>
                <div className={styles.accordionHeader}>
                  <h5 className="h5">
                    <RiArrowRightDoubleFill /> {section.title}
                  </h5>
                </div>
              </div>
            ))}
          </div>
          <h2 className="h3">Leading PMC&apos;S we WORKED with</h2>
          <div className={styles.rowAccordion}>
            {pmcs.map((section, index) => (
              <div
                key={index + architects.length}
                className={styles.accordionSection}
              >
                <div className={styles.accordionHeader}>
                  <h5 className="h5">
                    <RiArrowRightDoubleFill /> {section.title}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accordion;
