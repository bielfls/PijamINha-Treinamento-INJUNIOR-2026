import { useNavigate } from 'react-router-dom'
import style from './styles.module.css'

export default function LoginForm(){
    const navigate = useNavigate() 
    function handleClick(){
        navigate('/register')
    }
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
                    type='text'
                
                />
                <div className={style.info}>
                    <input
                    className={style.info2}
                    placeholder="Senha"
                    type='password'

                    />
                    
                    <input 
                    type='checkbox'
                    className={style.eyecheck}
                    id='see'
                    />
                    <label htmlFor='see' className={style.eye}></label>
                </div>
                <button className={style.forget}>Esqueci minha senha</button>
                <div className={style.buttons}>
                    <button className={style.enter}>Entrar</button>
                    <div className={style.line}> </div>
                    <button className={style.signe} onClick={handleClick}>Cadastre-se</button>
                </div>
            </form>

        </div>
    )
}