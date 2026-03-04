import styles from './styles.module.css'
import arrowLeft from '../../assets/LeftArrowWhite.png'
import { useState } from 'react';

export default function PayFormCart() {

    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [installments, setInstallments] = useState<string>('');
    const [cardNumber, setCardNumber] = useState<string>('');

    function selectPaymentMethodChange(e: React.ChangeEvent<HTMLSelectElement>) {
        console.log(e.target.value)
        setPaymentMethod(e.target.value);
    }

    function selectInstallmentsChange(e: React.ChangeEvent<HTMLSelectElement>) {
        console.log(e.target.value)
        setInstallments(e.target.value);
    }

    function selectCardNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCardNumber(e.target.value);
    }

    return (
        <form className={styles.payForm}>
            <h1>Pagamento</h1>
            
            <div className={styles.paymentInfo}>

                <select 
                    name="Forma de Pagamento" 
                    className={styles.select} 
                    value={paymentMethod}
                    defaultValue={""} 
                    onChange={selectPaymentMethodChange}
                >
                    
                    <option value="" disabled>Forma de pagamento</option>
                    <option value="cartao">Cartão de Crédito</option>
                    <option value="pix">Pix</option>
                
                </select>

                {paymentMethod !== 'pix' && (
                            <select
                                name="Parcelas"
                                className={styles.select}
                                value={installments}
                                defaultValue={""}
                                onChange={selectInstallmentsChange}
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
                        <input type="number" className={styles.numberCardInput} placeholder="Número do cartão" value={cardNumber} onChange={selectCardNumberChange} required/>
                    )
                }
            
            </div>

            <div className={styles.payBtns}>
                    
                <button className={styles.backBtn}>
                    <img src={arrowLeft} alt="Seta esquerda" />
                    <p>VOLTAR</p>
                </button>
                
                <button className={styles.sendBtn}>ENVIAR</button>
            
            </div>
            
        
        </form>
    )
}