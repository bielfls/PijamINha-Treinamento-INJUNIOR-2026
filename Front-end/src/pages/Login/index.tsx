import LoginForm from '../../components/LoginForm'
import style from './styles.module.css' 
export default function Login(){
    return(
        <section className={style.screen}>
            <LoginForm />
        </section>
    )
}