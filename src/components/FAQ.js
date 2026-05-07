"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const faqData = [
  {
    question: "What types of services do you provide?",
    answer:
      "At Ocean Lifespaces, we offer Turnkey Solutions, Fit-Out Services, Civil Construction, Real Estate Development, and Infrastructure Development for both residential and commercial projects.",
  },
  {
    question: "Do you offer customization options?",
    answer:
      "Yes, we offer customized construction solutions to meet your unique project requirements, whether it's the design, layout, materials, or execution, ensuring your vision is brought to life exactly as you envision.",
  },
  {
    question: "What materials do you use?",
    answer:
      "We use only high-quality, durable materials suited to each project, ensuring the best results for both functionality and aesthetics. Our materials range from premium construction-grade materials to sustainable options, all chosen based on the project’s requirements.",
  },
  {
    question: "Do you provide delivery and assembly services?",
    answer:
      "Yes, we manage complete project delivery and assembly, ensuring timely and efficient completion of construction, from the groundwork to the final finishing, making sure every element of the project is assembled and ready for use.",
  },
  {
    question: "How do we book a project with you?",
    answer:
      "Booking a project with Ocean Lifespaces is simple: Contact us via website or phone, arrange a consultation, receive a tailored proposal, approve the design, and we handle the entire process from start to finish, ensuring timely and quality execution.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <h2 className="h2">FAQs</h2>
      {faqData.map((item, index) => (
        <div key={index} className={styles.faqItem}>
          <div className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
            {item.question}
            {openIndex === index ? (
              <AiOutlineMinus className={styles.faqIcon} />
            ) : (
              <AiOutlinePlus className={styles.faqIcon} />
            )}
          </div>
          {openIndex === index && (
            <p className={styles.faqAnswer}>{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
