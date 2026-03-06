import styles from "./console.module.css";
import starCheia from "../../assets/starcheia.png";
import starVazia from "../../assets/starvazia.png";
import starMetade from "../../assets/starmetade.png";

interface FeedbackCardProps {
  name: string;
  rating: number;
  description: string;
}

export default function FeedbackCard({ name, rating, description }: FeedbackCardProps) {
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => {
      let src = starVazia;
      if (star <= Math.floor(rating)) src = starCheia;
      else if (star === Math.ceil(rating) && rating % 1 !== 0) src = starMetade;

      return <img key={star} src={src} alt="estrela" className={styles.star} />;
    });
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.stars}>
        {renderStars()}
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
}