import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.css"
import plusSymbol from "../../assets/Plus Math.png"
import minusSymbol from "../../assets/Subtract.png"
import favSymbol from "../../assets/Favorito.svg"
import likeOn from "../../assets/Favoritado.svg"
import { useIdPajama } from "../../hooks/use-pajamaId";
import { calculateFinalPrice, calculateInstallmentPrice, calculatePixPrice, formatPrice } from "../../utils/pricesFunctions";
import adultIcon from "../../assets/Property 1=Adulto.png"
import childIcon from "../../assets/Property 1=Infantil.png"
import bothIcon from "../../assets/Property 1=Variant3.png"
import winterIcon from "../../assets/Property 1=Inverno.png"
import summerIcon from "../../assets/Property 1=Verao.png"
import maleIcon from "../../assets/Property 1=Masculino.png"
import femaleIcon from "../../assets/Property 1=Feminino.png"
import unissexIcon from "../../assets/Property 1=Variant4.png"
import familyIcon from "../../assets/Property 1=Familia.png"
import { useFavorite } from "../../hooks/use-favorite";



interface ProductCard{
    id: string,
    image:string,
    name: string,
    price: number,
    parcela: string,
    favorite: boolean
}



const pajamaImages: Record<string, string> = {
  "Adulto": adultIcon,
  "Infantil": childIcon,
  "Ambos": bothIcon,

  "Inverno": winterIcon,
  "Verão": summerIcon,

  "Masculino": maleIcon,
  "Feminino": femaleIcon,
  "Unissex": unissexIcon,
  "Família": familyIcon,
};

function PajamaImage({ categorie } : { categorie: string } ) {
    if (categorie) {
        const image = pajamaImages[categorie];

        if (!image) {
            return <p>Imagem não encontrada</p>;
        }

        return <img src={image} alt="Símbolo de Categorização" />;
    }
}

export default function PijamaPage(props: ProductCard) {
    const sizesText : string[] = ["PP", "P", "M", "G", "GG"]
    const [choosenSize, setChoosenSize] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [liked, setLiked] = useState<boolean>(false)

    const params = useParams()
    const pajamaId = params.id;
    const { data: pajama, isPending, isError} = useIdPajama(pajamaId? pajamaId : ""  );
    console.log("pajamaId: ", pajamaId)
    console.log("pajama: ", pajama)
    console.log("pajama sizes: ", pajama?.sizes)

    const{toggleFavorite} = useFavorite()
    


    function increaseQuantity() {
        if (choosenSize !== '' && quantity < pajama?.sizes.find(s => s.size === choosenSize)?.stockQuantity!) {
            setQuantity(prev => prev + 1);
        }
    }

    function decreaseQuantity() {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    }

    function handleLike(){
        let stateLiked = !liked 
        console.log("liked atual:", liked, "novo estado:", stateLiked)
        setLiked(stateLiked)
        toggleFavorite({id: pajamaId ?? "", favorite: stateLiked })
    }

        useEffect(() => {
        if (pajama) setLiked(pajama.favorite ?? false)
    }, [pajama])

    


    return (
        <>
            <main className={styles.mainPijamaPage}>
                
                <section className={styles.pijamaPage}>
                    <div className={styles.pijamaApresentation}>
                        <figure className={styles.pijamaFigure}>
                            <img src={pajama?.image} alt="Imagem do Pijama" />
                        </figure>
                    
                    
                        <div className={styles.pijamaInfo}>
                            <div className={styles.pijamaTitle}>
                                {isError && <h1>Erro ao carregar Pijama.</h1>}
                                {isPending && <h1>Carregando pijama...</h1>}
                                {pajama && <h1>{pajama?.name}</h1>}
                                <h6>Ref: #123456</h6>
                            </div>
                            
                            <div className={styles.pricesDiv}>
                                <div className={styles.directPrices}>
                                    <p className={styles.normalPrice}>{formatPrice(quantity * calculateFinalPrice(pajama))}</p>
                                    <p className={styles.pixPrice}>Ou por <span>{formatPrice(calculatePixPrice(quantity * calculateFinalPrice(pajama)))}</span> no PIX</p>
                                </div>
                                
                                <p className={styles.partsPrice}>6x de <span>{formatPrice(calculateInstallmentPrice(quantity *calculateFinalPrice(pajama), 6))}</span></p>
                            </div>

                            <div className={styles.sizesDiv}>
                                <h3>Tamanhos:</h3>
                                
                                <ul className={styles.btnSizesList}>
                                    {sizesText.map((size) => 
                                                <button onClick={() => setChoosenSize(size)}
                                                className={size === choosenSize ? styles.choosenSize : styles.nonChoosen}>
                                                    {size}
                                                </button>
                                    
                                            )
                                    }
                                </ul>
                                
                                {(choosenSize !== '') && <p>Ainda temos <span>{pajama?.sizes.find(s => s.size === choosenSize)?.stockQuantity}</span> peças desse tamanho escolhido em nosso estoque!</p>}
                            </div>

                            {(choosenSize !== '') && <div className={styles.quantityDiv}>
                                <h3>Quantidade:</h3>
                                <div className={styles.manageQuantityDiv}>
                                    <button onClick={decreaseQuantity}><img src={minusSymbol} alt="Símbolo de Subtração" /></button>
                                    <p className={styles.quantity}>{quantity}</p>
                                    <button onClick={increaseQuantity}><img src={plusSymbol} alt="Símbolo de Adição" /></button>
                                </div>
                            </div>}

                            <div className={styles.shopFavDiv}>
                                <Link to="/cartPage" className={styles.addCartBtn}>ADICIONAR AO CARRINHO</Link>
                                

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
                            
                            <PajamaImage categorie={pajama ? pajama?.gender :  '' } />
                    
                        </figure>

                        <figure className={styles.categorieItem}>
                                
                            <PajamaImage categorie={pajama ? pajama?.type :  '' } />
        
                            
                        </figure>

                        <figure className={styles.categorieItem}>
                           
                           <PajamaImage categorie={pajama ? pajama?.season :  '' } />
            
                        </figure>
                    </ul>
                    
                
                </section>

                <section className={styles.pijamaDetails}>
                    <h3>SOBRE NOSSO PIJAMA</h3>
                    <p>{pajama?.description}</p>
                    
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
