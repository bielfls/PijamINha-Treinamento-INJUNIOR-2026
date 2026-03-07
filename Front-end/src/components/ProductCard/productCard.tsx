import style from "./style.module.css"
import likeon from "../../assets/Favorito.svg"
import likeoff from "../../assets/Favoritado.svg"
import backgroundImage from "../../assets/Front view of a young lady in pajamas staying in bed.png"
import { useEffect, useState } from "react"
import { useFavorite } from "../../hooks/use-favorite"
import "./style.module.css"
import { Link } from "react-router-dom"


interface ProductCard{
    id: string,
    image:string,
    name: string,
    price: number,
    parcela: string,
    favorite: boolean
}




export default function ProductCard(props: ProductCard){

    const[liked, setLiked] = useState(props.favorite ?? false);



    const{toggleFavorite} = useFavorite()

    function formatPrice(price:number) : string{
        return price.toFixed(2).replace(".", ",")
    }

    function calculoParcela(price: number) : string{
        return (price/6).toFixed(2).replace(".", ",")
    }
    
    function handleLike(){
        let stateLiked = !liked 
        console.log("liked atual:", liked, "novo estado:", stateLiked)
        setLiked(stateLiked)
        toggleFavorite({id: props.id, favorite: stateLiked })

    }
   

    return(
            <div className={style.cardContainer}>
                <Link to={`/product/${props.id}`} className={style.imgContainer}>
                    <img src={backgroundImage} alt="Modelo vestindo o pijama" />
                </Link>
                
                    <div className={style.buttonContainer}>
                        <label style={{cursor: "pointer"}}>
                            <input
                                type="checkbox"
                                onChange={handleLike}
                                checked={liked}
                                style={{display: "none"}}
                            />
                            <img style={{zIndex: 100}}src={liked ? likeoff : likeon} alt="Liked" /> 
                        </label>
                    </div>
                <div className={style.infoContainer}>
                    <p style={{color: "#3E677A", fontSize: "24px", fontWeight: "400" }}>{props.name}</p>
                    <h1 style={{marginTop: "1rem", color: "#274553", fontSize: "40px", fontWeight: "700"}}>{"R$ " + formatPrice(props.price)}</h1>
                    <div className={style.parcelaContainer}>
                        <p style={{color: "#274553", fontSize: "16px", fontWeight: "400"}}>6x de </p>
                        <p style={{color: "#274553", fontSize: "16px", fontWeight: "800", fontStyle: "ExtraBold"}}>{"R$ " + calculoParcela(props.price)}</p>
                    </div>
                </div>
            </div>
    )
}