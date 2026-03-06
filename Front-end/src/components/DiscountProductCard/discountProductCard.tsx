import style from "./style.module.css";
import likeon from "../../assets/Favorito.svg";
import likeoff from "../../assets/Favoritado.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import discount from "../../assets/Desconto.svg";
import backgroundImage from "../../assets/Front view of a young lady in pajamas staying in bed.png";
import { useFavorite } from "../../hooks/use-favorite";

interface DiscountProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  onSale: boolean;
  salePercent: number | null;
  favorite: boolean;
}

export default function DiscountProductCard({
  name,
  price,
  salePercent,
  id,
  favorite,
}: DiscountProductCardProps) {

  const [liked, setLiked] = useState(favorite ?? true);
  const { toggleFavorite } = useFavorite();
  function handleLike(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    const stateCurtido = !liked;
    setLiked(stateCurtido);
    toggleFavorite({ id, favorite: stateCurtido });
  }

  const percent = Number(salePercent) || 0;
  const temDesconto = percent > 0;
  const valorDoDesconto = (price * percent) / 100;
  const precofinal = temDesconto ? price - valorDoDesconto : price;

  return (
    <div className={style.cardContainer}>
      <div className={style.imgContainer}>
        <Link to={`/product/${id}`} className={style.linkImage}>
          <img src={backgroundImage} alt={name} />
        </Link>

        <div className={style.buttonContainer}>
          <label
            style={{ backgroundColor: "transparent", cursor: "pointer" }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              onChange={handleLike}
              checked={liked}
              style={{ display: "none" }}
            />
            <img src={liked ? likeon : likeoff} alt="Liked" />
          </label>
          <Link to="/discount" onClick={(e) => e.stopPropagation()}>
            <img src={discount} alt="discount icon" />
          </Link>
        </div>
      </div>
      <Link 
        to={`/product/${id}`} 
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div className={style.infoContainer}>
          <p style={{ color: "#3E677A", fontSize: "24px", fontWeight: "400", position: 'relative', top: '1rem' }}>
            {name}
          </p>
          
          {temDesconto && (
            <div className={style.precoOriginal}>
              <p style={{ color: "#D00D10", fontWeight: "400", fontSize: "16px", textDecoration: 'line-through' }}>
                R$ {price.toFixed(2).replace('.', ',')}
              </p>
            </div>
          )}

          <h1 style={{ marginTop: "1rem", color: "#274553", fontSize: "40px", fontWeight: "700" }}>
            R$ {precofinal.toFixed(2).replace('.', ',')}
          </h1>

          <div className={style.parcelaContainer}>
            <p style={{ color: "#274553", fontSize: "16px", fontWeight: "400" }}>6x de </p>
            <p style={{ color: "#274553", fontSize: "16px", fontWeight: "800" }}>
              R$ {(precofinal / 6).toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}