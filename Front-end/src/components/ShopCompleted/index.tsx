import whiteX from '../../assets/whiteX.png';
import styles from './styles.module.css';

export default function ShopCompleted({backHome}: {backHome: () => void}) {

    return (
        <div className={styles.shopCompleted}>
            <div className={styles.closeBtnDiv}>
                <button onClick={backHome}>
                    <img src={whiteX} alt="Fechar" />
                </button>
            </div>

            <div className={styles.completionMsg}>
                <h1>Sua compra foi concluída!</h1>
                <p>Obrigado por comprar conosco!</p>
            </div>
        </div>
    )
}