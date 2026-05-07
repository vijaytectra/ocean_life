/* eslint-disable @next/next/no-Image width={500} height={200}-element */
import Image from "next/image";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

export const metadata = {
  title: "KONE Office Chennai – Ocean Lifespaces Pvt Ltd",
  description:
    "Explore quality! kone project in chennai was executed with precision by Ocean Lifespaces India Pvt Ltd.",
  keywords: "KONE project in Chennai",
  alternates: {
    canonical: "https://www.olipl.com/projects/kone-project-chennai",
  },
};

function Page() {
  return (
    <section className="projectsInner">
      <div className="container">
        <div className="rowMainProjectsInner">
          <div className="rowProjectsInner">
            <div className="headerProjectsInner">
              <Link href="/projects">
                <span className="description">Our Recent Projects</span>
              </Link>
              <LuChevronRight />
              <p className="description">KONE Project, Chennai</p>
            </div>
            <h1 className="h2">
              KONE Project
              {/* <span className="description">Chennai</span> */}
            </h1>
          </div>
          <div className="row1ProjectsInner">
            <Image width={500} height={200} src="/kone/p1.webp" alt="image" />
          </div>
          <div className="pageHeader">
            <ul>
              <li>
                <strong>Client:</strong> KONE
              </li>
              <li>
                <strong>Location:</strong> Chennai, India
              </li>
              <li>
                <strong>Project Type:</strong> Civil, Interior, PEB, HVAC, and
                FAPA Works
              </li>
              <li>
                <strong>Duration:</strong> Confidential
              </li>
              <li>
                <strong>Area:</strong> 7,00,000 sq. ft.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Project Overview:</h2>
            <p className="description">
              Ocean Lifespaces undertook the massive execution of the{" "}
              <Link
                href={"https://www.olipl.com/projects/kone-project-chennai"}
              >
                KONE project in Chennai
              </Link>
              , covering 7 lakh sq. ft. This large-scale development encompassed
              civil works, interiors, pre-engineered buildings (PEB), HVAC, and
              fire & life safety (FAPA) solutions. The project required precise
              coordination and advanced engineering techniques to create a
              world-class facility that aligns with KONE’s global standards.
            </p>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Objective:</h2>
            <p className="description">
              The aim was to deliver a highly functional and technologically
              advanced facility with an emphasis on structural excellence,
              energy efficiency, and seamless integration of civil, mechanical,
              and interior elements.
            </p>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Approach:</h2>
            <ul>
              <li>
                Integrated Project Management: A coordinated execution plan
                covering civil construction, interiors, HVAC, and fire safety.
              </li>
              <li>
                High-Quality Infrastructure: Used advanced PEB structures and
                modern materials for enhanced durability and efficiency.
              </li>
              <li>
                Sustainability Focus: Implemented energy-efficient HVAC systems
                and safety-compliant fire protection mechanisms.
              </li>
              <li>
                Timely Execution: Managed large-scale operations while adhering
                to strict timelines and quality benchmarks.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Results:</h2>
            <ul>
              <li>
                A state-of-the-art facility equipped with world-class
                infrastructure.
              </li>
              <li>
                Successfully delivered high-precision civil and interior works
                for optimal functionality.
              </li>
              <li>
                Implemented energy-efficient systems to enhance sustainability.
              </li>
              <li>
                Ensured a safe and future-ready workplace with cutting-edge HVAC
                and FAPA solutions.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Key Takeaways:</h2>
            <ul>
              <li>
                Large-Scale Execution Expertise – Delivering a multi-faceted
                project with seamless integration.
              </li>
              <li>
                Precision and Efficiency – Ensuring top-quality construction and
                advanced building solutions.
              </li>
              <li>
                Sustainable and Safe Designs – Prioritizing energy efficiency
                and safety compliance.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Conclusion:</h2>
            <p className="description">
              The KONE project in Chennai is a testament to{" "}
              <Link href={"https://www.olipl.com/"}>Ocean Lifespaces</Link>{" "}
              expertise in delivering complex, large-scale developments with
              precision and excellence. This project reflects our ability to
              integrate engineering, technology, and innovation to create
              landmark infrastructure that meets global standards.
            </p>
          </div>
          <div className="row3ProjectsInner">
            <Image width={500} height={200} src="/kone/p2.webp" alt="image" />
            <Image width={500} height={200} src="/kone/p3.webp" alt="image" />
          </div>
          <div className="row4ProjectsInner">
            <Image width={500} height={200} src="/kone/p4.webp" alt="image" />
            <Image width={500} height={200} src="/kone/p5.webp" alt="image" />
          </div>
          <div className="row5ProjectsInner">
            <Image width={500} height={200} src="/kone/p6.webp" alt="image" />
            <Image width={500} height={200} src="/kone/p7.webp" alt="image" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
