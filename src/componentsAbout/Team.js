"use client";

import React, { useRef } from "react";
import styles from "./Team.module.css";
import Image from "next/image";

const Members = [
  {
    image: "/about/team1.webp",
    title: "Mr. S. K. Peter ",
    description: "Managing Director & CEO",
  },
  {
    image: "/about/team4.webp",
    title: "Mrs. Anitha Peter",
    description: "Director I Operations",
  },
  {
    image: "/about/sankar.webp",  
    title: " Mr. Sankar Kaliaperumal",
    description: "Director I Global",
  },
  {
    image: "/about/Sarat.jpg",
    title: "Mr. Sarat Kadambi",
    description: "Chief Operating Officer",
  },
  {
    image: "/about/durai.png",
    title: "Mr. Durai Raj L",
    description: "Chief Financial Officer",
  },
  {
    image: "/about/Arul1.jpg",
    title: "Mr. Arul Arumugam",
    description: "Senior Director",
  },
  {
    image: "/about/vinod.webp",
    title: "Mr. Vinod Vishwanath",
    description: "Senior Director I Marine",
  },
   {
    image: "/about/balu.jpg",
    title: "Mr. Balu K",
    description: "Director - Civil",
  },
   {
    image: "/about/prabhu.jpg",
    title: "Mr. Prabhu P",
    description: "Head -  EHS",
  },
];

function Team() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const decRef = useRef(null);
  const memberRefs = useRef([]);

  return (
    <section ref={sectionRef} className={styles.team}>
      <div className="container">
        <div className={styles.mainRowTeam}>
          <div className={styles.rowTeam}>
            <h3 ref={headingRef} className="h3">
              Management Team
            </h3>
            <p className="description" ref={decRef}>
              Meet the visionary leaders behind our success. Our management team
              brings a wealth of experience, innovation, and dedication to every
              project, ensuring excellence in execution and client satisfaction.
            </p>
          </div>
          <div className={styles.rowTeam}>
            {Members.map((member, index) => (
              <div
                key={index}
                className={styles.teamBox}
                ref={(el) => (memberRefs.current[index] = el)}
              >
                <Image
                  width={500}
                  height={200}
                  src={member.image}
                  alt={member.title}
                />
                <div className={styles.contentTeamBox}>
                  <h3 className="h4">{member.title}</h3>
                  <p className="description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
