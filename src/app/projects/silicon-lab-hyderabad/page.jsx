import Image from "next/image";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

export const metadata = {
  title: "Silicon Labs in Hyderabad - Ocean Lifespaces Pvt Ltd",
  description:
    "Explore space! silicon lab in hyderabad interiors were executed with cutting-edge quality and care.",
  keywords: "Silicon Lab in Hyderabad",
  alternates: {
    canonical: "https://www.olipl.com/projects/silicon-lab-hyderabad",
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
              <p className="description">Silicon Lab, Hyderabad</p>
            </div>
            <h1 className="h2">
              Silicon Lab
              {/* <span className="description">Hyderabad</span> */}
            </h1>
          </div>
          <div className="row1ProjectsInner">
            <Image
              width={500}
              height={200}
              src="/silicon/p1.webp"
              alt="image"
            />
          </div>
          <div className="pageHeader">
            <ul>
              <li>
                <strong>Client:</strong> Silicon Lab
              </li>
              <li>
                <strong>Location:</strong> Hyderabad, India
              </li>
              <li>
                <strong>Project Type:</strong> Corporate Facility – Civil &
                Interior Works
              </li>
              <li>
                <strong>Area:</strong> 1,00,000 sq. ft.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Overview:</h2>
            <p className="description">
              Ocean Lifespaces successfully delivered a modern,{" "}
              <Link
                href={"https://www.olipl.com/projects/silicon-lab-hyderabad"}
              >
                high-tech workspace for Silicon Lab
              </Link>
              , featuring advanced labs, superior acoustic solutions, and a
              stunning spiral staircase crafted from steel and teak wood.
            </p>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Objective:</h2>
            <p className="description">
              To create a cutting-edge corporate facility that blends
              architectural excellence with functionality, optimizing space for
              innovation and efficiency.
            </p>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Approach:</h2>
            <ul>
              <li>
                Designed a visually striking steel and teak wood spiral
                staircase.
              </li>
              <li>
                Integrated advanced acoustic solutions for a superior work
                environment.
              </li>
              <li>
                Developed precision-engineered labs with high-tech
                infrastructure.
              </li>
              <li>
                Managed seamless civil and interior works for timely execution.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Results:</h2>
            <ul>
              <li>An iconic, high-performance corporate space.</li>
              <li>Enhanced functionality with optimized acoustics.</li>
              <li>State-of-the-art labs tailored for innovation.</li>
              <li>Client satisfaction through quality and efficiency.</li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Conclusion:</h2>
            <p className="description">
              This project highlights{" "}
              <Link href={"https://www.olipl.com/"}>Ocean Lifespaces</Link>{" "}
              expertise in delivering world-class corporate environments. Stay
              tuned for more transformative projects!
            </p>
          </div>
          <div className="row3ProjectsInner">
            <Image
              width={500}
              height={200}
              src="/silicon/p2.webp"
              alt="image"
            />
            <Image
              width={500}
              height={200}
              src="/silicon/p3.webp"
              alt="image"
            />
          </div>
          <div className="row4ProjectsInner">
            <Image
              width={500}
              height={200}
              src="/silicon/p4.webp"
              alt="image"
            />
            <Image
              width={500}
              height={200}
              src="/silicon/p5.webp"
              alt="image"
            />
          </div>
          <div className="row5ProjectsInner">
            <Image
              width={500}
              height={200}
              src="/silicon/p6.webp"
              alt="image"
            />
            <Image
              width={500}
              height={200}
              src="/silicon/p7.webp"
              alt="image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
