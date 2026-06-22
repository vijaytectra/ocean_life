"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Styles from "./NewsAndEvents.module.css";
import { resolveBlogImageUrl } from "@/lib/blogImage";
import { blogPublicPath } from "@/lib/blogSlug";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeAgo = (date) => {
  if (!date) return "recently";
  const now = new Date();
  const eventDate = new Date(date);
  const diffInMs = now - eventDate;
  const diffInMins = Math.floor(diffInMs / (1000 * 60));

  if (diffInMins < 60) {
    return `${diffInMins} minutes ago`;
  }
  if (diffInMins < 1440) {
    const diffInHours = Math.floor(diffInMins / 60);
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }
  if (diffInMins < 43200) {
    const diffInDays = Math.floor(diffInMins / 1440);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }
  if (diffInMins < 518400) {
    const diffInMonths = Math.floor(diffInMins / 43200);
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  }
  const diffInYears = Math.floor(diffInMins / 518400);
  return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
};

const stripHtml = (html) => {
  if (!html || typeof html !== "string") return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

const excerpt = (content, max = 120) => {
  const text = stripHtml(content);
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max)}...` : text;
};

const BlogsUpdates = ({ list = 3, initialBlogs = null, showHeading = true, animate = true, compact = false }) => {
  const [latestNews, setLatestNews] = useState(() =>
    Array.isArray(initialBlogs) ? initialBlogs.slice(0, list) : []
  );
  const newsEventsRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs/", {
          cache: "no-store",
          credentials: "same-origin",
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          const published = data.filter(
            (blog) => (blog.status || "published").toLowerCase() === "published"
          );
          const sortedNews = published.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setLatestNews(sortedNews.slice(0, list));
        }
      } catch {
        /* ignore */
      }
    };
    fetchBlogs();
  }, [list]);

  useLayoutEffect(() => {
    if (!animate || latestNews.length === 0) return;

    const section = newsEventsRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !heading || cards.length === 0) return;

    timelineRef.current?.scrollTrigger?.kill();
    timelineRef.current?.kill();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none none",
        invalidateOnRefresh: true,
      },
    });

    tl.from(heading, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
      immediateRender: false,
    }).from(
      cards,
      {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        immediateRender: false,
      },
      "-=0.4"
    );

    timelineRef.current = tl;
    ScrollTrigger.refresh();

    return () => {
      timelineRef.current?.scrollTrigger?.kill();
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [latestNews, animate]);

  return (
    <section
      className={`${Styles.sectionNews} ${compact ? Styles.sectionCompact : ""}`}
      ref={newsEventsRef}
      id={compact ? undefined : "news"}
    >
      <div className="container">
        {showHeading ? (
          <div className={Styles.rowNews} ref={headingRef}>
            <h4>Latest updates & Inspiring achievements</h4>
            <h2>Blog</h2>
          </div>
        ) : (
          <div ref={headingRef} aria-hidden="true" style={{ height: 0, overflow: "hidden" }} />
        )}
        {latestNews.length === 0 ? (
          <p style={{ color: "#64748b", fontSize: "1.05rem", margin: 0 }}>No blog posts yet. Check back soon.</p>
        ) : (
          <div className={Styles.grid}>
            {latestNews.map((news, index) => (
              <div
                key={news.id ?? index}
                className={Styles.card}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
              >
                <div className={Styles.imageDiv}>
                  <img
                    src={resolveBlogImageUrl(news.image)}
                    alt={news.title ? `Cover: ${news.title}` : "Blog cover"}
                    className={Styles.blogThumb}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
                <div className={Styles.contentDiv}>
                  <div className={Styles.dateBarNews}>
                    <p>{timeAgo(news.createdAt)}</p>
                    <p>{new Date(news.createdAt || Date.now()).toISOString().slice(0, 10)}</p>
                  </div>
                  <h3>{news.title}</h3>
                  <p className={Styles.cardExcerpt}>{excerpt(news.content)}</p>
                  <Link href={blogPublicPath(news)} className={Styles.cta}>
                    <span>Read more</span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10" aria-hidden>
                      <path d="M1,5 L11,5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      <polyline points="8 1 12 5 8 9" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogsUpdates;
