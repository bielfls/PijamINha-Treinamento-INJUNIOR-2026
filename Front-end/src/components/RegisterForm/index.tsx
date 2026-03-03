import style from './styles.module.css'

export default function RegisterForm(){
  
    return(
        <div className={style.load}>
            <div className={style.box}>
                <h1>Registre-se</h1>
            </div>
            <form>
                <div className={style.boxtwo}>
                <input 
                    className={style.info}
                    placeholder="Nome"
                    type='text'
                
                />
                <input
                    className={style.info}
                    placeholder="Nome de usuário"
                    type='text'
                
                />
                <input 
                    className={style.info}
                    placeholder="E-mail"
                    type='email'
                
                />
                <input
                    className={style.info}
                    placeholder="Senha"
                    type='password'
                
                />
                <input
                    className={style.info}
                    placeholder="Confirmar senha"
                    type='password'
                
                />
                </div>
                <div className={style.buttons}>
                    <button className={style.signe}>Registrar</button>
                </div>
            </form>

        </div>
    )
}