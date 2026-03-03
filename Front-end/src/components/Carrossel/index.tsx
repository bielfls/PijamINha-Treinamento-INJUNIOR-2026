import { useState, useEffect } from "react";
import styles from "./console.module.css";
import carrossel1 from "../../assets/carrossel1.png";
import carrossel2 from "../../assets/carrossel2.png";
import carrossel3 from "../../assets/carrossel3.png";

const slides = [carrossel1, carrossel2, carrossel3];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);

return () => clearInterval(interval);
  }, [total]);

  return (
    <div className={styles.container}>
      <div
        className={styles.track}
        style={{
          transform: `translateX(-${current * 100}%)`
        }}
      >
        {slides.map((img, i) => (
          <div key={i} className={styles.slide}>
            <img
              src={img}
              alt={`Banner ${i + 1}`}
              className={styles.image}
            />
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`${styles.dot} ${
              i === current ? styles.dotActive : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}