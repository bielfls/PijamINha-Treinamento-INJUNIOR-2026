import { useState } from "react";
import styles from "./styles.module.css"
import plusSymbol from "../../assets/Plus Math.png"
import minusSymbol from "../../assets/Subtract.png"
import favSymbol from "../../assets/Favorito.svg"
import likeOn from "../../assets/Favoritado.svg"

export default function PijamaPage() {
    const sizes : string[] = ["PP", "P", "M", "G", "GG"]
    const [choosenSize, setChoosenSize] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [liked, setLiked] = useState<boolean>(false)


    function increaseQuantity() {
        setQuantity(prev => prev + 1);
    }

    function decreaseQuantity() {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    }

    function handleLike(){
        setLiked(curtido => !curtido)
    }



    return (
        <>
            <main className={styles.mainPijamaPage}>
                
                <section className={styles.pijamaPage}>
                    <div className={styles.pijamaApresentation}>
                        <figure className={styles.pijamaFigure}>
                            <img src="" alt="Imagem do Pijama" />
                        </figure>
                    
                    
                        <div className={styles.pijamaInfo}>
                            <div className={styles.pijamaTitle}>
                                <h1>PIJAMA FEMININO LONGO - ESTAMPA POÁ</h1>
                                <h6>Ref: #123456</h6>
                            </div>
                            
                            <div className={styles.pricesDiv}>
                                <div className={styles.directPrices}>
                                    <p className={styles.normalPrice}>R$ 78,90</p>
                                    <p className={styles.pixPrice}>Ou por <span>R$67,06</span> no PIX</p>
                                </div>
                                
                                <p className={styles.partsPrice}>6x de <span>R$13,15</span></p>
                            </div>

                            <div className={styles.sizesDiv}>
                                <h3>Tamanhos:</h3>
                                
                                <ul className={styles.btnSizesList}>
                                    {sizes.map((size) => 
                                                <button onClick={() => setChoosenSize(size)}
                                                className={size === choosenSize ? styles.choosenSize : styles.nonChoosen}>
                                                    {size}
                                                </button>
                                    
                                            )
                                    }
                                </ul>
                                
                                <p>Ainda temos <span>8</span> peças desse tamanho escolhido em nosso estoque!</p>
                            </div>

                            <div className={styles.quantityDiv}>
                                <h3>Quantidade:</h3>
                                <div className={styles.manageQuantityDiv}>
                                    <button onClick={decreaseQuantity}><img src={minusSymbol} alt="Símbolo de Subtração" /></button>
                                    <p>{quantity}</p>
                                    <button onClick={increaseQuantity}><img src={plusSymbol} alt="Símbolo de Adição" /></button>
                                </div>
                            </div>

                            <div className={styles.shopFavDiv}>
                                <button className={styles.addCartBtn}>ADICIONAR AO CARRINHO</button>
                                
                                {/* Ainda falta implementar a Troca de Imagens */}

                                    <label style={{cursor: "pointer"}}>

                                        <input
                                            onChange={handleLike} checked={liked} type="checkbox" style={{display: "none", backgroundColor: "transparent"}} className={styles.favBtn}
                                        />
                                            
                                        <img src={liked ? likeOn : favSymbol} alt="Botão de favoritar"/>
                    
                                    </label>
                            </div>
                            
                        </div>
                    </div>
                    
                    <ul className={styles.categoriesList}>
                        {/* Possivelmente um Componente */}
                        <figure className={styles.categorieItem}>
                            
                            <img src="src/assets/Property 1=Inverno.png" alt="Símbolo de Categorização" />
                    
                        </figure>

                        <figure className={styles.categorieItem}>
                                
                            <img src="src/assets/Property 1=Masculino.png" alt="Símbolo de Categorização" />
        
                            
                        </figure>

                        <figure className={styles.categorieItem}>
                           
                            <img src="src/assets/Property 1=Adulto.png" alt="Símbolo de Categorização" />
            
                        </figure>
                    </ul>
                    
                
                </section>

                <section className={styles.pijamaDetails}>
                    <h3>SOBRE NOSSO PIJAMA</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium perspiciatis perferendis totam debitis inventore blanditiis, sit molestias quisquam dolore vel provident maxime doloribus quo alias expedita culpa neque eos delectus.</p>
                    
                    <div className={styles.pijamaListDetails}>
                        <h4>Contém:</h4>
                        <ul>
                            <li>Uma blusa de mangas longas na cor azul petróleo com estampa poá branca.</li>
                            <li>Uma calça na cor azul petróleo com estampa poá branca</li>
                        </ul>
                    </div>
                    
                    <div className={styles.pijamaListDetails}>
                        <h4>Composição:</h4>
                        <ul>
                            <li>100% algodão</li>
                        </ul>
                    </div>
                
                </section>


            </main>
        </>
    )
} 