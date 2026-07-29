import {
  STATIC_SITE_CONTENT,
  STATIC_CLIENT_LOGOS,
} from "@/lib/staticSiteData";
import {
  getActiveHeroVideoSrc,
  parseMainVideoValue,
  resolveMediaPublicUrl,
} from "@/lib/mainVideoContent";

/**
 * Server-side readers for the site content that `/api/content` and
 * `/api/clients/logos` return.
 *
 * Those routes serve compile-time constants from `staticSiteData.js`, but the
 * public components were fetching them over the network after hydration —
 * `/api/content` alone was requested six times on the home page (Menu, Footer,
 * page counters, hero video, AdPopup, FloatingEnquiry), each `no-store`. These
 * helpers read the same constants directly so the values are baked into the
 * prerendered HTML with zero client round-trips.
 */

const findValue = (id) => STATIC_SITE_CONTENT.find((i) => i.id === id)?.value;

/** Resolves values stored either plain or as `{active,history}` JSON. */
const resolveMediaValue = (raw, fallback) => {
  if (typeof raw !== "string" || !raw.trim()) return fallback;
  const { active } = parseMainVideoValue(raw);
  return active ? resolveMediaPublicUrl(active) : fallback;
};

export function getSiteContent() {
  return STATIC_SITE_CONTENT;
}

export function getHeaderLogo() {
  return resolveMediaValue(findValue("site-logo-header"), "/logo-web.webp");
}

export function getFooterLogo() {
  return resolveMediaValue(
    findValue("site-logo-footer"),
    "/logo/ocean_footer.png"
  );
}

export function getHeroVideoSrc() {
  return getActiveHeroVideoSrc(findValue("main-video"));
}

export const HERO_POSTER = "/hero-poster.webp";

/**
 * Hero background sources.
 *
 * H.264 only: a VP9/WebM encode of this particular footage came out roughly
 * twice the size of the H.264 one, so there is nothing to gain from a second
 * source. `webm` is kept in the shape so a future encode can be slotted in.
 */
export function getHeroSources() {
  return {
    src: getHeroVideoSrc(),
    webm: null,
    poster: HERO_POSTER,
  };
}

export function getPopupImage() {
  return resolveMediaValue(findValue("popup-image"), "");
}

export function isFloatingEnquiryEnabled() {
  const value = findValue("show-floating-enquiry");
  return value === undefined ? true : value === "true";
}

export function getCounterTargets() {
  const toInt = (id, fallback) => {
    const parsed = parseInt(findValue(id), 10);
    return Number.isNaN(parsed) ? fallback : parsed;
  };

  return [
    { id: "employees", end: toInt("counter-employees", 750) },
    { id: "projects", end: toInt("counter-projects", 60) },
    // Kept hard-coded, matching the previous home page behaviour.
    { id: "experience", end: 30 },
    { id: "ongoing", end: toInt("counter-ongoing", 550) },
  ];
}

export function getClientLogoImages() {
  return STATIC_CLIENT_LOGOS.map((l) => l.image);
}
