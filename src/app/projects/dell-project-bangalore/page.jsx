import Image from "next/image";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

export const metadata = {
  title: "Dell Office Bangalore - Ocean Lifespaces Pvt Ltd",
  description:
    "Check it out! dell bangalore facility built with modern workplace solutions by Ocean Lifespaces.",
  keywords: "dell bangalore",
  alternates: {
    canonical: "https://www.olipl.com/projects/dell-project-bangalore",
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
              <p className="description">Dell Project, Bangalore</p>
            </div>
            <h1 className="h2">
              Dell Project
              {/* <span className="description">Bangalore</span> */}
            </h1>
          </div>
          <div className="row1ProjectsInner">
            <Image width={500} height={200} src="/dell/p1.webp" alt="image" />
          </div>
          <div className="pageHeader">
            <ul>
              <li>
                <strong>Client:</strong> Dell
              </li>
              <li>
                <strong>Location:</strong> Bangalore, India
              </li>
              <li>
                <strong>Project Type:</strong> General Contracting
              </li>
              <li>
                <strong>Duration:</strong> 6 Months
              </li>
              <li>
                <strong>Area:</strong> 2,00,000 sq. ft.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Project Overview:</h2>
            <p className="description">
              Ocean Lifespaces successfully executed a 2 lakh sq. ft.{" "}
              <Link
                href={"https://www.olipl.com/projects/dell-project-bangalore"}
              >
                project for Dell in Bangalore
              </Link>
              , handling general contracting responsibilities. This fast-track
              project required seamless coordination and execution to create a
              high-performance workspace that meets Dell’s global standards.
            </p>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Objective:</h2>
            <p className="description">
              The primary goal was to deliver a world-class office space within
              a strict 6-month timeline, ensuring optimal functionality, modern
              aesthetics, and sustainability while maintaining high-quality
              construction standards.
            </p>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Approach:</h2>
            <ul>
              <li>
                Strategic Project Planning: Efficient resource allocation to
                meet the tight schedule.
              </li>
              <li>
                Seamless Execution: Synchronized civil, interior, MEP, and
                finishing works.
              </li>
              <li>
                Sustainability & Innovation: Integrated energy-efficient
                solutions and cutting-edge designs.
              </li>
              <li>
                Quality Control: Ensured rigorous quality checks to maintain
                high standards.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Results:</h2>
            <ul>
              <li>
                A state-of-the-art corporate facility delivered on time and
                within budget.
              </li>
              <li>
                Successfully integrated modern office infrastructure with
                high-performance interiors.
              </li>
              <li>Enhanced energy efficiency and workplace ergonomics.</li>
              <li>
                Dell’s team expressed high satisfaction with the design,
                execution, and functionality.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Key Takeaways:</h2>
            <ul>
              <li>
                Efficient Project Management – Delivered a large-scale workspace
                in just 6 months.
              </li>
              <li>
                Seamless Coordination – Executed multiple work streams
                simultaneously with precision.
              </li>
              <li>
                High-Quality Standards – Maintained Dell’s global benchmarks in
                office infrastructure.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Conclusion:</h2>
            <p className="description">
              The Dell Bangalore project highlights{" "}
              <Link href={"https://www.olipl.com/"}>Ocean Lifespaces</Link>{" "}
              ability to deliver complex corporate projects within tight
              deadlines while ensuring exceptional quality and innovation. This
              project stands as a benchmark for fast-track execution and
              high-performance workspace solutions.
            </p>
          </div>
          <div className="row3ProjectsInner">
            <Image width={500} height={200} src="/dell/p2.webp" alt="image" />
            <Image width={500} height={200} src="/dell/p3.webp" alt="image" />
          </div>
          <div className="row4ProjectsInner">
            <Image width={500} height={200} src="/dell/p4.webp" alt="image" />
            <Image width={500} height={200} src="/dell/p5.webp" alt="image" />
          </div>
          <div className="row5ProjectsInner">
            <Image width={500} height={200} src="/dell/p6.webp" alt="image" />
            <Image width={500} height={200} src="/dell/p7.webp" alt="image" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
