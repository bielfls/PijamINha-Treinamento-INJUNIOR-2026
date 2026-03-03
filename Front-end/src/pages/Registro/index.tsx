import RegisterForm from '../../components/RegisterForm'
import style from './styles.module.css' 
export default function Login(){
    return(
        <section className={style.screen}>
            <RegisterForm />
        </section>
    )
}