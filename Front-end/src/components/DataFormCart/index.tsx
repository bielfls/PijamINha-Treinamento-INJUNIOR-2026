import z from "zod";
import cpf from "cpf"
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const dataFormSchema = z.object({
  nome: z
    .string()
    .nonempty("Nome é obrigatório.")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Nome não pode conter números"),

  cpf: z
    .string()
    .nonempty("CPF é obrigatório.")
    .transform(value => value.replace(/\D/g, "")) // Remove caracteres não numéricos
    .refine(value => cpf.isValid(value), {
      message: "CPF inválido"
    }),

  cep: z
    .string()
    .nonempty("CEP é obrigatório.")
    .transform(value => value.replace(/\D/g, "")) // Remove caracteres não numéricos
    .refine(value => /^[0-9]{8}$/.test(value), {
      message: "CEP inválido"
    }),

  logradouro: z
    .string()
    .nonempty("Logradouro é obrigatório."),

  uf: z
    .string()
    .nonempty("UF é obrigatória.")
    .length(2, "UF deve ter 2 caracteres.")
    .regex(/^[A-Za-z]+$/, "UF não pode conter números.")
    .transform(val => val.toUpperCase()),

  cidade: z
    .string()
    .nonempty("Cidade é obrigatória.")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Cidade não pode conter números."),

  numero: z
    .string()
    .nonempty("Número é obrigatório.")
    .regex(/^[0-9]+$/, "Número deve conter apenas números."),

  bairro: z
    .string()
    .nonempty("Bairro é obrigatório.")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Bairro não pode conter números.")
});

type CartingUser = z.infer<typeof dataFormSchema>

export default function DataFormCart({nextStep, onSaveData}: {nextStep: () => void, onSaveData: (data: CartingUser) => void }) {

    const { 
        register, 
        handleSubmit,
        reset, 
        formState:{errors, isSubmitting},
        setError 
        
    } = useForm<CartingUser>({ resolver: zodResolver(dataFormSchema)});

    async function submitDataForm(data: CartingUser) {
        try{
            onSaveData(data)
            nextStep()
        
        } catch {
            setError('root', {
                message:"Erro ao submeter os dados"
            })
        }
    }

    return (
        <form className={styles.dataForm} onSubmit={handleSubmit(submitDataForm)}>
            <h1>Dados</h1>
            
            <div className={styles.dataInputs}>
                <input type="text" className={styles.entireInput} placeholder="Nome Completo" {...register('nome')}/>
                
                
                <input type="text" className={styles.entireInput} placeholder="CPF" {...register('cpf')}/>
                
                
                <input type="text" className={styles.entireInput} placeholder="CEP" {...register('cep')}/>
                
                
                <input type="text" className={styles.entireInput} placeholder="Logradouro" {...register('logradouro')}/>
                
                
                <div className={styles.inputGroup}>
                    
                    <input type="text" className={styles.littleInput} placeholder="UF" {...register('uf')}/>
                    
                    
                    <input type="text" className={styles.mediumInput} placeholder="Cidade" {...register('cidade')}/>
                    
                
                </div>
                

                <div className={styles.inputGroup}>
                    
                    <input type="number" className={styles.littleInput} placeholder="Número" {...register('numero')}/>
                    
                    
                    <input type="text" className={styles.mediumInput} placeholder="Bairro" {...register('bairro')}/>
                    
                
                </div>

                <div className={styles.errorGroup}>
                  {errors.nome && <p className={styles.error}>{errors.nome.message}</p>} 
                  {errors.cpf && <p className={styles.error}>{errors.cpf.message}</p>} 
                  {errors.cep && <p className={styles.error}>{errors.cep.message}</p>} 
                  {errors.logradouro && <p className={styles.error}>{errors.logradouro.message}</p>} 
                  {errors.uf && <p className={styles.error}>{errors.uf.message}</p>} 
                  {errors.cidade && <p className={styles.error}>{errors.cidade.message}</p>}
                  {errors.numero && <p className={styles.error}>{errors.numero.message}</p>}
                  {errors.bairro && <p className={styles.error}>{errors.bairro.message}</p>}
                </div>

            </div>
            
            <button disabled={isSubmitting} className={styles.btnForm} type="submit">
                {isSubmitting ? "ENVIANDO.." : "ENVIAR"}
            </button>
            {errors.root && <span className={styles.error}>{errors.root.message}</span>}
        
        </form>
    )
}