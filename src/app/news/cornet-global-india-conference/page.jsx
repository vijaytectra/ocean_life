/* eslint-disable @next/next/no-img-element */
import { LuChevronRight } from "react-icons/lu";
import SocialShare from "../../../componentNews/SocialShare";
import React from "react";
import Link from "next/link";

function CoreNetConference2024() {
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
                  Ocean Lifespaces at CoreNet Global India Conference 2024 -
                  Bengaluru
                </p>
              </div>
              <h3 className="h3">
                Ocean Lifespaces at CoreNet Global India Conference 2024 -
                Bengaluru
              </h3>
            </div>
            {/* <div className="row2NewsLayoutInnerInner">
              <div className="author">
                <img className="authorImage" src="/news/in1.webp" alt="author" />
                <div className="contentAuthor">
                  <p className="description">
                    <strong>Nettie Stanton</strong>
                  </p>
                  <p className="description">Nov 27, 2024</p>
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
                src="/news/cornet1.webp"
                alt="main image"
              />
            </div>
            <div className="row4NewsLayoutInnerInner">
              <p className="description">
                Ocean Lifespaces made a remarkable presence at the CoreNet
                Global India Conference 2024, held at Conrad Bangalore on 27th
                November 2024. Represented by our esteemed team, the event
                provided a platform for insightful discussions, networking with
                industry leaders, and showcasing our expertise in workplace
                solutions.
              </p>
              <p className="description">
                <strong>Our delegation included:</strong>
              </p>
              <ul className="description">
                <li>
                  Neeta Khanapure - Managing Director, Aetrio Architects Private
                  Limited
                </li>
                <li>Mohanroop - VP, Client Engagement & Solutions</li>
                <li>Monica Agarwal - VP, Client Engagement & Solutions</li>
                <li>Ruchita Dutta - AVP, Client Engagement & Solutions</li>
              </ul>
              <p className="description">
                The conference was an excellent opportunity to engage with
                thought leaders, exchange ideas, and reinforce our commitment to
                innovation and excellence in corporate real estate and workplace
                design. We are proud to be part of such a prestigious event,
                contributing to the future of workplace transformation.
              </p>
              <ul className="description">
                <li>Event: CoreNet Global India Conference 2024</li>
                <li>Date: 27th November 2024</li>
                <li>Venue: Conrad Bangalore</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CoreNetConference2024;
