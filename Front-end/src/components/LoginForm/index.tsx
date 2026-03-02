import style from './styles.module.css'

export default function LoginForm(){
    return(
        <div className={style.load}>
            <div className={style.box}>
                <h1>Login</h1>
                <p>Faça login para ter acesso aos pijamas dos seus <span>sonhos!</span></p>
            </div>
            <form className={style.boxtwo}>
                <input 
                    className={style.info}
                    placeholder="Usuario ou E-mail"

                
                />
                <input
                    className={style.info}
                    placeholder="Senha"
                
                
                />
                <button className={style.forget}>Esqueci minha senha</button>
                <div className={style.buttons}>
                    <button className={style.enter}>Entrar</button>
                    <div className={style.line}> </div>
                    <button className={style.signe}>Cadastre-se</button>
                </div>
            </form>

        </div>
    )
}