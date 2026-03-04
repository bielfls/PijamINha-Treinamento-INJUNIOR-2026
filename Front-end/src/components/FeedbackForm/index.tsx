import z from 'zod'
import Stars from '../Rating'
import style from './styles.module.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const feedbackSchema = z.object({
    name:z.string().nonempty('Insira seu nome').regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$,'O nome não pode conter números e(ou) caractéres especiais'/),
    feedback:z.string().nonempty('Insira seu feedback'),

})

type User = z.infer<typeof feedbackSchema>

export default function FeedbackForm(){
    const navigate = useNavigate()
    const { register, handleSubmit, reset,formState:{errors, isSubmitting},setError } = useForm<User>({
            resolver: zodResolver(feedbackSchema)
        })
    
      async function registerFeedback(data:User){
        try{
        await new Promise(resolve => setTimeout(resolve,2000))
        throw new Error('Erro ao entrar em sua conta ')
        
        }catch{
            setError('root', {
                message:"Erro ao entrar em sua conta"
            })
        }
        reset()
        navigate('/home')

    }
    return(
        <div className={style.load}>
            <div className={style.box}>
                <h1>Feedback</h1>
                <p>Fale um pouco sobre a sua experiência com a nossa loja!</p>
            </div>
            <form className={style.boxtwo} onSubmit={handleSubmit(registerFeedback)}>
                <input 
                    className={style.info}
                    placeholder="Nome completo"
                    type='text'
                     {... register('name')}
                />
                {errors.name && <span className={style.error}>{errors.name.message}</span>}
                <textarea
                    className={style.info2}
                    placeholder="Descrição detalhada"
                    {... register('feedback')}
                
                />
                {errors.feedback && <span className={style.error}>{errors.feedback.message}</span>}
                <Stars />
                <div className={style.buttons}>
                    <button disabled={isSubmitting}className={style.signe}>{isSubmitting?'Enviando...':'Enviar'}
                    </button>
                    {errors.root && <span>{errors.root.message}</span>}
                </div>
            </form>

        </div>
    )
}