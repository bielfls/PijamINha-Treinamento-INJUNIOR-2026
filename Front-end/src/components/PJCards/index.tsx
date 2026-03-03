import styles from "./console.module.css";
import desconto from "../../assets/descontohome.png"
import favorito from "../../assets/favoritohome.png"
import favoritado from "../../assets/favoritadohome.png"
import { useState } from "react";

interface ProductCardProps {
  image: string;
  name: string;
  originalPrice: number;
  discountPrice: number;
  installments: number;
}

export default function ProductCard({
  image,
  name,
  originalPrice,
  discountPrice,
  installments,
}: ProductCardProps) {

const [isFavorited, setIsFavorited] = useState(false)
const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.image} />
        <button className={styles.heart} onClick={toggleFavorite}>
          <img 
          src={isFavorited ? favoritado : favorito} 
          alt={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}/>
        </button>
        <div className={styles.discount}>

            <img src={desconto} alt="ícone de desconto"/>
        </div>
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.originalPrice}>R$ {originalPrice.toFixed(2)}</p>
        <p className={styles.discountPrice}>R$ {discountPrice.toFixed(2)}</p>
        <p className={styles.installments}>
          {installments}x de R$ {(discountPrice / installments).toFixed(2)}
        </p>
      </div>
    </div>
  );
}