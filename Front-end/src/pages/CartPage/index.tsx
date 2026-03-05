import styles from './styles.module.css';
import redCart from '../../assets/RedCart.png';
import favSyboml from '../../assets/Favorito.svg';
import { useState } from 'react';
import Modal from '../../components/Modal';
import DataFormCart from '../../components/DataFormCart';
import PayFormCart from '../../components/PayFormCart';
import ShopCompleted from '../../components/ShopCompleted';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {

    const [modalStep, setModalStep] = useState<"data" | "payment" | "completed" | null>(null);
    const navigate = useNavigate();

    function proxStep(step: "data" | "payment" | "completed") {
        setModalStep(step);
    }

    function backHome() {
        navigate("/");
        setModalStep(null)
    }

    return(
        <>
            <main>
                <section className={styles.cartTitles}>
                    <div className={styles.titleContainer}>
                        <figure>
                            <img src={redCart} alt="Símbolo de carrinho de compras" />
                        </figure>
                        
                        <h1 className={styles.cartTitle}>Carrinho</h1>
                    </div>

                    <div className={styles.titleContainer}>
                        <figure>
                            <img src={favSyboml} alt="Símbolo de favorito" />
                        </figure>
                        
                        <h1 className={styles.favTitle}>Favoritos</h1>
                    </div>
                
                </section>
                
                <section className={styles.cartShop}>

                    <ul className={styles.cartItems}>
                        <div style={{width: "1344px", height: "287px", border: "1px solid black"}}></div>
                        <div style={{width: "1344px", height: "287px", border: "1px solid black"}}></div>
                        <div style={{width: "1344px", height: "287px", border: "1px solid black"}}></div>
                        <div style={{width: "1344px", height: "287px", border: "1px solid black"}}></div>
                    </ul>
                    

                    <div className={styles.shoppingResume}>
                        <div className={styles.totalPrice}>
                            <p>Total</p>
                            <p>R$ 2.000,00</p>
                        </div>
                        
                        <button className={styles.shopBtn} onClick={() => setModalStep("data")}>
                            COMPRE TUDO
                        </button>

                    </div>

                </section>

                {modalStep && (
                    <Modal onClose={() => setModalStep(null)}>
                        {modalStep === "data" && (
                        <DataFormCart nextStep={() => proxStep("payment")} />
                        )}

                        {modalStep === "payment" && (
                        <PayFormCart nextStep={() => proxStep("completed")} backStep={() => proxStep("data")} />
                        )}

                        {modalStep === "completed" && (
                        <ShopCompleted backHome={() => backHome()} />
                        )}
                    </Modal>
                )}
            
            </main>  
        </>
    )
}