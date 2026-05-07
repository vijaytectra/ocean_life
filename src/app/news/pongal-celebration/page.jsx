/* eslint-disable @next/next/no-img-element */
import { LuChevronRight } from "react-icons/lu";
import SocialShare from "../../../componentNews/SocialShare";
import React from "react";
import Link from "next/link";

function PongalCelebrations() {
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
                  Pongal Celebrations at Ocean Lifespaces: Harvesting Joy and
                  Prosperity!
                </p>
              </div>
              <h3 className="h3">
                Pongal Celebrations at Ocean Lifespaces: Harvesting Joy and
                Prosperity!
              </h3>
            </div>
            {/* <div className="row2NewsLayoutInnerInner">
              <div className="author">
                <img className="authorImage" src="/news/in1.webp" alt="author" />
                <div className="contentAuthor">
                  <p className="description">
                    <strong>Nettie Stanton</strong>
                  </p>
                  <p className="description">Jan 14, 2024</p>
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
                src="/news/pongal1.webp"
                alt="main image"
              />
            </div>
            <div className="row4NewsLayoutInnerInner">
              <p className="description">
                At Ocean Lifespaces, we embrace traditions that bring us
                together and celebrate the spirit of unity, gratitude, and
                prosperity. This Pongal, our workplace was filled with vibrant
                decorations, festive spirit, and heartfelt celebrations,
                reflecting the essence of this auspicious festival.
              </p>
              <p className="description">
                The festivities were a wonderful reminder of the importance of
                togetherness, gratitude, and new beginnings. As we celebrate
                this harvest festival, we also look forward to nurturing strong
                relationships—both within our team and with our valued clients.
              </p>
              <p className="description">
                Here’s to a year filled with growth, success, and happiness!
              </p>
              <ul className="description">
                <li>Event: Pongal Celebrations at Ocean Lifespaces</li>
                <li>Occasion: Pongal Festival</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PongalCelebrations;
