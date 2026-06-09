import styles from "./DriveUs.module.css";
import ImageSlider from "./ImageSlider";

export default function DriveUs() {
  return (
    <section className={styles.driveUs}>
      <div className="container">
        <div className={styles.mainRowDriveUs}>
          <header className={styles.intro}>
            <p className={styles.eyebrow}>Our ethos</p>
            <h2 className={styles.title}>What Drives Us</h2>
            <p className={styles.lead}>
              Our passion for excellence fuels every project we undertake. With a
              commitment to innovation, quality, and client satisfaction, we craft
              spaces that inspire and elevate experiences.
            </p>
          </header>
          <div className={styles.sliderWrap}>
            <ImageSlider />
          </div>
        </div>
      </div>
    </section>
  );
}
