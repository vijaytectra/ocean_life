"use client";

import clientStyles from "@/app/clients/clients.module.css";
import styles from "./ClientLogoSitePreview.module.css";

export default function ClientLogoSitePreview({
  imageSrc,
  sectionTitle = "Corporate Clients",
  compact = false,
}) {
  if (!imageSrc) return null;

  if (compact) {
    return (
      <div className={styles.wrap}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Live preview</p>
          <p className={styles.hint}>Updates as you adjust the crop.</p>
        </div>
        <div className={`${clientStyles.darkSection} ${styles.section} ${styles.sectionCompact}`}>
          <div className={clientStyles.darkSectionBg} aria-hidden />
          <div className={styles.sectionInner}>
            <div className={styles.marqueeWrap}>
              <div className={clientStyles.marquee} style={{ maskImage: "none" }}>
                <div className={`${clientStyles.marqueeTrack} ${styles.marqueeTrackStatic}`}>
                  <div className={clientStyles.marqueeItem}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageSrc} alt="" className={clientStyles.marqueeImg} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.gridWrap}>
              <div className={`${clientStyles.darkGrid} ${styles.previewGrid} ${styles.previewGridCompact}`}>
                <article className={`${clientStyles.logoCard} ${clientStyles.logoCardDark}`}>
                  <div className={clientStyles.logoCardInner}>
                    <div className={clientStyles.logoMedia}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageSrc}
                        alt="Client logo preview"
                        className={`${clientStyles.logoImgDark} ${styles.gridLogoImg}`}
                      />
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Website preview</p>
        <p className={styles.hint}>
          This is exactly how your logo will appear on the Clients page — in the scrolling
          marquee and the logo grid.
        </p>
      </div>

      <div className={`${clientStyles.darkSection} ${styles.section}`}>
        <div className={clientStyles.darkSectionBg} aria-hidden />
        <div className={clientStyles.darkOrb1} aria-hidden />
        <div className={clientStyles.darkOrb2} aria-hidden />
        <div className={clientStyles.darkAccentLine} aria-hidden />

        <div className={styles.sectionInner}>
          <header className={`${clientStyles.sectionHead} ${clientStyles.darkSectionHeader} ${styles.sectionHead}`}>
            <span className={clientStyles.sectionIndexLight}>01</span>
            <div>
              <h2 className={clientStyles.sectionTitleLight}>{sectionTitle}</h2>
              <p className={clientStyles.sectionSubLight}>Preview of your uploaded logo</p>
            </div>
          </header>

          <div className={styles.marqueeWrap}>
            <div className={clientStyles.marquee} style={{ maskImage: "none" }}>
              <div className={`${clientStyles.marqueeTrack} ${styles.marqueeTrackStatic}`}>
                <div className={clientStyles.marqueeItem}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageSrc} alt="" className={clientStyles.marqueeImg} />
                </div>
                <div className={clientStyles.marqueeItem} aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageSrc} alt="" className={clientStyles.marqueeImg} />
                </div>
                <div className={clientStyles.marqueeItem} aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageSrc} alt="" className={clientStyles.marqueeImg} />
                </div>
              </div>
            </div>
            <p className={styles.caption}>Scrolling marquee</p>
          </div>

          <div className={styles.gridWrap}>
            <div className={`${clientStyles.darkGrid} ${styles.previewGrid}`}>
              <article className={`${clientStyles.logoCard} ${clientStyles.logoCardDark}`}>
                <div className={clientStyles.logoCardInner}>
                  <div className={clientStyles.logoMedia}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageSrc}
                      alt="Client logo preview"
                      className={`${clientStyles.logoImgDark} ${styles.gridLogoImg}`}
                    />
                  </div>
                </div>
              </article>
            </div>
            <p className={styles.caption}>Logo grid card</p>
          </div>
        </div>
      </div>
    </div>
  );
}
