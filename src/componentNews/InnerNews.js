import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Styles from "./InnerNews.module.css";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
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
    title:
      "Ocean Lifespaces Wins Prestigious Contract to Redesign Tech Giant's Headquarters",
    description:
      "Ocean Lifespaces secures a major project to transform the interior...",
    image: "/news1.webp",
    date: "2024-08-28T09:00:00",
    link: "/news/ocean-lifespaces-wins-contract-to-redesign-tech-giants-headquarters",
  },
  {
    title: "Ocean Lifespaces Launches Sustainable Interior Design Initiative",
    description:
      "Introducing a new initiative focusing on eco-friendly interior design...",
    image: "/news2.webp",
    date: "2024-09-25T08:50:00",
    link: "/news/ocean-lifespaces-wins-contract-to-redesign-tech-giants-headquarters",
  },
  {
    title:
      "Ocean Lifespaces Celebrates 28 Years of Excellence in Interior Design",
    description:
      "Reflecting on 28 years of delivering exceptional interior design services...",
    image: "/news3.webp",
    date: "2024-06-28T08:40:00",
    link: "/news/ocean-lifespaces-wins-contract-to-redesign-tech-giants-headquarters",
  },
  {
    title: "New Branch Opening in Downtown",
    description:
      "Ocean Lifespaces opens a new branch in downtown city to serve more clients...",
    image: "/news/news1.webp",
    date: "2024-06-25T12:00:00",
    link: "/news/ocean-lifespaces-wins-contract-to-redesign-tech-giants-headquarters",
  },
  {
    title: "Ocean Lifespaces Participates in Design Expo",
    description:
      "Showcasing our latest sustainable design projects at the annual expo...",
    image: "/news/news2.webp",
    date: "2024-06-27T15:30:00",
    link: "/news/ocean-lifespaces-wins-contract-to-redesign-tech-giants-headquarters",
  },
  {
    title: "Award for Best Residential Design 2024",
    description:
      "Ocean Lifespaces wins the award for the best residential design of 2024...",
    image: "/news/news3.webp",
    date: "2024-06-26T14:15:00",
    link: "/news/ocean-lifespaces-wins-contract-to-redesign-tech-giants-headquarters",
  },
  {
    title: "Collaboration with GreenSpace for Eco Designs",
    description:
      "Announcing a collaboration with GreenSpace to innovate sustainable interiors...",
    image: "/news/news4.webp",
    date: "2024-06-20T10:00:00",
    link: "/news/ocean-lifespaces-wins-contract-to-redesign-tech-giants-headquarters",
  },
  {
    title: "Ocean Lifespaces to Redesign City Hall",
    description:
      "Partnering with the government to redesign the city hall with modern concepts...",
    image: "/news2.webp",
    date: "2024-06-18T09:00:00",
    link: "/news/ocean-lifespaces-wins-contract-to-redesign-tech-giants-headquarters",
  },
  {
    title: "New Virtual Design Consultation Service",
    description:
      "Launching our new virtual design consultation service to clients worldwide...",
    image: "/news3.webp",
    date: "2024-06-15T13:00:00",
    link: "/news/ocean-lifespaces-wins-contract-to-redesign-tech-giants-headquarters",
  },
];

const InnerNews = () => {
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
    setLatestNews(sortedNews);
  }, []);

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

  const truncateTitle = (title, maxLength = 50) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  };

  return (
    <section className={Styles.sectionNews} ref={newsEventsRef}>
      <div className="container">
        <div className={Styles.grid}>
          {latestNews.map((news, index) => (
            <div
              key={index}
              className={Styles.card}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <Image
                width={500}
                height={200}
                src={news.image}
                alt={news.title}
              />
              <div className={Styles.dateBarNews}>
                <p>{timeAgo(news.date)}</p>
                <p>{news.date.slice(0, 10)}</p>
              </div>
              <h3>{truncateTitle(news.title, 37)}</h3>
              <p>{news.description}</p>
              <Link href={news.link}>
                <button>
                  <span>
                    Read More <BsArrowUpRight />
                  </span>
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnerNews;
