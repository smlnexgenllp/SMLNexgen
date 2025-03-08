"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "./Gallary.module.css"; // Import module CSS

const galleryData = {
  "1": {
    title: "We Craft Interactive Web Experiences",
    images: [
      "/img/img1.jpg",
      "/img/img2.jpg",
      "/img/img3.jpg",
      "/img/img4.jpg",
      "/img/img5.jpg",
      "/img/img6.jpg",
      "/img/img7.jpg",
      "/img/img8.jpg",
      "/img/img13.jpg",
      "/img/img10.jpg",
      "/img/img11.jpg",
      "/img/img12.jpg",
    ],
  },
};

export default function Gallery() {
  const { id } = useParams();
  const gallery = galleryData[id];

  useEffect(() => {
    // Set root CSS variables dynamically
    document.documentElement.style.setProperty("--index", `calc(1vw + 1vh)`);
    document.documentElement.style.setProperty("--transition", "cubic-bezier(.1, .7, 0, 1)");
  }, []);

  if (!gallery) {
    return <h2 className={styles.galleryTitle}></h2>;
  }

  return (
    <div className={styles.galleryContainer}>
      <h2 className={styles.galleryTitle}>{gallery.title}</h2>
      <div className={styles.wrapper}>
        <div className={styles.items}>
          {gallery.images.map((image, index) => (
            <div
              key={index}
              className={styles.item}
              style={{ backgroundImage: `url(${image})` }}
              tabIndex="0"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
