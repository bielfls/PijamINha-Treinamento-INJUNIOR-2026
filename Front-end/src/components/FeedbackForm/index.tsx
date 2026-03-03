import Stars from '../Rating'
import style from './styles.module.css'

export default function FeedbackForm(){
   function handleSubmit(e:React.FormEvent<HTMLFormElement>){
     e.preventDefault()
   }
    return(
        <div className={style.load}>
            <div className={style.box}>
                <h1>Feedback</h1>
                <p>Fale um pouco sobre a sua experiência com a nossa loja!</p>
            </div>
            <form className={style.boxtwo} onSubmit={handleSubmit}>
                <input 
                    className={style.info}
                    placeholder="Nome completo"
                    type='text'
                
                />
                <textarea
                    className={style.info2}
                    placeholder="Descrição detalhada"
                    
                
                />
                <Stars />
                <div className={style.buttons}>
                    <button className={style.signe}>Enviar</button>
                </div>
            </form>

        </div>
    )
}