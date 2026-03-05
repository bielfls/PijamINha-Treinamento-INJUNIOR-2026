import styles from './styles.module.css'
import arrowLeft from '../../assets/LeftArrowWhite.png'
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


const payFormSchema = z
    .object({
        // paymentMethod: z.enum(["cartao", "pix"], {
        //   errorMap: () => ({ message: "Selecione a forma de pagamento" })
        // }),
        paymentMethod: z.enum(["cartao", "pix"], "Selecione uma forma de pagamento"),

        installments: z.string().optional(),

        cardNumber: z
        .string()
        .transform((value) => value.replace(/\D/g, ""))  // Remove caracteres não numéricos
        .optional(),
    })

    // refine() para validar parcelas
    .refine(
        (data) => {
                if (data.paymentMethod === "cartao") {
                    return data.installments && data.installments !== "";
                }
                
                // Se paymentMethod !== "cartao", não é necessário validar o número do cartão
                return true;
            },
            {
                message: "Selecione o número de parcelas",
                path: ["installments"],
            }
    )

    // refine() para validar cartão
    .refine(
        (data) => {
            if (data.paymentMethod === "cartao") {
                return data.cardNumber && data.cardNumber.length >= 13;
            }
            
            // Se paymentMethod !== "cartao", não é necessário validar o número do cartão
            return true;
        },
        {
            message: "Digite um número de cartão válido",
            path: ["cardNumber"],
        }
    );

type PayingUser = z.infer<typeof payFormSchema>

export default function PayFormCart({nextStep , backStep}: {nextStep: () => void, backStep: () => void}) {

    // const [paymentMethod, setPaymentMethod] = useState<string>('');
    // const [installments, setInstallments] = useState<string>('');
    // const [cardNumber, setCardNumber] = useState<string>('');

    // function selectPaymentMethodChange(e: React.ChangeEvent<HTMLSelectElement>) {
    //     console.log(e.target.value)
    //     setPaymentMethod(e.target.value);
    // }

    // function selectInstallmentsChange(e: React.ChangeEvent<HTMLSelectElement>) {
    //     console.log(e.target.value)
    //     setInstallments(e.target.value);
    // }

    // function selectCardNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    //     setCardNumber(e.target.value);
    // }

    const { 
            register,
            watch,
            handleSubmit,
            reset, 
            formState:{errors, isSubmitting},
            setError 
            
    } = useForm<PayingUser>({ resolver: zodResolver(payFormSchema)});

    const paymentMethod = watch("paymentMethod");

    async function submitPayForm(data: PayingUser) {
        try{

            await new Promise(resolve => setTimeout(resolve,2000))
            console.log(data)
            nextStep()
        
        } catch {
            setError('root', {
                message:"Erro ao submeter os dados"
            })
        }
        reset()
    }

    return (
        <form className={styles.payForm} onSubmit={handleSubmit(submitPayForm)}>
            <h1>Pagamento</h1>
            
            <div className={styles.paymentInfo}>

                <select 
                    className={styles.select} 
                    defaultValue={""}
                    {...register('paymentMethod')}
                >
                    
                    <option value="" disabled>Forma de pagamento</option>
                    <option value="cartao">Cartão de Crédito</option>
                    <option value="pix">Pix</option>
                
                </select>

                {paymentMethod !== 'pix' && (
                            <select
                                className={styles.select}
                                defaultValue={""}
                                {...register('installments')}
                            >
                                
                                <option value="" disabled>Parcelas</option>

                                <option value={1}>Parcelar em 1x</option>
                                <option value={2}>Parcelar em 2x</option>
                                <option value={3}>Parcelar em 3x</option>
                                <option value={4}>Parcelar em 4x</option>
                                <option value={5}>Parcelar em 5x</option>
                                <option value={6}>Parcelar em 6x</option>
                            
                            </select>
                        )
                }
                
                {paymentMethod !== 'pix' && (
                        <input type="number" className={styles.numberCardInput} placeholder="Número do cartão" {...register('cardNumber')} />
                    )
                }
            
            </div>

            <div className={styles.errorGroup}>
                  {errors.paymentMethod && <p className={styles.error}>{errors.paymentMethod.message}</p>} 
                  {errors.installments && <p className={styles.error}>{errors.installments.message}</p>} 
                  {errors.cardNumber && <p className={styles.error}>{errors.cardNumber.message}</p>} 
            </div>

            <div className={styles.payBtns}>
                    
                <button className={styles.backBtn} onClick={backStep}>
                    <img src={arrowLeft} alt="Seta esquerda" />
                    <p>VOLTAR</p>
                </button>
                
                <button className={styles.sendBtn} disabled={isSubmitting} type="submit">
                    {isSubmitting ? "ENVIANDO.." : "ENVIAR"}
                </button>
            
            </div>
            
        
        </form>
    )
}