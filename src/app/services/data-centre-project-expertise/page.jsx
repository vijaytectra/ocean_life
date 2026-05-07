import React from "react";
import Styles from "./Interior-design.module.css";
import { LuChevronRight } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";

function page() {
  return (
    <>
      <div className={Styles.interiorDesign}>
        <div className="container">
          <div className={Styles.ineriorDesignMain}>
            <div className={Styles.breadcrumbInnerServices}>
              <Link href="/services">
                <span className="description">Our Services</span>
              </Link>
              <LuChevronRight />
              <p className="description">Data Centre Project Expertise</p>
            </div>
            <div className={Styles.headerInteriorDesign}>
              <h1 className="h1">Data Centre Project Expertise</h1>
              <p className="description">
                At the forefront of mission-critical infrastructure development,
                we have established ourselves as a trusted execution partner for
                the construction of world-class Data Centre facilities. With an
                impressive track record of delivering high-value projects for
                leading multinational corporations (MNCs) across Tamil Nadu, our
                portfolio reflects over ₹500 Crores in successfully completed
                Data Centre projects—ranging from modular edge facilities to
                large-scale hyperscale environments.
              </p>
              <div className={Styles.headerImage}>
                <Image
                  className={Styles.desktop}
                  src={"/interior/header-main.webp"}
                  width={500}
                  height={500}
                  alt="header-image"
                />
                <Image
                  className={Styles.mobile}
                  src={"/interior/header-main-mobile.webp"}
                  width={500}
                  height={500}
                  alt="header-image"
                />
                <p className="description">
                  Our capabilities span the entire project lifecycle, delivering
                  turnkey solutions from strategic planning and design
                  coordination to engineering, construction, commissioning, and
                  handover. We specialize in integrating civil, structural, MEP
                  (Mechanical, Electrical & Plumbing), HVAC, fire safety, and
                  interior systems—each aligned to meet the stringent
                  performance, security, and availability benchmarks required by
                  data-intensive enterprises.
                </p>
                <div className={Styles.headerImageOverlay}></div>
              </div>
            </div>
            <div className={Styles.interiorGrid}>
              <div className={Styles.interiorGridCol1}>
                <Image
                  src={"/interior/1.webp"}
                  width={500}
                  height={300}
                  alt="interior"
                />
              </div>
              <div className={Styles.interiorGridCol2}>
                <h2 className="h3">Project Scale & Value Delivery</h2>
                <p className="description">
                  We have executed multiple high-capacity data centre projects
                  with individual capacities ranging from 5 MW to 50+ MW,
                  supporting some of the most demanding digital infrastructure
                  requirements. Our ability to mobilize and manage large-scale
                  resources ensures timely, cost-effective, and
                  quality-controlled delivery, even in complex urban
                  environments.
                </p>
              </div>
            </div>
            <div className={Styles.interiorGrid}>
              <div className={Styles.interiorGridCol1}>
                <Image
                  src={"/interior/2.webp"}
                  width={500}
                  height={300}
                  alt="interior"
                />
              </div>
              <div className={Styles.interiorGridCol2}>
                <h2 className="h3">Advanced Infrastructure Systems</h2>
                <p className="description">
                  We incorporate cutting-edge technologies to ensure maximum
                  uptime, operational safety, and thermal stability, including:
                </p>
                <ul className={`description ${Styles.interiorUl}`}>
                  <li>
                    {" "}
                    <Image
                      src={"/interior/tick.svg"}
                      width={14}
                      height={14}
                      alt="tick"
                    />
                    N+1 / 2N redundancy in power architecture with dual-source
                    UPS systems, DG sets, and static transfer switches
                  </li>
                  <li>
                    {" "}
                    <Image
                      src={"/interior/tick.svg"}
                      width={14}
                      height={14}
                      alt="tick"
                    />
                    Precision environmental control via CRAC/CRAH units,
                    hot/cold aisle containment, and underfloor airflow
                    management
                  </li>
                  <li>
                    {" "}
                    <Image
                      src={"/interior/tick.svg"}
                      width={14}
                      height={14}
                      alt="tick"
                    />
                    Fire detection and suppression systems using VESDA, FM-200,
                    NOVEC, and conventional sprinklers
                  </li>
                  <li>
                    {" "}
                    <Image
                      src={"/interior/tick.svg"}
                      width={14}
                      height={14}
                      alt="tick"
                    />
                    Raised access flooring for optimized cooling distribution
                    and cable routing
                  </li>
                </ul>
              </div>
            </div>
            <div className={Styles.interiorGrid}>
              <div className={Styles.interiorGridCol1}>
                <Image
                  src={"/interior/3.webp"}
                  width={500}
                  height={300}
                  alt="interior"
                />
              </div>
              <div className={Styles.interiorGridCol2}>
                <h2 className="h3">
                  Sustainability & Green Building Practices
                </h2>
                <p className="description">
                  Our design philosophy emphasizes environmental responsibility
                  and energy-efficient operations. We incorporate:
                </p>
                <ul className={`description ${Styles.interiorUl}`}>
                  <li>
                    {" "}
                    <Image
                      src={"/interior/tick.svg"}
                      width={14}
                      height={14}
                      alt="tick"
                    />
                    Energy modelling for HVAC optimization
                  </li>
                  <li>
                    {" "}
                    <Image
                      src={"/interior/tick.svg"}
                      width={14}
                      height={14}
                      alt="tick"
                    />
                    Water-cooled chillers and adiabatic cooling systems
                  </li>
                  <li>
                    {" "}
                    <Image
                      src={"/interior/tick.svg"}
                      width={14}
                      height={14}
                      alt="tick"
                    />
                    Compliance with LEED, IGBC, and other green certification
                    frameworks
                  </li>
                </ul>
              </div>
            </div>
            <div className={Styles.interiorGrid}>
              <div className={Styles.interiorGridCol1}>
                <Image
                  src={"/interior/4.webp"}
                  width={500}
                  height={300}
                  alt="interior"
                />
              </div>
              <div className={Styles.interiorGridCol2}>
                <h2 className="h3">Compliance & International Standards</h2>
                <p className="description">
                  Each project is executed in strict conformance with
                  international and industry-specific standards:
                </p>
                <ul className={`description ${Styles.interiorUl}`}>
                  <li>
                    {" "}
                    <Image
                      src={"/interior/tick.svg"}
                      width={14}
                      height={14}
                      alt="tick"
                    />
                    TIA-942 A/B/C
                  </li>
                  <li>
                    {" "}
                    <Image
                      src={"/interior/tick.svg"}
                      width={14}
                      height={14}
                      alt="tick"
                    />
                    Uptime Institute Tier II / III / IV
                  </li>
                  <li>
                    {" "}
                    <Image
                      src={"/interior/tick.svg"}
                      width={14}
                      height={14}
                      alt="tick"
                    />
                    ISO 27001 / ISO 22301
                  </li>
                  <li>
                    {" "}
                    <Image
                      src={"/interior/tick.svg"}
                      width={14}
                      height={14}
                      alt="tick"
                    />
                    Local fire, safety, and electrical compliance codes
                  </li>
                </ul>
              </div>
            </div>
            <div className={Styles.interiorGrid}>
              <div className={Styles.interiorGridCol1}>
                <Image
                  src={"/interior/5.webp"}
                  width={500}
                  height={300}
                  alt="interior"
                />
              </div>
              <div className={Styles.interiorGridCol2}>
                <h2 className="h3">Security, Monitoring & Automation</h2>
                <p className="description">
                  We integrate multi-layered security and control systems for
                  operational assurance:
                </p>
                <ul className={`description ${Styles.interiorUl}`}>
                  <li>
                    {" "}
                    <Image
                      src={"/interior/tick.svg"}
                      width={14}
                      height={14}
                      alt="tick"
                    />
                    Biometric and RFID-based access control
                  </li>
                  <li>
                    {" "}
                    <Image
                      src={"/interior/tick.svg"}
                      width={14}
                      height={14}
                      alt="tick"
                    />
                    24/7 surveillance via IP-based CCTV systems
                  </li>
                  <li>
                    {" "}
                    <Image
                      src={"/interior/tick.svg"}
                      width={14}
                      height={14}
                      alt="tick"
                    />
                    Intelligent BMS and EMS platforms for centralized monitoring
                  </li>
                  <li>
                    {" "}
                    <Image
                      src={"/interior/tick.svg"}
                      width={14}
                      height={14}
                      alt="tick"
                    />
                    Integration-ready infrastructure for DCIM tools
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.clientsSec}>
        <div className="container">
          <div className={Styles.interiorClients}>
            <div className={Styles.interiorClientsCol1}>
              <div className={Styles.interiorClientsCol1Inner1}>
                <h2 className="h2">
                  Clientele & <br></br>Engagements
                </h2>
                <Image
                  src={"/services/677service.jpeg"}
                  width={300}
                  height={100}
                  alt="image"
                  style={{ border: "2px solid #e8dddd", borderRadius: "20px" }}
                />
                <p className="description">
                  Our clientele includes global cloud service providers, leading
                  IT and telecom companies, colocation operators, and enterprise
                  data users. We are proud to be the preferred delivery partner
                  for organizations that demand zero downtime, scalable
                  infrastructure, and future-ready facilities.
                </p>
                <Link href={"/clients"}>
                  <Image
                    className={Styles.arrow}
                    src={"/interior/arrow.svg"}
                    width={30}
                    height={30}
                    alt="image"
                  />
                </Link>
              </div>
              <div className={Styles.interiorClientsCol1Inner2}>
                <div>
                  <h2 className="h3">Commitment to Excellence</h2>
                  <p className="description">
                    With deep domain expertise, dedicated technical teams, and a
                    focus on innovation, agility, and compliance, we continue to
                    set benchmarks in data centre construction—delivering
                    infrastructure that powers the digital transformation of
                    tomorrow.
                  </p>
                </div>
                <Image
                  src={"/interior/exc.png"}
                  width={289}
                  height={200}
                  alt="image"
                />
              </div>
            </div>
            <div className={Styles.interiorClientsCol2}>
              <Image
                src={"/interior/commitment.webp"}
                width={500}
                height={500}
                alt="image"
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
