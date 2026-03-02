import FeedbackForm from '../../components/FeedbackForm'
import style from './styles.module.css' 
export default function Feedback(){
    return(
        <section className={style.screen}>
            <FeedbackForm />
        </section>
    )
}