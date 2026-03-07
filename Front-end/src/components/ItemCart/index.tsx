import styles from './styles.module.css';
import pijamaImg from '../../assets/pijama1.jpg';
import plusSymbol from "../../assets/Plus Math.png"
import minusSymbol from "../../assets/Subtract.png"
import X from "../../assets/X.png"
import { useState } from 'react';
import type { CartPajama } from '../../types/pajama';
import { calculateFinalPrice, formatPrice } from '../../utils/pricesFunctions';

export default function ItemCart(props: CartPajama) {

    const [quantity, setQuantity] = useState<number>(props.quantity);
    
    
    function increaseQuantity() {
        if (props.size !== '' && quantity < props.stock) {
            setQuantity(prev => prev + 1);
        }
    }

    function decreaseQuantity() {
        if (quantity > props.quantity) {
            setQuantity(prev => prev - 1);
        }
    }
    


    return(
        <li className={styles.itemCart}>
            <figure className={styles.itemFigure}> 
                <img src={props.pajama.image} alt="Imagem doPijama" />
            </figure>
            
            <div className={styles.itemInfo}>
                <div className={styles.itemDescription}>
                    <h1>{props.pajama.name} </h1>
                    <p>Ref: #123456</p>
                </div>
                
                <figure>{props.size}</figure>
            </div>

            <div className={styles.manageItemCart}>
                
                <div className={styles.moveRemoveDiv}>
                    <button>
                        <img src={X} alt="Símbolo de Exclusão" />
                    </button>
                </div>
                
                <div className={styles.quantityPriceDiv}>
                    
                    <div className={styles.quantityDiv}>
                    
                        <h3>Quantidade:</h3>
                        
                        <div className={styles.manageQuantityDiv}>
                            <button onClick={decreaseQuantity}><img src={minusSymbol} alt="Símbolo de Subtração" /></button>
                            <p className={styles.quantity}>{quantity}</p>
                            <button onClick={increaseQuantity}><img src={plusSymbol} alt="Símbolo de Adição" /></button>
                        </div>

                        <p className={styles.stockMsg}>Não perca sua oportunidade! Há apenas mais <span>{props.stock}</span> peças disponíveis!</p>

                    </div>

                    <p className={styles.priceMsg}>{formatPrice(quantity*calculateFinalPrice(props.pajama))}</p>
                
                </div>
                
            
            </div>

        </li>
    )
}