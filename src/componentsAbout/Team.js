"use client";

import React, { useRef, useState, useEffect } from "react";
import styles from "./Team.module.css";
import Image from "next/image";

function Team() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const decRef = useRef(null);
  const memberRefs = useRef([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch('/api/employees');
        const data = await res.json();
        if (Array.isArray(data)) {
          setMembers(data);
        }
      } catch (e) {
        console.error("Failed to fetch team:", e);
      }
    };
    fetchTeam();
  }, []);

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
            {members.map((member, index) => (
              <div
                key={index}
                className={styles.teamBox}
                ref={(el) => (memberRefs.current[index] = el)}
              >
                <Image
                  width={400}
                  height={420}
                  src={member.image || '/about/prabhu.jpg'}
                  alt={member.name}
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.contentTeamBox}>
                  <h3 className="h4">{member.name}</h3>
                  <p className="description">{member.role}</p>
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
