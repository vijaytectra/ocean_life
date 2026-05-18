"use client";

import { useState, useEffect } from "react";
import { DEFAULT_HERO_VIDEO_SRC, getActiveHeroVideoSrc } from "@/lib/mainVideoContent";

export { DEFAULT_HERO_VIDEO_SRC } from "@/lib/mainVideoContent";

/**
 * Resolves homepage hero video from SiteContent `main-video`, same as admin "Main Website Video".
 */
export function useMainHeroVideoSrc() {
  const [src, setSrc] = useState(DEFAULT_HERO_VIDEO_SRC);

  useEffect(() => {
    let cancelled = false;

    const apply = (data) => {
      if (cancelled || !Array.isArray(data)) return;
      const item = data.find((i) => i.id === "main-video");
      const raw = typeof item?.value === "string" ? item.value : "";
      setSrc(getActiveHeroVideoSrc(raw));
    };

    const load = () => {
      fetch("/api/content", { cache: "no-store" })
        .then((res) => res.json())
        .then(apply)
        .catch(() => {
          if (!cancelled) setSrc(DEFAULT_HERO_VIDEO_SRC);
        });
    };

    load();

    const onVisible = () => {
      if (document.visibilityState === "visible") load();
    };

    window.addEventListener("focus", load);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      window.removeEventListener("focus", load);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return src;
}
