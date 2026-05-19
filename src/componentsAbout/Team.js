"use client";

import React, { useRef, useState, useEffect } from "react";
import styles from "./Team.module.css";
import Image from "next/image";
import {
  FALLBACK_EMPLOYEES,
  resolveEmployeeImageSrc,
} from "@/lib/employeesShared";

const PLACEHOLDER_STYLE = {
  width: "100%",
  height: "420px",
  background: "#f1f5f9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "5rem",
  color: "#94a3b8",
  fontWeight: "bold",
};

function Team({ initialMembers = [] }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const decRef = useRef(null);
  const memberRefs = useRef([]);
  const [members, setMembers] = useState(
    () => (initialMembers?.length > 0 ? initialMembers : FALLBACK_EMPLOYEES)
  );

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/employees/", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
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
            {members.map((member, index) => {
              const imageSrc = resolveEmployeeImageSrc(member.image);
              const useUnoptimized =
                imageSrc.startsWith("/api/") ||
                imageSrc.includes("%20") ||
                imageSrc.startsWith("/about/");

              return (
                <div
                  key={member.id ?? index}
                  className={styles.teamBox}
                  ref={(el) => {
                    memberRefs.current[index] = el;
                  }}
                >
                  {imageSrc ? (
                    <Image
                      width={400}
                      height={420}
                      src={imageSrc}
                      alt={member.name}
                      style={{ objectFit: "cover" }}
                      unoptimized={useUnoptimized}
                    />
                  ) : (
                    <div style={PLACEHOLDER_STYLE}>
                      {member.name?.trim().charAt(0) || "?"}
                    </div>
                  )}
                  <div className={styles.contentTeamBox}>
                    <h3 className="h4">{member.name}</h3>
                    <p className="description">{member.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
