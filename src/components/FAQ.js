"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const faqData = [
  {
    question: "What services does Ocean Lifespaces provide?",
    answer:
      "We deliver turnkey construction, commercial and corporate interior fit-outs, civil construction, design-build solutions, and project management — from concept and planning through handover for offices, campuses, retail, and industrial spaces.",
  },
  {
    question: "Do you offer end-to-end turnkey project delivery?",
    answer:
      "Yes. Our turnkey model covers design coordination, procurement, civil works, MEP, interiors, quality checks, and final commissioning — so you work with a single accountable partner from start to finish.",
  },
  {
    question: "Which cities and regions do you operate in?",
    answer:
      "Our head office is in Chennai, with regional presence across South India including Hyderabad and Bengaluru. We support pan-India projects for corporate and commercial clients depending on scope and timelines.",
  },
  {
    question: "What kinds of projects do you typically deliver?",
    answer:
      "We specialise in corporate offices, IT parks, commercial interiors, institutional buildings, and large-scale fit-outs for brands that need precision, scale, and on-time delivery — including ongoing and multi-location engagements.",
  },
  {
    question: "How can I request a quote or schedule a site visit?",
    answer:
      "Use the contact form on this page, email us at info@ocean.net.in, or call +91 98410 22110. Share your location, approximate area, timeline, and scope — our team will arrange a consultation and site visit where required.",
  },
  {
    question: "How long does a commercial fit-out or construction project take?",
    answer:
      "Timelines depend on size, complexity, and approvals. A phased office fit-out may take a few weeks to several months; larger turnkey builds are planned with milestone schedules shared at proposal stage. We prioritise realistic planning and transparent progress updates.",
  },
  {
    question: "Can you execute work while our premises stay operational?",
    answer:
      "Yes. For occupied offices and live facilities we plan phased execution, after-hours work where needed, and clear safety and access protocols to minimise disruption to your teams and operations.",
  },
  {
    question: "How do I explore careers or partnerships with Ocean Lifespaces?",
    answer:
      "For career opportunities, visit our Careers page and submit your application with a resume. For joint ventures, vendor partnerships, or collaboration enquiries, contact us through this page and mention your proposal in the message.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <h2 className={styles.faqHeading}>FAQs</h2>
      <p className={styles.faqLead}>
        Common questions about our services, locations, and how to work with us.
      </p>
      <div className={styles.faqList}>
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.question}
              className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
            >
              <button
                type="button"
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                {isOpen ? (
                  <AiOutlineMinus className={styles.faqIcon} aria-hidden />
                ) : (
                  <AiOutlinePlus className={styles.faqIcon} aria-hidden />
                )}
              </button>
              {isOpen && <p className={styles.faqAnswer}>{item.answer}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
