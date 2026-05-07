import Link from "next/link";
import styles from "./projects.module.css";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import Image from "next/image";

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
          <h1 className="h2">Our Recent Projects</h1>
          <div className={styles.row1Projects}>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p1.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">Dell Project, Bangalore</h2>
                <p className="description">
                  Bangalore | Area - 2,00,000 sq. ft.
                </p>
                <Link href="/projects/dell-project-bangalore">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p2.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">HDFC Office, Chennai</h2>
                <p className="description">Chennai | Area - 2,50,000 sq. ft.</p>
                <Link href="/projects/hdfc-office-chennai">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.row2Projects}>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p3.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">Nvidia Office, Bangalore</h2>
                <p className="description">
                  Bangalore | Area - 2,50,000 sq. ft.
                </p>
                <Link href="/projects/nvidia-office-bangalore">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p4.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">Bray Controls India Pvt. Ltd</h2>
                <p className="description">Chennai | Area - 30,000 sq. ft.</p>
                <Link href="/projects/bray-controls-india-chennai">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p5.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">Hindustan International School</h2>
                <p className="description">Chennai | Area - 80,000 sq. ft.</p>
                <Link href="/projects/hindustan-international-school-chennai">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.row3Projects}>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p6.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">Swiss RE</h2>
                <p className="description">
                  Bangalore | Area - 2,00,000 sq. ft.
                </p>
                <Link href="/projects/swiss-re-200000-sq-ft-interior-works-bangalore">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.row4Projects}>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p7.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">Tek Systems</h2>
                <p className="description">Bangalore | Area - 42,000 sq. ft.</p>
                <Link href="/projects/tek-systems-bangalore">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p8.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">Silicon Lab</h2>
                <p className="description">
                  Hyderabad | Area - 1,00,000 sq. ft.
                </p>
                <Link href="/projects/silicon-lab-hyderabad">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.row1Projects}>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p9.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">Maersk Office</h2>
                <p className="description">Chennai | Area - 1,65,000 sq. ft.</p>
                <Link href="/projects/maersk-office-chennai">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p10.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">Ajuba</h2>
                <p className="description">Chennai | Area - 40,000 sq. ft.</p>
                <Link href="/projects/ajuba">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.row2Projects}>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p11.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">Shell</h2>
                <p className="description">
                  Bangalore | Area - 2,50,000 sq. ft.
                </p>
                <Link href="/projects/shell">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p12.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">Olam Project</h2>
                <p className="description">Bangalore | Area - Confidential</p>
                <Link href="/projects/olam-project-chennai">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p13.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">R1RCM</h2>
                <p className="description">Chennai | Area - 51,000 sq. ft.</p>
                <Link href="/projects/RIRCM">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.row3Projects}>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p14.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">PWC</h2>
                <p className="description">Chennai | Area - 30,000 sq. ft.</p>
                <Link href="/projects/PWC">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.row1Projects}>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p15.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">Danfoss</h2>
                <p className="description">Chennai | Area - 5,00,000 sq. ft.</p>
                <Link href="/projects/danfoss-500000-sft-civil-interior-works-chennai">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p16.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">Simpliworks</h2>
                <p className="description">
                  Hyderabad | Area - 3,84,000 sq. ft.
                </p>
                <Link href="/projects/simpliworks-384000-sft-civil-interior-works-hyderabad">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.row2Projects}>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p17.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">Emerson</h2>
                <p className="description">
                  Bangalore | Area - 2,50,000 sq. ft.
                </p>
                <Link href="/projects/emersion">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p18.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">Taramani</h2>
                <p className="description">Chennai | Area - 30,000 sq. ft.</p>
                <Link href="/projects/ground-floor-lobby-works-taramani-chennai">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/p19.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">KONE Project</h2>
                <p className="description">Chennai | Area - 7,00,000 sq. ft.</p>
                <Link href="/projects/kone-project-chennai">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.row3Projects}>
            <div className={styles.columnProjects}>
              <Image
                width={200}
                height={100}
                src="/projectsOcean/zoho.webp"
                alt="image"
              />
              <div className={styles.content}>
                <h2 className="h3">ZOHO</h2>
                <p className="description">Chennai | Area - 3,50,000 sq. ft.</p>
                <Link href="/projects/zoho-estancia">
                  <span> Learn More</span> <MdOutlineArrowRightAlt />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
