import Link from "next/link";
import styles from "./HeaderInnerServices.module.css";
import { LuChevronRight } from "react-icons/lu";
import Image from "next/image";

function HeaderInnerServices({
  pageTitle,
  serviceTitle,
  mainDescription,
  highlights,
  rightImage1,
  companyDescription1,
  companyDescription2,
  leftImage2,
  rightImage2,
  clientsList,
  transformationText,
  titleColor,
  mainDescriptionColor,
  companyDescriptionColor,
  subServicesTitle,
  projectsList,
}) {
  return (
    <section className={styles.headerInnerServices}>
      <div className="container">
        <div className={styles.rowMainHeaderInnerServices}>
          <div className={styles.rowHeaderInnerServices}>
            <div className={styles.breadcrumbInnerServices}>
              <Link href="/services">
                <span className="description">Our Services</span>
              </Link>
              <LuChevronRight />
              <p className="description">{pageTitle}</p>
            </div>
            <h1 className="h2" style={{ color: titleColor }}>
              {serviceTitle}
            </h1>
            <p className="description" style={{ color: mainDescriptionColor }}>
              {mainDescription}
            </p>
          </div>
          <div className={styles.row1HeaderInnerServices}>
            <div className={styles.columnRow1Is}>
              <h2 className="h3">
                {subServicesTitle ? subServicesTitle : `Sub Services: ${pageTitle}`}
              </h2>
              {projectsList ? (
                <ul className={styles.projectList}>
                  {projectsList.map((project, index) => (
                    <li key={index} className={styles.projectItem}>
                      <strong>{project.name}</strong>
                      {project.details && (
                        <ul className={styles.projectDetails}>
                          {project.details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul>
                  {highlights.map((highlight, index) => (
                    <li key={index}>
                      <Image
                        width={20}
                        height={20}
                        src={highlight.img}
                        alt="image"
                      />
                      <span>{highlight.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={styles.columnRow1Is}>
              <Image width={500} height={200} src={rightImage1} alt="image" />
            </div>
          </div>
          <div className={styles.row2HeaderInnerServices}>
            <p
              className="description"
              style={{ color: companyDescriptionColor }}
            >
              {companyDescription1}
            </p>
            <p className="description">{companyDescription2}</p>
          </div>
          <div className={styles.row3HeaderInnerServices}>
            <div className={styles.columnRow3Is}>
              <Image width={500} height={200} src={leftImage2} alt="image" />
              <p className="description">{clientsList}</p>
            </div>
            <div className={styles.columnRow3Is}>
              <Image width={500} height={200} src={rightImage2} alt="image" />
              <p className="description">{transformationText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeaderInnerServices;
