import style from './styles.module.css'

export default function FeedbackForm(){
   
    return(
        <div className={style.load}>
            <div className={style.box}>
                <h1>Feedback</h1>
                <p>Fale um pouco sobre a sua experiência com a nossa loja!</p>
            </div>
            <form className={style.boxtwo}>
                <input 
                    className={style.info}
                    placeholder="Nome completo"
                    type='text'
                
                />
                <textarea
                    className={style.info2}
                    placeholder="Descrição detalhada"
                    
                
                />
                <div className={style.buttons}>
                    <button className={style.signe}>Enviar</button>
                </div>
            </form>

        </div>
    )
}