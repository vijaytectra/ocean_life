/* eslint-disable @next/next/no-img-element */
import { LuChevronRight } from "react-icons/lu";
import SocialShare from "../../../componentNews/SocialShare";
import React from "react";
import Link from "next/link";

function Gujarat() {
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
                  Successful Completion of 2KM Access Road in Gujarat
                </p>
              </div>
              <h3 className="h3">
                Successful Completion of 2KM Access Road in Gujarat
              </h3>
            </div>
            {/* <div className="row2NewsLayoutInnerInner">
              <div className="author">
                <img className="authorImage" src="/news/in1.webp" alt="author" />
                <div className="contentAuthor">
                  <p className="description">
                    <strong>Nettie Stanton</strong>
                  </p>
                  <p className="description">Dec 25, 2024</p>
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
                src="/news/gujarat1.webp"
                alt="main image"
              />
              <img
                className="mainImage"
                src="/news/gujarat2.webp"
                alt="main image"
              />
            </div>
            <div className="row3NewsLayoutInnerInner">
              <img
                className="mainImage"
                src="/news/gujarat3.webp"
                alt="main image"
              />
            </div>
            <div className="row4NewsLayoutInnerInner">
              <p className="description">
                We are excited to announce the successful completion of the Lay
                down Area for the Tuna Tekra Container Terminal Development at
                Tuna Port, Gujarat. Our dedicated team tackled challenges with
                expertise, ensuring a smooth execution and delivering quality
                work every step of the way.
              </p>
              <p className="description">
                This milestone paves the way for the terminal&apos;s future
                Operations. The completion of the lay down Area marks an
                important step forward in this major infrastructure project.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Gujarat;
