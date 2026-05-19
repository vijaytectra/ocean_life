"use client";

import React, { useRef, useState, useEffect } from "react";
import styles from "./Team.module.css";
import { resolveEmployeeImageSrc } from "@/lib/employees";

function MemberPhoto({ member }) {
  const src = resolveEmployeeImageSrc(member.image);
  const initial = member.name?.trim().charAt(0) || "?";

  if (!src) {
    return <PlaceholderAvatar initial={initial} />;
  }

  return (
    <img
      src={src}
      alt={member.name || "Team member"}
      className={styles.memberPhoto}
      loading="lazy"
      decoding="async"
    />
  );
}

function PlaceholderAvatar({ initial }) {
  return (
    <div className={styles.memberPlaceholder} aria-hidden>
      {initial}
    </div>
  );
}

function Team({ initialMembers = [] }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const decRef = useRef(null);
  const memberRefs = useRef([]);
  const [members, setMembers] = useState(initialMembers);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (initialMembers.length > 0) return;

    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/employees/", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) {
          setLoadError(true);
          return;
        }
        if (Array.isArray(data) && data.length > 0) {
          setMembers(data);
        }
      } catch {
        setLoadError(true);
      }
    };
    fetchTeam();
  }, [initialMembers.length]);

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
            {members.length === 0 ? (
              <p className="description" style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                {loadError
                  ? "Unable to load the management team right now. Please refresh the page."
                  : "Management team profiles will appear here soon."}
              </p>
            ) : (
              members.map((member, index) => (
                <div
                  key={member.id ?? `team-${index}`}
                  className={styles.teamBox}
                  ref={(el) => {
                    memberRefs.current[index] = el;
                  }}
                >
                  <MemberPhoto member={member} />
                  <div className={styles.contentTeamBox}>
                    <h3 className="h4">{member.name}</h3>
                    <p className="description">{member.role}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
