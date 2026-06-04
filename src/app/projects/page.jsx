import styles from "./projects.module.css";
import ProjectsPageHero from "@/componentsProjects/ProjectsPageHero";
import ProjectsImpactScroll from "@/componentsProjects/ProjectsImpactScroll";
import ProjectsScrollGallery from "@/componentsProjects/ProjectsScrollGallery";

export const metadata = {
  title: "Construction Projects in Chennai - Ocean Lifespaces Pvt Ltd",
  description:
    "Explore our work! construction projects in chennai built with trust and structural finesse.",
  keywords: "Construction Projects in Chennai",
  alternates: {
    canonical: "https://www.olipl.com/projects",
  },
};

function Projects() {
  return (
    <section className={styles.projects}>
      <div className="container">
        <div className={styles.rowMainProjects}>
          <ProjectsPageHero className={styles.pageTitle}>
            Our Recent Projects
          </ProjectsPageHero>
          <ProjectsImpactScroll />
        </div>
      </div>
      <ProjectsScrollGallery />
    </section>
  );
}

export default Projects;
