import { Link } from "react-router-dom";
import { useRef} from "react";
import cart from "../../assets/cartfav.png";
import favorite from "../../assets/favoritedFav.png";
import coracaofav from "../../assets/coracaofav.png";
import setadir from "../../assets/setadir.png";
import setaesq from "../../assets/setaesq.png";
import fundo from "../../assets/backgroundfav.png";
import styles from "./console.module.css";
import { useRenderFavorites } from "../../hooks/use-renderFavorites";
import { removePijama } from "../../hooks/use-removeFavorite";

// Interface para tipagem
interface Item {
  id: number;
  nome: string;
  preco: string;
  img: string;
}


export default function Favorites() {
 
  const{data: items, isPending, isError} = useRenderFavorites()
  const carrosselRef = useRef<HTMLDivElement>(null)
  const {removeFavPajama} = removePijama()




  const scrollLeft = () => {
    carrosselRef.current?.scrollBy({ left: -220, behavior: "smooth" });
  };

  const scrollRight = () => {
    carrosselRef.current?.scrollBy({ left: 220, behavior: "smooth" });
  };

  return (

    // <div className={styles.botoes}>
    //     <div className={styles.botaoItem}>
    //       <Link to="#" className={styles.cartLink}>
    //         <img src={cart} alt="carrinho" className={styles.cart} />
    //       </Link>
    //       <p className={styles.cartText}>Carrinho</p>
    //     </div>

    //     <div className={styles.botaoItem}>
    //       <Link to="#" className={styles.favLink}>
    //         <img src={favorite} alt="coração" className={styles.fav} />
    //       </Link>
    //       <p className={styles.favText}>Favoritos ({itens.length})</p>
    //     </div>
    //   </div>
    <>
      <section className={styles.cartTitles}>
              <Link to="/cartPage">
                <div className={styles.titleContainer}>
                    <figure>
                        <img src={cart} alt="Símbolo de carrinho de compras" />
                    </figure>
                    
                    <h1 className={styles.cartTitle}>Carrinho</h1>
                </div>
              </Link>
          
              <div className={styles.titleContainer}>
                  <figure>
                      <img src={favorite} alt="Símbolo de favorito" />
                  </figure>
                  
                  <h1 className={styles.favTitle}>Favoritos ({items?.length ?? 0})</h1>
              </div>
          
        </section>

      <div className={styles.carrosselWrapper}>
        <img src={fundo} alt="background" className={styles.background} />
        
          {isPending && <p>Carregando...</p>}
          {isError && <p>Erro ao carregar favoritos.</p>}


        { items && items.length > 0 && (
          <button className={styles.arrowBtn} onClick={scrollLeft}>
            <img src={setaesq} alt="anterior" className={styles.arrowImg} />
          </button>
        )}

        <section className={styles.carrossel} ref={carrosselRef}>
          {items && items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className={styles.card}>
                <button
                  className={styles.heart}
                  onClick={() => removeFavPajama(item.id)}
                >
                  <img src={coracaofav} alt="remover favorito" className={styles.heartImg} />
                </button>

                <img src={item.image} alt={item.name} className={styles.cardImg} />
                <div className={styles.cardInfo}>
                  <p className={styles.cardNome}>{item.name}</p>
                  <p className={styles.cardPreco}> R$ {item.price}</p>
                </div>
              </div>
            ))
          ) : (
            !isPending &&(
              <div className={styles.emptyContainer}>
                <p className={styles.emptyMsg}>Você ainda não tem favoritos.</p>
              </div>
            )
          )}
        </section>

        {items && items.length > 0 && (
          <button className={styles.arrowBtn} onClick={scrollRight}>
            <img src={setadir} alt="próximo" className={styles.arrowImg} />
          </button>
        )}
      </div>
    </>
  );
}