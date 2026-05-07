import Image from "next/image";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

export const metadata = {
  title: "ZOHO Estancia project in Chennai – Ocean Lifespaces Pvt Ltd",
  description:
    "Explore the ZOHO Estancia project by Ocean Lifespaces in Chennai – premium turnkey interiors designed for modern workspaces with style, function & precision.",
  alternates: {
    canonical: "https://www.olipl.com/projects/zoho-estancia",
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
                ZOHO Estancia - 3,50,000 SQ FT Turnkey Works, Chennai
              </p>
            </div>
            <h1 className="h2">
              ZOHO Estancia
              {/* <span className="description">
                3,50,000 SQ FT Turnkey Works, Chennai
              </span> */}
            </h1>
          </div>
          <div className="row1ProjectsInner">
            <Image
              width={500}
              height={200}
              src="/zoho/p1.webp"
              alt="ZOHO Estancia Turnkey Works"
            />
          </div>
          <div className="pageHeader">
            <ul>
              <li>
                <strong>Client:</strong> ZOHO
              </li>
              <li>
                <strong>Location:</strong> Chennai, India
              </li>
              <li>
                <strong>Project Type:</strong> Turnkey Works
              </li>
              <li>
                <strong>Area:</strong> 3,50,000 sq. ft.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Project Overview:</h2>
            <p className="description">
              Ocean Lifespaces successfully executed the{" "}
              <Link href={"https://www.olipl.com/projects/zoho-estancia"}>
                ZOHO Estancia project in Chennai
              </Link>
              , a high-value, complex turnkey project that spanned across 16
              floors, including ground plus 12 floors, mezzanine, and terrace.
              The project included a revamp of the base build infrastructure and
              MEP (Mechanical, Electrical, and Plumbing) services. With a focus
              on precision and efficiency, the project was delivered
              successfully within the specified timeline.
            </p>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Objective:</h2>
            <ul>
              <li>
                Create a state-of-the-art office facility that supports ZOHO’s
                operational requirements.
              </li>
              <li>
                Integrate modern infrastructure and advanced MEP systems to
                ensure seamless functionality and operational efficiency.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Approach:</h2>
            <ul>
              <li>
                <strong>Site Execution:</strong> With a large-scale site
                execution spanning over multiple floors, the project required
                intricate coordination and skilled resource management.
              </li>
              <li>
                <strong>Ducting Fabrication:</strong> A key aspect of this
                project was the onsite ducting fabrication, which was managed
                and executed with high precision to meet the requirements for
                MEP integration.
              </li>
              <li>
                <strong>Infrastructure Revamp:</strong> The project involved the
                complete revamp of the base build infrastructure, ensuring
                modernized and energy-efficient MEP systems.
              </li>
              <li>
                <strong>Timely Delivery:</strong> Despite the complexity of
                sourcing long-lead import items, the team successfully ensured
                their timely delivery, keeping the project on track for
                completion.
              </li>
              <li>
                <strong>Emergency Facilities:</strong> The project also included
                the establishment of an ambulance and first aid room, set up in
                an adjacent building for quick access in case of emergencies.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Result:</h2>
            <ul>
              <li>
                <strong>Modernized Infrastructure:</strong> The 16-floor
                facility now features a modernized infrastructure with upgraded
                MEP services, ensuring enhanced operational efficiency.
              </li>
              <li>
                <strong>Efficient Execution:</strong> The ducting fabrication,
                completed on-site, was a significant highlight, demonstrating
                effective on-site management and execution.
              </li>
              <li>
                <strong>Client Satisfaction:</strong> ZOHO expressed high
                satisfaction with the seamless project delivery, emphasizing the
                timely completion and quality of work despite the project’s
                complexity.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Key Takeaways:</h2>
            <ul>
              <li>
                Successfully executed a large-scale turnkey project with
                multiple floors and complex infrastructure.
              </li>
              <li>
                Managed on-site ducting fabrication and MEP revamp with high
                efficiency.
              </li>
              <li>
                Timely delivery of long-lead import items ensured the project
                stayed on track.
              </li>
              <li>
                Focused on emergency preparedness with the establishment of
                medical facilities nearby.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Conclusion:</h2>
            <p className="description">
              The ZOHO Estancia project is a prime example of{" "}
              <Link href={"https://www.olipl.com/"}>Ocean Lifespaces</Link>{" "}
              capability to handle large-scale, turnkey projects with precision.
              By combining efficient execution, timely delivery, and modern
              infrastructure, the project stands as a testament to Ocean
              Lifespaces commitment to quality and client satisfaction.
            </p>
          </div>
          <div className="row3ProjectsInner">
            <Image
              width={500}
              height={200}
              src="/zoho/p2.webp"
              alt="ZOHO Estancia Turnkey Works"
            />
            <Image
              width={500}
              height={200}
              src="/zoho/p3.webp"
              alt="ZOHO Estancia Turnkey Works"
            />
          </div>
          <div className="row4ProjectsInner">
            <Image
              width={500}
              height={200}
              src="/zoho/p4.webp"
              alt="ZOHO Estancia Turnkey Works"
            />
            <Image
              width={500}
              height={200}
              src="/zoho/p5.webp"
              alt="ZOHO Estancia Turnkey Works"
            />
          </div>
          <div className="row5ProjectsInner">
            <Image
              width={500}
              height={200}
              src="/zoho/p6.webp"
              alt="ZOHO Estancia Turnkey Works"
            />
            <Image
              width={500}
              height={200}
              src="/zoho/p7.webp"
              alt="ZOHO Estancia Turnkey Works"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
