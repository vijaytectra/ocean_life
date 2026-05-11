"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Styles from "./NewsAndEvents.module.css";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const timeAgo = (date) => {
  if (!date) return 'recently';
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

const BlogsUpdates = ({ list = 3 }) => {
  const [latestNews, setLatestNews] = useState([]);
  const newsEventsRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (Array.isArray(data)) {
          // Sort by newest and slice
          const sortedNews = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setLatestNews(sortedNews.slice(0, list));
        }
      } catch (e) {
        console.error("Failed to fetch blogs:", e);
      }
    };
    fetchBlogs();
  }, [list]);

  useLayoutEffect(() => {
    if (
      newsEventsRef.current &&
      headingRef.current &&
      cardsRef.current.length > 0 &&
      latestNews.length > 0
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
                  src={news.image || '/blogs/top5.webp'}
                  alt={news.title}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={Styles.contentDiv}>
                <div className={Styles.dateBarNews}>
                  <p>{timeAgo(news.createdAt)}</p>
                  <p>{new Date(news.createdAt || Date.now()).toISOString().slice(0, 10)}</p>
                </div>
                <h3>{news.title}</h3>
                <p>{news.content ? news.content.substring(0, 120) + '...' : ''}</p>
                <Link href={`/blogs/${news.id}`}>
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
