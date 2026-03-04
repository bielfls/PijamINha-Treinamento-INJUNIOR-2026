import estrelaVazia from '../../assets/Default.svg'
import estrelaCheia from '../../assets/Cheia.svg'
import meiaEstrela from '../../assets/Meia.svg'
import style from './styles.module.css'
import { useState, useRef } from 'react'

export default function Stars(){
    const [rating, setRating] = useState(0)
    const stars = [1,2,3,4,5]
    const starRefs = useRef<(HTMLButtonElement|null)[]>([])

    function handleClick(e:React.MouseEvent<HTMLButtonElement>, star: number){
        const botaoAtual = starRefs.current[star]
        if(!botaoAtual) return

        const computedStyle = window.getComputedStyle(botaoAtual);
        const width = parseFloat(computedStyle.width);

        const x = e.clientX

        const inside = botaoAtual.getBoundingClientRect();
        const comeco = inside.left;

        const click = x - comeco;

        if(click < width/2){
            setRating(star-0.5)
        }
        else{
            setRating(star)
        }
    }

     return(
        <div className={style.stars}>
            {stars.map((star) => {
            let imgSrc = estrelaVazia
            if(rating>=star){
                imgSrc = estrelaCheia
            }
            else if(rating === star - 0.5){
                imgSrc = meiaEstrela
            }
            return(
                
                <button
                type='button'  
                key={star} 
                onClick={(e)=> handleClick(e,star)}
                ref={(element) => {starRefs.current[star] = element}}
                className={style.starButton}>
                <img src={imgSrc} className={style.star}/>   
                </button>
                              
            )})}
        </div>
    )
};