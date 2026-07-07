import interiorFitOut from "../../scripts/blog-data/interior-fit-out-services.js";
import { FALLBACK_EMPLOYEES } from "@/lib/employeesShared";
import { DEFAULT_ACCREDITATIONS } from "@/lib/defaultAccreditations";

/**
 * =============================================================================
 * HARDCODED SITE DATA — the public website renders entirely from this file.
 * No database is required for any public page.
 * Edit values here and redeploy to update the live site.
 * =============================================================================
 */

/** SiteContent (homepage counters, hero, logos, popup, flags). */
export const STATIC_SITE_CONTENT = [
  { id: "counter-employees", type: "text", value: "750" },
  { id: "counter-projects", type: "text", value: "60" },
  { id: "counter-experience", type: "text", value: "28" },
  { id: "counter-ongoing", type: "text", value: "550" },
  { id: "home-hero-title", type: "text", value: "Delivering Excellence" },
  { id: "show-floating-enquiry", type: "text", value: "true" },
  {
    id: "site-logo",
    type: "image",
    value: '{"active":"/logo.webp","history":[]}',
  },
  {
    id: "site-logo-header",
    type: "image",
    value: '{"active":"/logo-web.webp","history":[]}',
  },
  { id: "site-logo-footer", type: "image", value: "/logo/ocean_footer.png" },
  {
    id: "main-video",
    type: "video",
    value:
      '{"active":"/api/images/hero-video-1778673541082-326692634.mp4","history":[]}',
  },
  { id: "popup-image", type: "image", value: "" },
].map((row) => ({
  ...row,
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString(),
}));

/** Corporate client logos (paths served from public/ on the server). */
const CORPORATE_LOGOS = [
  "/clients/1.webp", "/clients/2.webp", "/clients/3.webp", "/clients/4.webp", "/clients/5.webp",
  "/clients/6.webp", "/clients/7.webp", "/clients/8.webp", "/clients/9.webp", "/clients/10.webp",
  "/clients/11.webp", "/clients/12.webp", "/clients/13.webp", "/clients/14.webp", "/clients/15.webp",
  "/clients/16.webp", "/clients/17.webp", "/clients/18.webp", "/clients/19.webp", "/clients/20.webp",
  "/clients/21.webp", "/clients/22.webp", "/clients/23.webp", "/clients/24.webp", "/clients/25.webp",
  "/clients/26.webp", "/clients/27.webp", "/clients/28.webp", "/clients/29.webp", "/clients/30.webp",
  "/clients/31.webp", "/clients/32.webp", "/clients/33.webp", "/clients/34.webp", "/clients/35.webp",
];

/** Ongoing-project client logos. */
const ONGOING_LOGOS = [
  "/clients/on5.webp", "/clients/on7.webp", "/clients/on11.webp",
  "/logo/workday.png", "/logo/alldigi.svg", "/logo/accenture.png",
  "/logo/rsp.jpeg", "/logo/nametech.jpeg", "/logo/IIT HYDERABAD.png",
  "/logo/sifi.png", "/logo/st_telemedia.webp", "/logo/IRON MOUNTAIN.png",
  "/logo/CITY UNION BANK.png",
  "/clients/on1.webp", "/clients/on2.webp", "/clients/on3.webp",
  "/clients/on4.webp", "/clients/on6.webp", "/clients/on8.webp",
  "/clients/on9.webp", "/clients/on10.webp", "/clients/on12.webp",
  "/clients/on13.webp", "/clients/on14.webp", "/clients/on15.webp",
  "/clients/on16.webp", "/logo/sifi.webp",
];

export const STATIC_CLIENT_LOGOS = [
  ...CORPORATE_LOGOS.map((image, i) => ({
    id: i + 1,
    image,
    category: "corporate",
    createdAt: new Date(0).toISOString(),
  })),
  ...ONGOING_LOGOS.map((image, i) => ({
    id: CORPORATE_LOGOS.length + i + 1,
    image,
    category: "ongoing",
    createdAt: new Date(0).toISOString(),
  })),
];

