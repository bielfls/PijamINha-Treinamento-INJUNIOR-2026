import { useNavigate } from 'react-router-dom'
import style from './styles.module.css'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin } from '../../hooks/use-login'
import type { LoginRequest } from '../../types/auth'
import { useState } from 'react'

export const userSchema = z.object({
    email: z.string().nonempty('Nome ou email devem ser preenchidos').refine(value=>{return  z.string().email().safeParse(value).success||z.string().regex(/^[a-zA-Z0-9]+$/).safeParse(value).success},{ message: 'O nome não pode conter acentos e(ou)espaços'}),
    password: z.string().nonempty('Insira sua senha').min(6,'A senha dev ter no mínimo 6 caracteres'),
})


export default function LoginForm(){
    const [vision,setVision] = useState(false);
    const navigate = useNavigate()
    const { execute: enterUser, error, isPending } = useLogin({
            onSuccess: () => {
                localStorage.setItem("isAuthenticated", "true")
                localStorage.setItem("userRole", "Logged")
                navigate("/")        

            },
            onError: ({ message }) => {
                console.log(message);
            }
        })
        function handleClick(){
            navigate("/register")
        }
        const { register, handleSubmit, reset, formState:{errors, isSubmitting},setError } = useForm<LoginRequest>({
            resolver: zodResolver(userSchema)
        })
        
        const onSubmit = (data: LoginRequest) => enterUser(data);

       
    
    
    return(
        <div className={style.load}>
            <div className={style.box}>
                <h1>Login</h1>
                <p>Faça login para ter acesso aos pijamas dos seus <span>sonhos!</span></p>
            </div>
            <form className={style.boxtwo} onSubmit={handleSubmit(onSubmit)}>
                <input 
                    className={style.info}
                    placeholder="Usuario ou E-mail"
                    type='text'
                    {... register('email')}
                />
                {errors.email && <span className={style.error}>{errors.email.message}</span>}
                <div className={style.info}>
                    <input
                    className={style.info2}
                    placeholder="Senha"
                    type={vision?'text':'password'}
                    {... register('password')}
                    />                    
                    <input 
                    type='checkbox'
                    className={style.eyecheck}
                    id='see'
                    onChange={(e)=> setVision(e.target.checked)}
                    />
                    <label htmlFor='see' className={style.eye} ></label>
                </div>
                <button type='button' className={style.forget}>Esqueci minha senha</button>
                {errors.password && <span className={style.error}>{errors.password.message}</span>}
                <div className={style.buttons}>
                    
                    <button disabled={isPending}className={style.enter}>{isPending? 'Entrando...':'Entrar'}
                    </button>
                    {errors.root && <span className={style.error}>{errors.root.message}</span>}

                    <div className={style.line}> </div>
                    
                    <button type='button' className={style.signe} onClick={handleClick}>Cadastre-se</button>
                
                </div>
            </form>

        </div>
    )
}