/* eslint-disable @next/next/no-img-element */
import { LuChevronRight } from "react-icons/lu";
import SocialShare from "../../../componentNews/SocialShare";
import React from "react";
import Link from "next/link";

function ProtectiveCoatingProject() {
  return (
    <>
      <section className="newsLayoutInner">
        <div className="container">
          <div className="rowMainNewsLayoutInnerInner">
            <div className="rowNewsLayoutInnerInner">
              <div className="breadcrumbNewsLayoutInner">
                <Link href="/projects" className="description">
                  News and Events
                  <span className="chevronRight">
                    <LuChevronRight />
                  </span>
                </Link>

                <p className="description">
                  Successful Completion of Protective Coating Project at a
                  Mission-Critical Nuclear Power Plant
                </p>
              </div>
              <h3 className="h3">
                Successful Completion of Protective Coating Project at a
                Mission-Critical Nuclear Power Plant
              </h3>
            </div>
            {/* <div className="row2NewsLayoutInnerInner">
              <div className="author">
                <img className="authorImage" src="/news/in1.webp" alt="author" />
                <div className="contentAuthor">
                  <p className="description">
                    <strong>Nettie Stanton</strong>
                  </p>
                  <p className="description">Dec 15, 2024</p>
                </div>
              </div>
              <img className="divider" src="/news/divider.webp" alt="divider" />
              <div className="socialShare">
                <SocialShare />
              </div>
            </div> */}
            <div className="row3NewsLayoutInnerInner two">
              <img
                className="mainImage"
                src="/news/nuclear1.webp"
                alt="main image"
              />
              <img
                className="mainImage"
                src="/news/nuclear2.webp"
                alt="main image"
              />
            </div>
            <div className="row4NewsLayoutInnerInner">
              <p className="description">
                We are proud to announce the successful application of
                protective and antifouling coating on a hydro-technical
                structure at a mission-critical nuclear power plant, adhering to
                the highest standards of quality and safety.
              </p>
              <p className="description">
                This milestone was achieved using a specialized high-performance
                paint, ensuring durability, efficiency, and long-term
                protection. Thanks to the unwavering trust and support of our
                valued client, our dedicated team successfully completed the
                project within just 6 months, maintaining top-tier HSE (Health,
                Safety, and Environment) standards.
              </p>
              <p className="description">
                <strong>Project Highlights:</strong>
              </p>
              <ul className="description">
                <li>0.8 million safe man-hours</li>
                <li>32 lakh sq. ft. of paint surface area covered</li>
              </ul>
              <p className="description">
                This achievement reflects our commitment to excellence, safety,
                and innovation in delivering high-quality solutions for critical
                infrastructure projects. We extend our heartfelt appreciation to
                our clients, partners, and our exceptional team for making this
                project a resounding success.
              </p>
              <p className="description">
                Here&apos;s to more groundbreaking accomplishments and future
                collaborations!
              </p>
              <ul className="description">
                <li>
                  Project Type: Protective Coating for Hydro-Technical Structure
                </li>
                <li>Completion Timeline: 6 Months</li>
                <li>Sector: Nuclear Power Plant</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProtectiveCoatingProject;
