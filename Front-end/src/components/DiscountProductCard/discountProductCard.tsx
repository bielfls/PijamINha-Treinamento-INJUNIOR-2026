import style from "./style.module.css"
import likeon from "../../assets/Favorito.svg"
import likeoff from "../../assets/Favoritado.svg"
import { useState } from "react"
import {Link} from "react-router-dom"
import discount from "../../assets/Desconto.svg"
import linha from "../../assets/Line 10.svg"
import backgroundImage from "../../assets/Front view of a young lady in pajamas staying in bed.png"


interface DiscountProductCardProps{
    id: string
    name: string
    image: string
    price: number
    onSale: boolean
    salePercent: number | null
}

export default function DiscountProductCard({name,price,onSale,salePercent}: DiscountProductCardProps){

    const[liked, setLiked] = useState(true);

    function handleLike(){
        setLiked(curtido => !curtido)
    }
    const desconto = onSale && salePercent !== null;
    const precofinal = desconto ? price * (1 - (salePercent ?? 0) / 100) : price;

    return(
        <div className={style.cardContainer}>
            <div className={style.imgContainer}>
                <img src={backgroundImage} alt="product image" />
                <div className={style.buttonContainer}>
                <label style={{ backgroundColor: "transparent", cursor: "pointer"}}>
                    <input
                        type="checkbox"
                        onChange={handleLike}
                        checked={liked}
                        style={{display: "none"}}
                        
                    
                    />
                     <img src={liked ? likeon : likeoff} alt="Liked" /> 
                </label>
                    <Link to="/discount">
                        <img src={discount} alt="discount icon" />
                    </Link>
                </div>
            </div>
            <div className={style.infoContainer}>
                <p style={{color: "#3E677A", fontSize: "24px", fontWeight: "400",position: 'relative', top: '1rem'}}>{name}</p>
                <div className={style.precoOriginal}>
                    <p style={{color: "#D00D10", fontWeight: "400", fontSize: "16px"}}>R$ {price.toFixed(2).replace('.', ',')}</p>
                    <img src={linha} alt="linha" />
                </div>
                <h1 style={{marginTop: "1rem", color: "#274553", fontSize: "40px", fontWeight: "700"}}>R$ {precofinal.toFixed(2).replace('.', ',')}</h1>
                <div className={style.parcelaContainer}>
                    <p style={{color: "#274553", fontSize: "16px", fontWeight: "400"}}>6x de </p>
                    <p style={{color: "#274553", fontSize: "16px", fontWeight: "800", fontStyle: "ExtraBold"}}>R$ {(precofinal/6).toFixed(2).replace('.', ',')}</p>
                </div>
            </div>
        </div>
    )
}
