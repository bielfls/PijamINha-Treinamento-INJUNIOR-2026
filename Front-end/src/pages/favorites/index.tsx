import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import cart from "../../assets/cartfav.png";
import favorite from "../../assets/favoritedFav.png";
import coracaofav from "../../assets/coracaofav.png";
import setadir from "../../assets/setadir.png";
import setaesq from "../../assets/setaesq.png";
import pijama from "../../assets/pijama1.jpg";
import fundo from "../../assets/backgroundfav.png";
import styles from "./console.module.css";

// Interface para tipagem
interface Item {
  id: number;
  nome: string;
  preco: string;
  img: string;
}

const initialItems: Item[] = [
  { id: 1, nome: "Pijama Feminino Longo - Estampa Poá", preco: "R$ 78,90", img: pijama },
  { id: 2, nome: "Pijama Feminino Longo - Estampa Poá", preco: "R$ 78,90", img: pijama },
  { id: 3, nome: "Pijama Feminino Longo - Estampa Poá", preco: "R$ 78,90", img: pijama },
  { id: 4, nome: "Pijama Feminino Longo - Estampa Poá", preco: "R$ 78,90", img: pijama },
  { id: 5, nome: "Pijama Feminino Longo - Estampa Poá", preco: "R$ 78,90", img: pijama },
  { id: 6, nome: "Pijama Feminino Longo - Estampa Poá", preco: "R$ 78,90", img: pijama },
  { id: 7, nome: "Pijama Feminino Longo - Estampa Poá", preco: "R$ 78,90", img: pijama },
  { id: 8, nome: "Pijama Feminino Longo - Estampa Poá", preco: "R$ 78,90", img: pijama },
];

export default function Favorites() {
  const carrosselRef = useRef<HTMLDivElement>(null);
  const [itens, setItens] = useState<Item[]>(() => {
    const savedItems = localStorage.getItem("@App:favoritos");
    return savedItems ? JSON.parse(savedItems) : initialItems;
  });

  useEffect(() => {
    localStorage.setItem("@App:favoritos", JSON.stringify(itens));
  }, [itens]);

  const removerFavorito = (id: number) => {
    const novaLista = itens.filter((item) => item.id !== id);
    setItens(novaLista);
  };

  const scrollLeft = () => {
    carrosselRef.current?.scrollBy({ left: -220, behavior: "smooth" });
  };

  const scrollRight = () => {
    carrosselRef.current?.scrollBy({ left: 220, behavior: "smooth" });
  };

  return (
    <>
      <div className={styles.botoes}>
        <div className={styles.botaoItem}>
          <Link to="#" className={styles.cartLink}>
            <img src={cart} alt="carrinho" className={styles.cart} />
          </Link>
          <p className={styles.cartText}>Carrinho</p>
        </div>

        <div className={styles.botaoItem}>
          <Link to="#" className={styles.favLink}>
            <img src={favorite} alt="coração" className={styles.fav} />
          </Link>
          <p className={styles.favText}>Favoritos ({itens.length})</p>
        </div>
      </div>

      <div className={styles.carrosselWrapper}>
        <img src={fundo} alt="background" className={styles.background} />
        
        {itens.length > 0 && (
          <button className={styles.arrowBtn} onClick={scrollLeft}>
            <img src={setaesq} alt="anterior" className={styles.arrowImg} />
          </button>
        )}

        <section className={styles.carrossel} ref={carrosselRef}>
          {itens.length > 0 ? (
            itens.map((item) => (
              <div key={item.id} className={styles.card}>
                <button
                  className={styles.heart}
                  onClick={() => removerFavorito(item.id)}
                >
                  <img src={coracaofav} alt="remover favorito" className={styles.heartImg} />
                </button>

                <img src={item.img} alt={item.nome} className={styles.cardImg} />
                <div className={styles.cardInfo}>
                  <p className={styles.cardNome}>{item.nome}</p>
                  <p className={styles.cardPreco}>{item.preco}</p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyContainer}>
               <p className={styles.emptyMsg}>Você ainda não tem favoritos.</p>
            </div>
          )}
        </section>

        {itens.length > 0 && (
          <button className={styles.arrowBtn} onClick={scrollRight}>
            <img src={setadir} alt="próximo" className={styles.arrowImg} />
          </button>
        )}
      </div>
    </>
  );
}