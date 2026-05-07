"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Styles from "./NewsAndEvents.module.css";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const timeAgo = (date) => {
  const now = new Date();
  const eventDate = new Date(date);
  const diffInMs = now - eventDate;
  const diffInMins = Math.floor(diffInMs / (1000 * 60));

  if (diffInMins < 60) {
    return `${diffInMins} minutes ago`;
  } else if (diffInMins < 1440) {
    const diffInHours = Math.floor(diffInMins / 60);
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInMins < 43200) {
    const diffInDays = Math.floor(diffInMins / 1440);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInMins < 518400) {
    const diffInMonths = Math.floor(diffInMins / 43200);
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  } else {
    const diffInYears = Math.floor(diffInMins / 518400);
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  }
};

const newsEvents = [
  {
    title: "Top 5 Interior Fit-Out Trends in Chennai’s Commercial Spaces",
    description:
      "The commercial landscape in Chennai is transforming drastically and is on the rise. With the enormous...",
    image: "/blogs/top5.webp",
    date: "2025-05-09T09:00:00",
    link: "/blogs/top-5-interior-fit-out-trends-in-chennais-commercial-spaces",
  },
  {
    title:
      "Chennai’s Infrastructure Boom: Projects That Will Shape the Next Decade",
    description:
      "Chennai is considered one of the fastest-growing urban hubs in India. The next decade is planned to transform ...",
    image: "/blogs/boom-projects.webp",
    date: "2025-05-08T09:00:00",
    link: "/blogs/chennai-infrastructure-boom",
  },
  {
    title: "8 Tips to Choose the Best Civil Construction Company in Chennai",
    description:
      "It is essential to choose the best civil company for your real estate project. Choosing the right company ...",
    image: "/blogs/right-civil.webp",
    date: "2025-05-07T09:00:00",
    link: "/blogs/best-civil-construction-company-chennai",
  },
];

const BlogsUpdates = ({ list = 3 }) => {
  const [latestNews, setLatestNews] = useState([]);
  const newsEventsRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    const sortedNews = [...newsEvents].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setLatestNews(sortedNews.slice(0, list));
  }, [list]);

  useLayoutEffect(() => {
    if (
      newsEventsRef.current &&
      headingRef.current &&
      cardsRef.current.length
    ) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: newsEventsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
      }).from(
        cardsRef.current,
        {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.5"
      );
    }
  }, [latestNews]);

  return (
    <section className={Styles.sectionNews} ref={newsEventsRef} id="news">
      <div className="container">
        <div className={Styles.rowNews} ref={headingRef}>
          <h4>Latest updates & Inspiring achievements</h4>
          <h2>Blogs</h2>
        </div>
        <div className={Styles.grid}>
          {latestNews.map((news, index) => (
            <div
              key={index}
              className={Styles.card}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className={Styles.imageDiv}>
                <Image
                  width={480}
                  height={282}
                  src={news.image}
                  alt={news.title}
                />
              </div>
              <div className={Styles.contentDiv}>
                <div className={Styles.dateBarNews}>
                  <p>{timeAgo(news.date)}</p>
                  <p>{news.date.slice(0, 10)}</p>
                </div>
                <h3>{news.title}</h3>
                <p>{news.description}</p>
                <Link href={news.link}>
                  <button className={Styles.cta}>
                    <span>Read More</span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsUpdates;
