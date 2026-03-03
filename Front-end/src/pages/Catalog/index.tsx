import styles from "./styles.module.css"
import lupa from "../../assets/lupa.png"
import { useState } from "react"

export function Catalog() {
    const [genre, setGenre] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [season, setSeason] = useState<string>('');

    const [prod, setProd] = useState<string>('');

    function selectGenre(e: React.ChangeEvent<HTMLSelectElement>) {
        console.log(e.target.value);
        setGenre(e.target.value);
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
            <main>
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
                            <select name="Gênero" value={genre} onChange={selectGenre}>
                                <option value="" disabled hidden defaultValue={""}>Gênero</option>
                                <option value="Todos">Todos</option>
                                <option value="Unissex">Unissex</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Família">Família</option>
                            </select>
                        </div>

                        <div className={styles.filter}>
                            <span></span>
                            <select name="Tipo" value={type} onChange={selectType}>
                                <option value="" disabled hidden defaultValue={""}>Tipo</option>
                                <option value="Todos">Todos</option>
                                <option value="Adulto">Adulto</option>
                                <option value="Infantil">Infantil</option>
                            </select>
                        </div>

                        <div className={styles.filter}>
                            <span></span>
                            <select name="Estação" value={season} onChange={selectSeason}>
                                <option value="" disabled hidden defaultValue={""}>Estação</option>
                                <option value="Todos">Todos</option>
                                <option value="Verão">Verão</option>
                                <option value="Inverno">Inverno</option>
                            </select>
                        </div>

                    </div>
                                
                </form>
                <section className={styles.pijamasSection}>
                    <ul className={styles.pijamasList}>

                        {
                            /* Espaço para Função Map com os ItemPijama */
                        }

                        {/* Essas Divs são apenas Placeholders */}

                        <div style={{
                            width: "408px",
                            height: "837px",
                            border: "1px solid black"
                        }}></div>

                        <div style={{
                            width: "408px",
                            height: "837px",
                            border: "1px solid black"
                        }}></div>

                        <div style={{
                            width: "408px",
                            height: "837px",
                            border: "1px solid black"
                        }}></div>

                        <div style={{
                            width: "408px",
                            height: "837px",
                            border: "1px solid black"
                        }}></div>

                        <div style={{
                            width: "408px",
                            height: "837px",
                            border: "1px solid black"
                        }}></div>

                        <div style={{
                            width: "408px",
                            height: "837px",
                            border: "1px solid black"
                        }}></div>

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