/** Short blog cards (list + previews). */
const SHORT_BLOGS = [
  {
    title: "Top 5 Interior Fit-Out Trends in Chennai's Commercial Spaces",
    slug: "top-5-interior-fit-out-trends-in-chennais-commercial-spaces",
    image: "/blog-images/top5.webp",
    status: "published",
    metaTitle: "Top 5 Interior Fit-Out Trends in Chennai's Commercial Spaces | OLIPL",
    metaDesc:
      "Explore the top 5 interior fit-out trends shaping Chennai's commercial spaces.",
    content:
      "<p>Explore the latest commercial interior fit-out trends shaping Chennai's workspaces — from biophilic design to smart technology. <a href=\"/blog/top-5-interior-fit-out-trends-in-chennais-commercial-spaces/\">Read the full article</a>.</p>",
  },
  {
    title: "Chennai's Infrastructure Boom: Projects That Will Shape the Next Decade",
    slug: "chennai-infrastructure-boom",
    image: "/blog-images/boom-projects.webp",
    status: "published",
    metaTitle: "Chennai Infrastructure Boom | Ocean Lifespaces",
    metaDesc:
      "Chennai's infrastructure boom — major projects set to transform the city over the next decade.",
    content:
      "<p>Chennai is one of India's fastest-growing urban hubs. <a href=\"/blog/chennai-infrastructure-boom/\">Read the full article</a>.</p>",
  },
  {
    title: "8 Tips to Choose the Best Civil Construction Company in Chennai",
    slug: "best-civil-construction-company-chennai",
    image: "/blog-images/right-civil.webp",
    status: "published",
    metaTitle: "Best Civil Construction Company in Chennai | Ocean Lifespaces",
    metaDesc:
      "Best Civil Construction Company in Chennai – Ocean Lifespaces delivers quality residential & commercial projects with trust, innovation & timely execution.",
    content:
      "<p>Choosing the right civil construction partner is essential for project success. <a href=\"/blog/best-civil-construction-company-chennai/\">Read the full article</a>.</p>",
  },
];

/** All blogs, newest first, with synthetic ids + timestamps. */
export const STATIC_BLOGS = [interiorFitOut, ...SHORT_BLOGS].map((blog, index) => ({
  id: index + 1,
  ...blog,
  status: blog.status || "published",
  metaTitle: blog.metaTitle || null,
  metaDesc: blog.metaDesc || null,
  createdAt: new Date(Date.now() - index * 86400000).toISOString(),
  updatedAt: new Date(Date.now() - index * 86400000).toISOString(),
}));

/** Management team (About page + /api/employees). */
export const STATIC_EMPLOYEES = FALLBACK_EMPLOYEES;

/** Accreditations (About page + /api/accreditations). */
export const STATIC_ACCREDITATIONS = DEFAULT_ACCREDITATIONS.map((item, index) => ({
  id: index + 1,
  ...item,
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString(),
}));

/**
 * Admin-managed service "offerings" shown on category pages via
 * DynamicCategoryServices. Empty by default (the primary service content is
 * hardcoded in src/data/oceanServices.js and the individual category pages).
 * Add objects here to show extra offering cards:
 *   { id, type, name, description, image, subServices, recentProject, ongoingProject }
 */
export const STATIC_SERVICES = [];

export function getStaticServiceById(id) {
  const numericId = parseInt(id, 10);
  if (Number.isNaN(numericId)) return null;
  return STATIC_SERVICES.find((s) => s.id === numericId) || null;
}

export function getStaticBlogBySlugOrId(identifier) {
  const raw = String(identifier || "").trim();
  if (!raw) return null;
  const numericId = parseInt(raw, 10);
  const isNumericId = !Number.isNaN(numericId) && String(numericId) === raw;
  if (isNumericId) {
    return STATIC_BLOGS.find((b) => b.id === numericId) || null;
  }
  return STATIC_BLOGS.find((b) => b.slug === raw) || null;
}
