import Link from "next/link";
import styles from "./ProjectsInner.module.css";
import { LuChevronRight } from "react-icons/lu";
import PropTypes from "prop-types";
import Image from "next/image";

function ProjectsInner({
  projectTitle,
  location,
  descriptionMain,
  descriptionAdditional,
  images,
}) {
  return (
    <section className={styles.projectsInner}>
      <div className="container">
        <div className={styles.rowMainProjectsInner}>
          <div className={styles.rowProjectsInner}>
            <div className={styles.headerProjectsInner}>
              <Link href="/projects">
                <span className="description">Our Projects</span>
              </Link>
              <LuChevronRight />
              <p className="description">{projectTitle}</p>
            </div>
            <h2 className="h2">
              {projectTitle}, <span className="description">{location}</span>
            </h2>
            <p className="description">{descriptionMain}</p>
          </div>
          <div className={styles.row1ProjectsInner}>
            <Image width={500} height={200} src={images[0]} alt="image" />
          </div>
          <div className={styles.row2ProjectsInner}>
            {descriptionAdditional.map((desc, index) => (
              <p key={index} className="description">
                {desc}
              </p>
            ))}
          </div>
          <div className={styles.row3ProjectsInner}>
            <Image width={500} height={200} src={images[1]} alt="image" />
            <Image width={500} height={200} src={images[2]} alt="image" />
          </div>
          <div className={styles.row4ProjectsInner}>
            <Image width={500} height={200} src={images[3]} alt="image" />
            <Image width={500} height={200} src={images[4]} alt="image" />
          </div>
          <div className={styles.row5ProjectsInner}>
            <Image width={500} height={200} src={images[5]} alt="image" />
            <Image width={500} height={200} src={images[6]} alt="image" />
          </div>
        </div>
      </div>
    </section>
  );
}

ProjectsInner.propTypes = {
  projectTitle: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  descriptionMain: PropTypes.string.isRequired,
  descriptionAdditional: PropTypes.arrayOf(PropTypes.string).isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProjectsInner;
