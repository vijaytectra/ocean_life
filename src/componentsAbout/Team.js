import styles from "./Team.module.css";
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

/** Server-rendered management team (no client JS required). */
export default function Team({ initialMembers = [] }) {
  const members =
    initialMembers?.length > 0 ? initialMembers : FALLBACK_EMPLOYEES;

  return (
    <section className={styles.team}>
      <div className="container">
        <div className={styles.mainRowTeam}>
          <div className={styles.rowTeam}>
            <h3 className="h3">Management Team</h3>
            <p className="description">
              Meet the visionary leaders behind our success. Our management team
              brings a wealth of experience, innovation, and dedication to every
              project, ensuring excellence in execution and client satisfaction.
            </p>
          </div>
          <div className={styles.rowTeam}>
            {members.map((member, index) => {
              const imageSrc = resolveEmployeeImageSrc(member.image);

              return (
                <div key={member.id ?? index} className={styles.teamBox}>
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={member.name}
                      width={400}
                      height={420}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
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
