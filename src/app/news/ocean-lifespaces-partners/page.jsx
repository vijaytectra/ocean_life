/* eslint-disable @next/next/no-img-element */
import { LuChevronRight } from "react-icons/lu";
import SocialShare from "../../../componentNews/SocialShare";
import React from "react";
import Link from "next/link";

function OceanLifespacesPartners() {
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
                  Ocean Lifespaces Partners with Vestian for a Landmark
                  Workplace Project in Chennai
                </p>
              </div>
              <h3 className="h3">
                Ocean Lifespaces Partners with Vestian for a Landmark Workplace
                Project in Chennai
              </h3>
            </div>
            {/* <div className="row2NewsLayoutInnerInner">
              <div className="author">
                <img className="authorImage" src="/news/in1.webp" alt="author" />
                <div className="contentAuthor">
                  <p className="description">
                    <strong>Nettie Stanton</strong>
                  </p>
                  <p className="description">Jun 10, 2024</p>
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
                src="/news/vstian1.webp"
                alt="main image"
              />
              <img
                className="mainImage"
                src="/news/vstian2.webp"
                alt="main image 2"
              />
            </div>
            <div className="row4NewsLayoutInnerInner">
              <p className="description">
                We are proud to announce our partnership with Vestian Global
                Workplace Services Pvt Ltd for the interiors and finishing works
                of the T2 Tower at the Innovation Campus, Chennai – a flagship
                workplace for LTI Mindtree. Spanning an impressive 5,80,000 sq.
                ft. (approx.), this project is set to redefine modern workplace
                design with innovation, precision, and excellence.
              </p>
              <p className="description">
                The grand Site Pooja, organized by Vestian, was a moment of
                great significance for our entire Ocean Lifespaces team. Our
                Managing Director & CEO, Mr. Peter SK, along with our dedicated
                project team, had the honor of being part of this auspicious
                beginning.
              </p>
              <p className="description">
                This G+12 flagship workplace reflects our commitment to
                delivering cutting-edge interiors that seamlessly blend
                aesthetics, functionality, and sustainability.
              </p>
              <ul className="description">
                <li>Project Location: Innovation Campus, Chennai</li>
                <li>Project Scope: Interiors & Finishing Works</li>
                <li>Total Area: 5,80,000 sq. ft. (Approx.)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OceanLifespacesPartners;
