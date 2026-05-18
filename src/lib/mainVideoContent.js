/** Homepage hero video stored in SiteContent id `main-video`. */

export const DEFAULT_HERO_VIDEO_SRC = "/hero-video.mp4";

const MAX_HISTORY = 20;

/** Normalize URL for public fetch (relative paths, trim). */
export function resolveMediaPublicUrl(url) {
  if (typeof url !== "string") return "";
  const u = url.trim();
  if (!u) return "";
  if (u.startsWith("http://") || u.startsWith("https://") || u.startsWith("data:")) return u;
  if (u.startsWith("/")) return u;
  return `/${u}`;
}

function dedupeKeepingOrder(list) {
  const seen = new Set();
  const out = [];
  for (const u of list) {
    if (!u || seen.has(u)) continue;
    seen.add(u);
    out.push(u);
  }
  return out;
}

/**
 * @param {string} raw — legacy plain URL, empty, or JSON `{ active, history }`
 * @returns {{ active: string, history: string[] }}
 */
export function parseMainVideoValue(raw) {
  if (typeof raw !== "string") return { active: "", history: [] };
  const t = raw.trim();
  if (!t) return { active: "", history: [] };
  if (t.startsWith("{")) {
    try {
      const j = JSON.parse(t);
      const active = typeof j.active === "string" ? j.active.trim() : "";
      const history = Array.isArray(j.history)
        ? j.history.map((x) => (typeof x === "string" ? x.trim() : "")).filter(Boolean)
        : [];
      const filtered = history.filter((u) => u !== active);
      return { active, history: dedupeKeepingOrder(filtered).slice(0, MAX_HISTORY) };
    } catch {
      return { active: t, history: [] };
    }
  }
  return { active: t, history: [] };
}

export function serializeMainVideo(active, history) {
  const trimmed = typeof active === "string" ? active.trim() : "";
  const hist = dedupeKeepingOrder(
    (Array.isArray(history) ? history : [])
      .map((x) => (typeof x === "string" ? x.trim() : ""))
      .filter(Boolean)
      .filter((u) => u !== trimmed)
  ).slice(0, MAX_HISTORY);
  return JSON.stringify({ active: trimmed, history: hist });
}

/** New upload or pasted URL replaces active; previous active is prepended to history. */
export function nextMainVideoStateFromReplace(currentRaw, newActiveUrl) {
  const { active, history } = parseMainVideoValue(currentRaw);
  const next = typeof newActiveUrl === "string" ? newActiveUrl.trim() : "";
  if (!next) return clearActiveToDefaultHero(currentRaw);
  if (next === active) return serializeMainVideo(active, history);
  const mergedHist = dedupeKeepingOrder([active, ...history].filter(Boolean)).filter((u) => u !== next);
  return serializeMainVideo(next, mergedHist);
}

/** Promote a history entry to active; current active moves into history. */
export function nextMainVideoStateFromHistoryPick(currentRaw, pickedUrl) {
  const { active, history } = parseMainVideoValue(currentRaw);
  const pick = typeof pickedUrl === "string" ? pickedUrl.trim() : "";
  if (!pick) return serializeMainVideo(active, history);
  const withoutPick = history.filter((u) => u !== pick);
  const nextHist = dedupeKeepingOrder([active, ...withoutPick].filter(Boolean));
  return serializeMainVideo(pick, nextHist);
}

/** Drop one URL from history only (active unchanged). */
export function removeHistoryUrl(currentRaw, urlToRemove) {
  const { active, history } = parseMainVideoValue(currentRaw);
  const r = typeof urlToRemove === "string" ? urlToRemove.trim() : "";
  if (!r) return serializeMainVideo(active, history);
  return serializeMainVideo(active, history.filter((u) => u !== r));
}

/** Resolved URL for the hero background (video or image); falls back to default MP4 when unset. */
export function getActiveHeroVideoSrc(raw) {
  const { active } = parseMainVideoValue(raw);
  return active.length > 0 ? resolveMediaPublicUrl(active) : DEFAULT_HERO_VIDEO_SRC;
}

export function guessVideoMimeType(url) {
  const u = (typeof url === "string" ? url : "").toLowerCase();
  if (u.endsWith(".webm")) return "video/webm";
  if (u.endsWith(".mov")) return "video/quicktime";
  return "video/mp4";
}

/** Path extension only (query/hash stripped). */
function urlPathLower(url) {
  if (typeof url !== "string") return "";
  return url.trim().split(/[?#]/)[0].toLowerCase();
}

/** Whether the hero background URL should render as `<img>` (vs `<video>`). */
export function isHeroBackgroundImageUrl(url) {
  const p = urlPathLower(url);
  return /\.(jpe?g|png|gif|webp|svg|avif|bmp|ico)$/i.test(p);
}

/** Live video reverts to built-in default; previous active is moved into history. */
export function clearActiveToDefaultHero(currentRaw) {
  const { active, history } = parseMainVideoValue(currentRaw);
  if (!active) return serializeMainVideo("", history);
  const nextHist = dedupeKeepingOrder([active, ...history].filter(Boolean));
  return serializeMainVideo("", nextHist);
}

