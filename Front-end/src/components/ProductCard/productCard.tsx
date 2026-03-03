import style from "./style.module.css"
import likeon from "../../assets/Favorito.svg"
import likeoff from "../../assets/Favoritado.svg"
import backgroundImage from "../../assets/Front view of a young lady in pajamas staying in bed.png"
import { useState } from "react"
import "./style.module.css"



interface ProductCard{
    id: number,
    image:string,
    name: string,
    price: string,
    parcela: string,
}




export default function ProductCard(){

    const[liked, setLiked] = useState(true);

    function handleLike(){
        setLiked(curtido => !curtido)
        console.log("liked!")
    }


    return(
        <div className={style.cardContainer}>
            <div className={style.imgContainer}>
                <img src={backgroundImage} alt="" />
                <div className={style.buttonContainer}>
                    <label style={{cursor: "pointer"}}>
                        <input
                            type="checkbox"
                            onChange={handleLike}
                            checked={liked}
                            style={{display: "none"}}
                        />
                        <img src={liked ? likeon : likeoff} alt="Liked" /> 
                    </label>
                </div>
            </div>
            <div className={style.infoContainer}>
                <p style={{color: "#3E677A", fontSize: "24px", fontWeight: "400" }}>PIJAMA FEMININO LONGO - ESTAMPA POÁ</p>
                <h1 style={{marginTop: "1rem", color: "#274553", fontSize: "40px", fontWeight: "700"}}>R$ 78,90</h1>
                <div className={style.parcelaContainer}>
                    <p style={{color: "#274553", fontSize: "16px", fontWeight: "400"}}>6x de </p>
                    <p style={{color: "#274553", fontSize: "16px", fontWeight: "800", fontStyle: "ExtraBold"}}>R$13,50</p>
                </div>
            </div>
        </div>
    )
}