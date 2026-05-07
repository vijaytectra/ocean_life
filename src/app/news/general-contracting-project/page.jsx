/* eslint-disable @next/next/no-img-element */
import { LuChevronRight } from "react-icons/lu";
import SocialShare from "../../../componentNews/SocialShare";
import React from "react";
import Link from "next/link";

function GeneralContractingProject() {
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
                  Ocean Lifespaces Secures General Contracting Project for
                  55,000 Sq. Ft. Office Space in Hyderabad
                </p>
              </div>
              <h3 className="h3">
                Ocean Lifespaces Secures General Contracting Project for 55,000
                Sq. Ft. Office Space in Hyderabad
              </h3>
            </div>
            {/* <div className="row2NewsLayoutInnerInner">
              <div className="author">
                <img className="authorImage" src="/news/in1.webp" alt="author" />
                <div className="contentAuthor">
                  <p className="description">
                    <strong>Nettie Stanton</strong>
                  </p>
                  <p className="description">Dec 20, 2024</p>
                </div>
              </div>
              <img className="divider" src="/news/divider.webp" alt="divider" />
              <div className="socialShare">
                <SocialShare />
              </div>
            </div> */}
            {/* <div className="row3NewsLayoutInnerInner">
              <img className="mainImage" src="/news/in2.webp" alt="main image" />
            </div> */}
            <div className="row4NewsLayoutInnerInner">
              <p className="description">
                We are excited to announce our latest project win – the General
                Contracting of a 55,000 sq. ft. office space in Hyderabad for a
                leading financial market infrastructure provider. This project
                is set to redefine modern workspaces with state-of-the-art
                amenities, innovative design elements, and advanced
                infrastructure, tailored to meet the evolving needs of our
                esteemed client.
              </p>
              <p className="description">
                As a key player in financial transactions, our client requires a
                high-performance, future-ready workspace that enhances
                operational efficiency, collaboration, and innovation. Ocean
                Lifespaces is committed to delivering an environment that aligns
                with these objectives, ensuring seamless functionality and
                aesthetic excellence.
              </p>
              <p className="description">
                <strong>Project Highlights:</strong>
              </p>
              <ul className="description">
                <li>55,000 sq. ft. premium office space</li>
                <li>Cutting-edge design and infrastructure</li>
                <li>Optimized for efficiency, collaboration, and innovation</li>
              </ul>
              <p className="description">
                We look forward to bringing this vision to life and reinforcing
                our commitment to excellence in corporate interiors.
              </p>
              <ul className="description">
                <li>Project Location: Hyderabad</li>
                <li>Scope: General Contracting – Office Interiors</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default GeneralContractingProject;
