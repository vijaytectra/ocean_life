import Image from "next/image";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

export const metadata = {
  title: "Emerson Office Chennai - Ocean Lifespaces Pvt Ltd",
  description:
    "View project! emerson chennai workspace created by Ocean Lifespaces, blending function and design.",
  keywords: "Emerson chennai",
  alternates: {
    canonical: "https://www.olipl.com/projects/emersion",
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
                Emerson – 300,000 SQ FT Industrial Project, Chennai
              </p>
            </div>
            <h1 className="h2">
              Emerson
              {/* <span className="description">
                300,000 SQ FT Industrial Project, Chennai
              </span> */}
            </h1>
          </div>
          <div className="row1ProjectsInner">
            <Image
              width={500}
              height={200}
              src="/emersion/p1.webp"
              alt="Emerson Industrial Project"
            />
          </div>
          <div className="pageHeader">
            <ul>
              <li>
                <strong>Client:</strong> Emerson
              </li>
              <li>
                <strong>Location:</strong> Chennai, India
              </li>
              <li>
                <strong>Project Type:</strong> Industrial Project (Regulators &
                ATS Manufacturing Unit)
              </li>
              <li>
                <strong>Area:</strong> 300,000 sq. ft.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Project Overview:</h2>
            <p className="description">
              Ocean Lifespaces successfully completed the{" "}
              <Link href={"https://www.olipl.com/projects/emersion"}>
                project for Emerson industrial facility in Chennai
              </Link>
              , which includes the design and execution of complex MEP
              (Mechanical, Electrical, and Plumbing) systems. The project
              involved developing a cutting-edge manufacturing unit for Emerson,
              focusing on optimizing operational efficiency while integrating
              sustainable and high-performance systems.
            </p>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Objective:</h2>
            <ul>
              <li>
                Create an industrial facility for Emersons regulators and ATS
                manufacturing unit, ensuring efficient energy usage and advanced
                manufacturing capabilities.
              </li>
              <li>
                Ensure compliance with international standards while optimizing
                operational efficiency.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Scope of Work:</h2>
            <ul>
              <li>
                <strong>Electrical Works:</strong>
                <ul>
                  <li>11 KV Substation</li>
                  <li>1600 KVA Transformer</li>
                  <li>HT Panel, Busduct</li>
                  <li>3 x 320 KVA DG</li>
                  <li>TTA LT Panels & Lowside Works</li>
                </ul>
              </li>
              <li>
                <strong>HVAC Works:</strong>
                <ul>
                  <li>3 x 100 TR Air Cooled Chiller</li>
                  <li>VRF Units, V. Fans, HVLS Fans</li>
                  <li>Lowside Works</li>
                </ul>
              </li>
              <li>
                <strong>FPS Works:</strong>
                <ul>
                  <li>FM Approved Fire Pumps</li>
                  <li>GFS Tanks, External & Internal Hydrant</li>
                  <li>Roof Sprinkler System</li>
                </ul>
              </li>
              <li>
                <strong>ELV Works:</strong>
                <ul>
                  <li>Addressable FA & PA System</li>
                  <li>Access Control & CCTV System</li>
                  <li>PLC Based BMS System</li>
                </ul>
              </li>
              <li>
                <strong>Solar Works:</strong>
                <ul>
                  <li>165.5 KWp Rooftop Solar System</li>
                </ul>
              </li>
              <li>
                <strong>PHE Works:</strong>
                <ul>
                  <li>IGBC Gold Rated Building</li>
                  <li>Hydro Pneumatic System</li>
                  <li>100 KLD STP, 1000 LPH WTP, 500 LPH RO</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Approach:</h2>
            <ul>
              <li>
                <strong>Comprehensive MEP Integration:</strong> The project
                required a seamless integration of various MEP systems,
                including electrical, HVAC, fire safety, and water treatment, to
                ensure smooth operations and energy efficiency.
              </li>
              <li>
                <strong>Sustainability Focus:</strong> The use of a 165.5 KWp
                rooftop solar system and the implementation of IGBC Gold-rated
                building features highlight the commitment to sustainability and
                energy-efficient design.
              </li>
              <li>
                <strong>Precision Engineering:</strong> Each system, from the
                electrical to the HVAC, was designed with precision, focusing on
                optimizing energy usage, reducing operational costs, and
                maintaining a high level of safety and performance.
              </li>
              <li>
                <strong>Timely Delivery:</strong> Despite the complexity of the
                systems, the project was completed within the specified
                timeframe, ensuring the plant was operational without delays.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Results:</h2>
            <ul>
              <li>
                <strong>Energy Efficiency:</strong> The incorporation of the
                rooftop solar system and energy-efficient MEP systems ensures
                reduced operational costs and a lower environmental footprint.
              </li>
              <li>
                <strong>Advanced Manufacturing Facility:</strong> The Emerson
                facility now operates with state-of-the-art manufacturing and
                safety systems, enhancing productivity and compliance with
                international standards.
              </li>
              <li>
                <strong>Client Satisfaction:</strong> Emerson was highly
                satisfied with the comprehensive delivery of the industrial
                project, emphasizing the high-quality execution and the ability
                to meet all functional requirements.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Key Takeaways:</h2>
            <ul>
              <li>
                Successfully executed a complex industrial project with advanced
                MEP systems.
              </li>
              <li>
                Focused on sustainability with the integration of a rooftop
                solar system and IGBC Gold certification.
              </li>
              <li>
                Delivered a high-performing manufacturing unit equipped with
                cutting-edge infrastructure.
              </li>
              <li>
                Completed the project on time, meeting all client requirements.
              </li>
            </ul>
          </div>
          <div className="row2ProjectsInner">
            <h2 className="h4 dark">Conclusion:</h2>
            <p className="description">
              This project showcases{" "}
              <Link href={"https://www.olipl.com/"}>Ocean Lifespaces</Link>’
              expertise in delivering large-scale industrial facilities with
              integrated MEP systems that enhance operational efficiency,
              safety, and sustainability. The Emerson manufacturing unit stands
              as a testament to the teams ability to manage complex, high-value
              projects with precision and excellence.
            </p>
          </div>
          <div className="row3ProjectsInner">
            <Image
              width={500}
              height={200}
              src="/emersion/p2.webp"
              alt="Emerson Industrial Project"
            />
            <Image
              width={500}
              height={200}
              src="/emersion/p3.webp"
              alt="Emerson Industrial Project"
            />
          </div>
          <div className="row4ProjectsInner">
            <Image
              width={500}
              height={200}
              src="/emersion/p4.webp"
              alt="Emerson Industrial Project"
            />
            <Image
              width={500}
              height={200}
              src="/emersion/p5.webp"
              alt="Emerson Industrial Project"
            />
          </div>
          <div className="row5ProjectsInner">
            <Image
              width={500}
              height={200}
              src="/emersion/p6.webp"
              alt="Emerson Industrial Project"
            />
            <Image
              width={500}
              height={200}
              src="/emersion/p7.webp"
              alt="Emerson Industrial Project"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
