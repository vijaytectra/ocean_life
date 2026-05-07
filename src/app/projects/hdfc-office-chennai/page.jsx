import Image from "next/image";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

export const metadata = {
  title: "HDFC Office Chennai - Ocean Lifespaces Pvt Ltd",
  description:
    "See success! hdfc in chennai office was delivered with efficiency and excellence by Ocean Lifespaces.",
  keywords: "HDFC in Chennai",
  alternates: {
    canonical: "https://www.olipl.com/projects/hdfc-office-chennai",
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
              <p className="description">HDFC Office, Chennai</p>
            </div>
            <h1 className="h2">
              HDFC Office
              {/* <span className="description">Chennai</span> */}
            </h1>
          </div>
          <div className="row1ProjectsInner">
            <Image width={500} height={200} src="/hdfc/p1.webp" alt="image" />
          </div>
          <div className="pageHeader">
            <ul>
              <li>
                <strong>Client:</strong> HDFC
              </li>
              <li>
                <strong>Location:</strong> Chennai, India
              </li>
              <li>
                <strong>Project Type:</strong> Corporate Office – Interior,
                Electrical & IBMS Works
              </li>
              <li>
                <strong>Area:</strong> 2,50,000 sq. ft.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Overview:</h2>
            <p className="description">
              Ocean Lifespaces successfully delivered a modern,{" "}
              <Link href={"https://www.olipl.com/projects/hdfc-office-chennai"}>
                high-tech workspace for HDFC in Chennai,
              </Link>{" "}
              integrating advanced interiors, electrical systems, and smart IBMS
              solutions to enhance efficiency and functionality.
            </p>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Objective:</h2>
            <p className="description">
              To create a seamless, technology-driven workspace that boosts
              productivity and aligns with HDFC’s corporate vision.
            </p>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Approach:</h2>
            <ul>
              <li>
                Designed optimized interiors for collaboration and efficiency.
              </li>
              <li>Installed state-of-the-art electrical systems.</li>
              <li>
                Integrated IBMS for automation, security, and energy efficiency.
              </li>
              <li>Ensured smooth execution with meticulous planning.</li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Results:</h2>
            <ul>
              <li>A cutting-edge, future-ready corporate office.</li>
              <li>Enhanced energy efficiency and reliability.</li>
              <li>Smart IBMS solutions for automation and security.</li>
              <li>
                Successfully met client expectations with precision and quality.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Conclusion:</h2>
            <p className="description">
              This milestone project reflects{" "}
              <Link href={"https://www.olipl.com/"}>Ocean Lifespaces</Link>{" "}
              expertise in delivering high-performance corporate environments.
              Stay tuned for more transformative projects!
            </p>
          </div>
          <div className="row3ProjectsInner">
            <Image width={500} height={200} src="/hdfc/p2.webp" alt="image" />
            <Image width={500} height={200} src="/hdfc/p3.webp" alt="image" />
          </div>
          <div className="row4ProjectsInner">
            <Image width={500} height={200} src="/hdfc/p4.webp" alt="image" />
            <Image width={500} height={200} src="/hdfc/p5.webp" alt="image" />
          </div>
          <div className="row5ProjectsInner">
            <Image width={500} height={200} src="/hdfc/p6.webp" alt="image" />
            <Image width={500} height={200} src="/hdfc/p7.webp" alt="image" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
