import z from 'zod'
import Stars from '../Rating'
import style from './styles.module.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import type { FeedbackRequest } from '../../types/auth'
import { useGiveFeedback } from '../../hooks/use-giv-feedback'
import { useRatingStore } from '../../stores/star'
import { useState } from 'react'

const feedbackSchema = z.object({
    name:z.string().nonempty('Insira seu nome').regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,'O nome não pode conter números e(ou) caractéres especiais'),
    description:z.string().nonempty('Insira seu feedback'),

})

type Feedback = z.infer<typeof feedbackSchema>;

export default function FeedbackForm(){
       const { rating, backRating } = useRatingStore()
       const [ratingError, setRatingError]= useState('')
       const navigate = useNavigate()
       const { execute: feedbackUser, error, isPending, isError } = useGiveFeedback({
               onSuccess: () => {
                   backRating()
                   navigate("/")        
   
               }
           })
           const { register, handleSubmit, reset, formState:{errors, isSubmitting},setError } = useForm<Feedback>({
               resolver: zodResolver(feedbackSchema)
           })
           
           const onSubmit = (data: Feedback) => {
            if(rating===0){
                setRatingError('Insira uma estrela no mínimo')
            return;
            }
            setRatingError('')
            const form: FeedbackRequest = {
                ...data,
                rating: rating
            }
            feedbackUser(form)
           }
        let errorMessage = "";
        if (isError && error) {
               const backendMessage = (error as any).message;
                 switch (backendMessage) {
             
               case "Dados de registro inválidos!": 
                   errorMessage = "Insira as informações corretas";
                   break;
               default:
                  
                   errorMessage = backendMessage || "Erro ao realizar cadastro";
                   break;
               }
           }  
    return(

        <div className={style.load}>
            <div className={style.box}>
                <h1>Feedback</h1>
                <p>Fale um pouco sobre a sua experiência com a nossa loja!</p>
            </div>
            <form className={style.boxtwo} onSubmit={handleSubmit(onSubmit)}>
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
                    {... register('description')}
                
                />
                {errors.description && <span className={style.error}>{errors.description.message}</span>}
                <Stars />
                {ratingError &&  <span className={style.error}>{ratingError}</span>}
                <div className={style.buttons}>
                    <button disabled={isPending}className={style.signe}>{isPending?'Enviando...':'Enviar'}
                    </button>
                    {isError && <span>{errorMessage}</span>}
                </div>
            </form>

        </div>
    )
}