import { useForm } from 'react-hook-form'
import style from './styles.module.css'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useRegister } from '../../hooks/use-register'
import type { RegisterRequest } from '../../types/auth'

const accountSchema = z.object({
    name:z.string().nonempty('Insira seu nome').regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,'O nome não pode conter números'),
    username:z.string().nonempty('Insira seu username').regex(/^[A-Za-z0-9._\-!@#$]+$/,'O user name não pode conter acentos e(ou) espaços'),
    email:z.string().nonempty('Insira seu email').email('Insira um endereço de email válido'),
    password: z.string().nonempty('Insira sua senha').min(6,'A senha dev ter no mínimo 6 caracteres').regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9._\-!@#$]+$/,'A senha não pode conter espaços'),
    confirmPassword:z.string().nonempty('A confirmação deve ser preenchida'),
}).refine(data => data.password === data.confirmPassword,{
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
} )
type FormValues = z.infer<typeof accountSchema>;
export default function RegisterForm(){
    const navigate = useNavigate()
    const { execute: createUser, error, isPending, isError } = useRegister({
        onSuccess: () => {
            navigate('/login')
        },
        onError: ({ message }) => {
            console.log(message);
        }
    })
    
    const { register, handleSubmit, reset, formState:{errors, isSubmitting},setError } = useForm<FormValues>({
        resolver: zodResolver(accountSchema)
    })
    
      const onSubmit = (data: FormValues) =>{
        const { confirmPassword, ...payload } = data;
        createUser(payload)
      } 
       let errorMessage = "";
        if (isError && error) {
        const backendMessage = (error as any).message;
          switch (backendMessage) {
      
        case "Dados de registro inválidos!": 
            errorMessage = "Insira as informações corretas";
            break;
            
        case "O item já existe no sistema!":
            errorMessage = "Usuário já cadastrado. Tente novamente";
            break;

        default:
           
            errorMessage = backendMessage || "Erro ao realizar cadastro";
            break;
        }
    }
  
    return(
        <div className={style.load}>
            <div className={style.box}>
                <h1>Registre-se</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.boxtwo}>
                <input 
                    className={style.info}
                    placeholder="Nome"
                    type='text'
                    {... register('name')}
                />
                 {errors.name && <span className={style.error}>{errors.name.message}</span>}
                <input
                    className={style.info}
                    placeholder="Nome de usuário"
                    type='text'
                    {... register('username')}
                />
                {errors.username && <span className={style.error}>{errors.username.message}</span>}

                <input 
                    className={style.info}
                    placeholder="E-mail"
                    type='email'
                    {... register('email')}
                />
                {errors.email && <span className={style.error}>{errors.email.message}</span>}

                <input
                    className={style.info}
                    placeholder="Senha"
                    type='password'
                    {... register('password')}
                />
                {errors.password && <span  className={style.error}>{errors.password.message}</span>}

                <input
                    className={style.info}
                    placeholder="Confirmar senha"
                    type='password'
                    {... register('confirmPassword')}
                />
                 {errors.confirmPassword && <span  className={style.error}>{errors.confirmPassword.message}</span>}

                </div>
                <div className={style.buttons}>
                    <button type='submit' disabled={isPending} className={style.signe}>{isPending?'Registrando...':'Registrar'}
                    </button>
                    {isError && <span  className={style.error}>{errorMessage}</span>}
                </div>
            </form>

        </div>
    )
}