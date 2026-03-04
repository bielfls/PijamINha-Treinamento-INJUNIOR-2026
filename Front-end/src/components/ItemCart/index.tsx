import styles from './styles.module.css';
import pijamaImg from '../../assets/pijama1.jpg';
import plusSymbol from "../../assets/Plus Math.png"
import minusSymbol from "../../assets/Subtract.png"
import X from "../../assets/X.png"
import { useState } from 'react';

export default function ItemCart() {

    const [quantity, setQuantity] = useState<number>(1);

    function increaseQuantity() {
        setQuantity(prev => prev + 1);
    }

    function decreaseQuantity() {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    }

    return(
        <li className={styles.itemCart}>
            <figure className={styles.itemFigure}> 
                <img src={pijamaImg} alt="Imagem doPijama" />
            </figure>
            
            <div className={styles.itemInfo}>
                <div className={styles.itemDescription}>
                    <h1>PIJAMA FEMININO LONGO - ESTAMPA POÁ </h1>
                    <p>Ref: #123456</p>
                </div>
                
                <figure>M</figure>
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

                        <p className={styles.stockMsg}>Não perca sua oportunidade! Há apenas mais <span>12</span> peças disponíveis!</p>

                    </div>

                    <p className={styles.priceMsg}>R$ 157,80</p>
                
                </div>
                
            
            </div>

        </li>
    )
}