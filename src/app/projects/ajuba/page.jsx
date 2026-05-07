import Image from "next/image";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

export const metadata = {
  title: "Coronis Ajuba Project – Ocean Lifespaces Pvt Ltd",
  description:
    "Take a look! coronis ajuba chennai office project reflects Ocean's excellence in construction and timely project execution.",
  keywords: "coronis ajuba chennai",
  alternates: {
    canonical: "https://www.olipl.com/projects/ajuba",
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
              <p className="description">
                AJUBA - Design & Build Project, 40,000 SQ FT, Chennai
              </p>
            </div>
            <h1 className="h2">
              AJUBA
              {/* <span className="description">
                Design & Build Project, 40,000 SQ FT, Chennai
              </span> */}
            </h1>
          </div>
          <div className="row1ProjectsInner">
            <Image
              width={500}
              height={200}
              src="/ajuba/p1.webp"
              alt="AJUBA Design & Build Project"
            />
          </div>
          <div className="pageHeader">
            <ul>
              <li>
                <strong>Location:</strong> Chennai, India
              </li>
              <li>
                <strong>Area:</strong> 40,000 sq. ft.
              </li>
              <li>
                <strong>Scope:</strong> Design & Build Works
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Project Overview:</h2>
            <p className="description">
              The{" "}
              <Link href={"https://www.olipl.com/projects/ajuba"}>
                AJUBA project
              </Link>{" "}
              aimed to create a modern, functional, and sustainable workspace,
              blending aesthetics with efficiency to enhance productivity.
            </p>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Objective:</h2>
            <ul>
              <li>Develop a smart, ergonomic, and eco-friendly workspace.</li>
              <li>
                Optimize space utilization while ensuring seamless workflow.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Approach:</h2>
            <ul>
              <li>
                <strong>Design Innovation:</strong> Modern layouts with optimal
                lighting & ventilation.
              </li>
              <li>
                <strong>Sustainable Materials:</strong> Eco-friendly choices for
                long-term efficiency.
              </li>
              <li>
                <strong>Efficient Execution:</strong> Timely completion with
                minimal disruptions.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Results & Key Takeaways:</h2>
            <ul>
              <li>Enhanced work environment & employee productivity.</li>
              <li>Sustainable & energy-efficient design.</li>
              <li>
                Successful project execution, meeting client expectations.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Conclusion:</h2>
            <p className="description">
              AJUBA stands as a testament to{" "}
              <Link href={"https://www.olipl.com/"}>Ocean Lifespaces</Link>{" "}
              commitment to innovation, functionality, and quality in design &
              build projects.
            </p>
          </div>
          <div className="row3ProjectsInner">
            <Image
              width={500}
              height={200}
              src="/ajuba/p2.webp"
              alt="Emerson Industrial Project"
            />
            <Image
              width={500}
              height={200}
              src="/ajuba/p3.webp"
              alt="Emerson Industrial Project"
            />
          </div>
          <div className="row4ProjectsInner">
            <Image
              width={500}
              height={200}
              src="/ajuba/p4.webp"
              alt="Emerson Industrial Project"
            />
            <Image
              width={500}
              height={200}
              src="/ajuba/p5.webp"
              alt="Emerson Industrial Project"
            />
          </div>
          <div className="row5ProjectsInner">
            <Image
              width={500}
              height={200}
              src="/ajuba/p6.webp"
              alt="Emerson Industrial Project"
            />
            <Image
              width={500}
              height={200}
              src="/ajuba/p7.webp"
              alt="Emerson Industrial Project"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
