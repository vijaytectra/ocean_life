/* eslint-disable @next/next/no-img-element */
import { LuChevronRight } from "react-icons/lu";
import SocialShare from "../../../componentNews/SocialShare";
import React from "react";
import Link from "next/link";

function GroundbreakingCeremony() {
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
                  Groundbreaking Ceremony for 30,000 Sq. Ft. Ground Floor Lobby
                  Project in Taramani, Chennai
                </p>
              </div>
              <h3 className="h3">
                Groundbreaking Ceremony for 30,000 Sq. Ft. Ground Floor Lobby
                Project in Taramani, Chennai
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
            <div className="row3NewsLayoutInnerInner">
              <img
                className="mainImage half"
                src="/news/ground1.webp"
                alt="main image"
              />
            </div>
            <div className="row4NewsLayoutInnerInner">
              <p className="description">
                We are pleased to announce the successful Site Pooja for the
                Design and Build of the Ground Floor Lobby for a renowned Grade
                A developer in Taramani, Chennai. Spanning 30,000 sq. ft., this
                project is designed to set a new benchmark in architectural
                excellence, functionality, and innovation.
              </p>
              <p className="description">
                With a Design and Build approach, our focus is on delivering a
                state-of-the-art lobby that blends aesthetic appeal with modern
                functionality. This space will feature contemporary design
                elements, premium materials, and seamless integration of
                technology, ensuring an inviting and sophisticated ambiance.
              </p>
              <ul className="description">
                <li>Project Location: Taramani, Chennai</li>
                <li>Project Type: Ground Floor Lobby – Design & Build</li>
                <li>Total Area: 30,000 sq. ft.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default GroundbreakingCeremony;
