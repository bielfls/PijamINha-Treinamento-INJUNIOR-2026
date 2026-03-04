import z from "zod";
import cpf from "cpf"
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const dataFormSchema = z.object({
  nome: z
    .string()
    .nonempty("Nome é obrigatório")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Nome não pode conter números"),

  cpf: z
    .string()
    .nonempty("CPF é obrigatório")
    .transform(value => value.replace(/\D/g, "")) // Remove caracteres não numéricos
    .refine(value => cpf.isValid(value), {
      message: "CPF inválido"
    }),

  cep: z
    .string()
    .nonempty("CEP é obrigatório")
    .transform(value => value.replace(/\D/g, "")) // Remove caracteres não numéricos
    .refine(value => /^[0-9]{8}$/.test(value), {
      message: "CEP inválido"
    }),

  logradouro: z
    .string()
    .nonempty("Logradouro é obrigatório"),

  uf: z
    .string()
    .nonempty("UF é obrigatória")
    .length(2, "UF deve ter 2 caracteres")
    .regex(/^[A-Za-z]+$/, "UF não pode conter números")
    .transform(val => val.toUpperCase()),

  cidade: z
    .string()
    .nonempty("Cidade é obrigatória")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Cidade não pode conter números"),

  numero: z
    .string()
    .nonempty("Número é obrigatório")
    .regex(/^[0-9]+$/, "Número deve conter apenas números"),

  bairro: z
    .string()
    .nonempty("Bairro é obrigatório")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Bairro não pode conter números")
});

type CartingUser = z.infer<typeof dataFormSchema>

export default function DataFormCart() {

    const { 
        register, 
        handleSubmit,
        reset, 
        formState:{errors, isSubmitting},
        setError 
        
    } = useForm<CartingUser>({ resolver: zodResolver(dataFormSchema)});

    async function submitData(data: CartingUser) {
        try{

            await new Promise(resolve => setTimeout(resolve,2000))
            console.log(data)
        
        } catch {
            setError('root', {
                message:"Erro ao submeter os dados"
            })
        }
        reset()
    }

    return (
        <form className={styles.dataForm} onSubmit={handleSubmit(submitData)}>
            <h1>Dados</h1>
            
            <div className={styles.dataInputs}>
                <input type="text" className={styles.entireInput} placeholder="Nome Completo" {...register('nome')}/>
                {errors.nome && <span className={styles.error}>{errors.nome.message}</span>}
                
                <input type="text" className={styles.entireInput} placeholder="CPF" {...register('cpf')}/>
                {errors.cpf && <span className={styles.error}>{errors.cpf.message}</span>}
                
                <input type="text" className={styles.entireInput} placeholder="CEP" {...register('cep')}/>
                {errors.cep && <span className={styles.error}>{errors.cep.message}</span>}
                
                <input type="text" className={styles.entireInput} placeholder="Logradouro" {...register('logradouro')}/>
                {errors.logradouro && <span className={styles.error}>{errors.logradouro.message}</span>}
                
                <div className={styles.inputGroup}>
                    
                    <input type="text" className={styles.littleInput} placeholder="UF" {...register('uf')}/>
                    
                    
                    <input type="text" className={styles.mediumInput} placeholder="Cidade" {...register('cidade')}/>
                    
                
                </div>
                {errors.uf && <span className={styles.error}>{errors.uf.message}</span>}
                {errors.cidade && <span className={styles.error}>{errors.cidade.message}</span>}

                <div className={styles.inputGroup}>
                    
                    <input type="number" className={styles.littleInput} placeholder="Número" {...register('numero')}/>
                    
                    
                    <input type="text" className={styles.mediumInput} placeholder="Bairro" {...register('bairro')}/>
                    
                
                </div>
                {errors.numero && <span className={styles.error}>{errors.numero.message}</span>}
                {errors.bairro && <span className={styles.error}>{errors.bairro.message}</span>}
            
            </div>
            
            <button disabled={isSubmitting} className={styles.btnForm}>
                {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
            {errors.root && <span className={styles.error}>{errors.root.message}</span>}
        
        </form>
    )
}