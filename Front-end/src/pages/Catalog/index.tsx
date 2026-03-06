import styles from "./styles.module.css"
import lupa from "../../assets/lupa.png"
import { useState } from "react"
import { useEffect } from "react"
import {getPijamas} from "../../services/GETpijamas/productService"
import ProductCard from "../../components/ProductCard/productCard"
import { useSearchParams } from "react-router-dom"


interface ProductCard{
    id: string,
    image:string,
    name: string,
    price: number,
    parcela: string,
}


export function Catalog() {
    const[searchParams] = useSearchParams()
    const [gender, setGender] = useState<string>(searchParams.get("gender")|| "Gênero");
    const [type, setType] = useState<string>(searchParams.get("type") || "Tipo");
    const [season, setSeason] = useState<string>(searchParams.get("season") || "Estação");
    const [prod, setProd] = useState<string>('');
    const[pijama, setPijama] = useState<ProductCard[]>([])
    
    useEffect (() =>{

        getPijamas(gender, season, type)
        .then(data => setPijama(data))
        .catch(error => console.error(error))

    }, [gender, season, type])

    useEffect(() => {
        setGender(searchParams.get("gender") || "Gênero" )
        setType(searchParams.get("type") || "Tipo")
        setSeason(searchParams.get("season") || "Estação")
    },[searchParams])


    function selectGender(e: React.ChangeEvent<HTMLSelectElement>) {
        console.log(e.target.value);
        setGender(e.target.value);
    }

    function selectType(e: React.ChangeEvent<HTMLSelectElement>) {
        console.log(e.target.value);
        setType(e.target.value);
    }

    function selectSeason(e: React.ChangeEvent<HTMLSelectElement>) {
        console.log(e.target.value);
        setSeason(e.target.value);
    }

    function handleProdName(e: React.ChangeEvent<HTMLInputElement>) {
        setProd(e.target.value)
    }

    return (

        <>
            <main style={{border: "none"}}>
                <form className={styles.searchForm} >
                    <div className={styles.searchBar}>
                        
                        <input type="text" name="searchPijama" value={prod} onChange={handleProdName} className={styles.searchInput} placeholder="Pesquise pelo produto..."/>
                    
                    
                        <button type="submit">
                            <img src={lupa} alt="Símbolo de Lupa para Busca" />
                        </button>
                    
                    </div>

                    <div className={styles.filtersDiv}>
                        
                        <div className={styles.filter}>
                            <span></span>
                            <select name="Gênero" value={gender} onChange={selectGender}>
                                <option value="Gênero" disabled hidden defaultValue={""}>Gênero</option>
                                <option value="">Todos</option>
                                <option value="Unissex">Unissex</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Família">Família</option>
                            </select>
                        </div>

                        <div className={styles.filter}>
                            <span></span>
                            <select name="Tipo" value={type} onChange={selectType}>
                                <option value="Tipo" disabled hidden defaultValue={""}>Tipo</option>
                                <option value="">Todos</option>
                                <option value="Adulto">Adulto</option>
                                <option value="Infantil">Infantil</option>
                            </select>
                        </div>

                        <div className={styles.filter}>
                            <span></span>
                            <select name="Estação" value={season} onChange={selectSeason}>
                                <option value="Estação" disabled hidden defaultValue={""}>Estação</option>
                                <option value="">Todos</option>
                                <option value="Verão">Verão</option>
                                <option value="Inverno">Inverno</option>
                            </select>
                        </div>

                    </div>
                                
                </form>
                <section className={styles.pijamasSection}>
                    <ul className={styles.pijamasList}>

                        {pijama.map(item => (
                            <ProductCard
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                price={item.price}
                                parcela={item.parcela}
                            />
                        ))}

<<<<<<< HEAD
                        {/* Essas Divs são apenas Placeholders */}


=======
>>>>>>> 829224035304af32b431b257508dd66d0925fb03

                    </ul>
                    
                    {/* Possível Componente */}
                    <nav>
                        <ul></ul>
                    </nav>
                </section>
            </main>
        </>
    )
}
