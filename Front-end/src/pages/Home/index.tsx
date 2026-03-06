import styles from "./console.module.css"
import Carousel from "../../components/Carrossel";
import logo from "../../assets/logohome.png";
import background from "../../assets/background.png";
import background2 from "../../assets/background2.png";
import caminhao from "../../assets/truckicon.png";
import pessoas from "../../assets/pessoasicon.png";
import pijama from "../../assets/pijamaicon.png";
import DiscountProductCard from "../../components/DiscountProductCard/discountProductCard";
import { useRef } from "react";
import FeedbackCard from "../../components/FeedbackCards";
import setaesq from "../../assets/setaesq.png";
import setadir from "../../assets/setadir.png";
import { Link } from "react-router-dom";
import { useGetPromoProducts } from "../../hooks/use-homepjs";
import { useGetFeedbacks } from "../../hooks/use-feedbackshome";


export default function Home() {
const { data: feedbackData, isPending: isFeedbackLoading, isError: isFeedbackError} = useGetFeedbacks();
const feedbackRef = useRef<HTMLDivElement>(null);

const scroll = (direction: number) => {
  if (!feedbackRef.current) return;

  const scrollAmount = 1300; // valor fixo para garantir 3 cards rolando
  feedbackRef.current.scrollBy({
    left: scrollAmount * direction,
    behavior: "smooth",
  });
};
const { data: promoProducts, isPending: isLoading, isError } = useGetPromoProducts();

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <img src={background} alt="background" className={styles.background} />
        <img src={logo} alt="Pijaminha Logo" className={styles.logo} />
        <p>
          Se os bebês soubessem desse conforto, <br />
          nem sopravam casas, iam dormir!
        </p>
      </section>

      <section className={styles.carouselSection}>
        <Carousel />
      </section>
      <section className={styles.icones}>
<img src={background2} alt="background" className={styles.iconesBg} />
  <div className={styles.iconeItem}>
    <img src={pijama} alt="ícone de Pijamas" />
    <p>Pijamas confortáveis e com tecnologia</p>
  </div>
  <div className={styles.iconeItem}>
    <img src={pessoas} alt="ícone de pessoas" />
    <p>Modelos para todas as idades e tamanhos</p>
  </div>
  <div className={styles.iconeItem}>
    <img src={caminhao} alt="ícone de caminhao" />
    <p>Frete grátis em todo o Brasil e exterior</p>
  </div>
</section>
<section className={styles.promos}>
  <img src={background2} alt="background" className={styles.feedbackBg} />
  <div className={styles.products}>
  {isLoading ? (
    <p>Carregando ofertas exclusivas...</p>
  ) : isError ? (
    <p>Erro ao carregar produtos.</p>
  ) : (
    promoProducts?.map((pijama) => (
      <Link 
        to={`/product/${pijama.id}`} 
        key={pijama.id} 
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
      <DiscountProductCard 
        key={pijama.id} 
        id={pijama.id}
        name={pijama.name}
        image={pijama.image}
        price={pijama.price}
        onSale={pijama.onSale}
        salePercent={pijama.salePercent}
      />
      </Link>
    ))
  )}
  </div>
</section>
<section className={styles.feedbackSection}>
        <img src={background2} alt="background" className={styles.feedbackBg} />
        <p className={styles.textoFeed}>Feedbacks</p>
        <div className={styles.feedbackContainer}> 
          <div className={styles.feedbackTrack} ref={feedbackRef}>
  {isFeedbackLoading ? (
    <p>Carregando depoimentos...</p>
  ) : isFeedbackError ? (
    <p>Não foi possível carregar os feedbacks.</p>
  ) : (
    feedbackData.map((f) => (
      <FeedbackCard 
        name={f.name} 
        rating={f.rating} 
        description={f.description}
      />
    ))
  )}
</div>
        <button
            className={`${styles.feedbackArrow} ${styles.feedbackLeft}`}
            onClick={() => scroll(-1)}
        >
        <img src={setaesq} alt="anterior" />
        </button>

        <button
        className={`${styles.feedbackArrow} ${styles.feedbackRight}`}
        onClick={() => scroll(1)}>
        <img src={setadir} alt="próximo" />
        </button>
 </div> 
    <div className={styles.feedbackBtn}>
        <Link to="feedback" className={styles.feedbackLink}>Também quero dar um feedback!</Link>
</div>
      </section>
    </main>
  );
}

