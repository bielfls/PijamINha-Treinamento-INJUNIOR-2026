import { useNavigate } from 'react-router-dom'
import style from './styles.module.css'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const userSchema = z.object({
    emailOrName: z.string().nonempty('Nome ou email devem ser preenchidos').refine(value=> z.string().email().safeParse(value).success||z.string().regex(/^[a-zA-Z0-9\s]+$/, 'O nome não pode conter acentos e(ou)espaços')),
    password: z.string().nonempty('Insira sua senha').min(6,'A senha dev ter no mínimo 6 caracteres'),
})

type User = z.infer<typeof userSchema>


export default function LoginForm(){
    const navigate = useNavigate() 
    const { register, handleSubmit, reset, formState:{errors, isSubmitting},setError } = useForm<User>({
        resolver: zodResolver(userSchema)
    })
    
    function handleClick(){
        navigate('/register')
    }
    
    async function loginUser(data:User){
        try{
        await new Promise(resolve => setTimeout(resolve,2000))
        
            localStorage.setItem("isAuthenticated", "true")
            localStorage.setItem("userRole", "Logged")
            navigate("/")        

        
        }catch{
            setError('root', {
                message:"Erro ao entrar em sua conta"
            })
        }
        reset()



    }
    
    
    return(
        <div className={style.load}>
            <div className={style.box}>
                <h1>Login</h1>
                <p>Faça login para ter acesso aos pijamas dos seus <span>sonhos!</span></p>
            </div>
            <form className={style.boxtwo} onSubmit={handleSubmit(loginUser)}>
                <input 
                    className={style.info}
                    placeholder="Usuario ou E-mail"
                    type='text'
                    {... register('emailOrName')}
                />
                {errors.emailOrName && <span className={style.error}>{errors.emailOrName.message}</span>}
                <div className={style.info}>
                    <input
                    className={style.info2}
                    placeholder="Senha"
                    type='password'
                    {... register('password')}
                    />                    
                    <input 
                    type='checkbox'
                    className={style.eyecheck}
                    id='see'
                    />
                    <label htmlFor='see' className={style.eye}></label>
                </div>
                <button className={style.forget}>Esqueci minha senha</button>
                {errors.password && <span className={style.error}>{errors.password.message}</span>}
                <div className={style.buttons}>
                    
                    <button disabled={isSubmitting}className={style.enter}>{isSubmitting? 'Entrando...':'Entrar'}
                    </button>
                    {errors.root && <span className={style.error}>{errors.root.message}</span>}

                    <div className={style.line}> </div>
                    
                    <button className={style.signe} onClick={handleClick}>Cadastre-se</button>
                
                </div>
            </form>

        </div>
    )
}