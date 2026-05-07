import Image from "next/image";
import LogoScroll from "../components/LogoScroll";
import DraggableSlider from "./DraggableSlider";
import styles from "./ServiceHeader.module.css";

function ServiceHeader() {
  return (
    <>
      <section className={styles.serviceHead}>
        <div className="container">
          <div className={styles.mainRowServiceHead}>
            <div className={styles.rowServiceHead}>
              <h1 className="h3">Our Services</h1>
              <Image
                width={500}
                height={200}
                src="/services/head-inner.webp"
                alt="image"
              />
              <p className="description">
                We excel in innovation and problem-solving, transforming
                challenges that get into boundless possibilities.
              </p>
            </div>
          </div>
        </div>
        <DraggableSlider />
      </section>
      <section className={styles.logoScroll}>
        <LogoScroll />
      </section>
    </>
  );
}

export default ServiceHeader;
