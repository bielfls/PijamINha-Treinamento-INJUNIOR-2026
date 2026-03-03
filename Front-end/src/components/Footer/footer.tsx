import style from "./style.module.css"
import watermark from "../../assets/watermark.svg"
import instagram from "../../assets/mdi_instagram.svg"
import facebook from "../../assets/ri_facebook-fill.svg"
import linkedin from "../../assets/ri_linkedin-fill.svg"


export default function Footer(){
    return(
        <div className={style.footer}>
            <div className={style.infoContainer}>
                <div className={style.infos}>
                    <div className={style.cep}>
                        <h3 style={{color: "#4E8098", fontWeight: "500", fontSize: "24px"}}>Endereço</h3>
                        <p style={{color: "#274553", fontSize: "20px", fontWeight: "400"}}>Av. Milton Tavares de Souza, <br/>s/n - Sala 115 B - Boa Viagem,<br/> Niterói - RJ<br/>CEP: 24210-315</p>
                    </div>
                    <div className={style.socials}>
                        <div className={style.texto}>
                            <h3 style={{color: "#4E8098", fontWeight: "500", fontSize: "24px"}}>Fale conosco</h3>
                            <p style={{color: "#274553", fontSize: "20px", fontWeight: "400"}}>Contato@injunior.com.br</p>
                        </div>
                        <div className={style.iconContainer}>
                            <a href="https://www.instagram.com/injunioruff/"><img src={instagram} alt="instagram" /></a>
                            <a href="https://www.facebook.com/injunioruff?_rdc=1&_rdr#"><img src={facebook} alt="facebook" /></a>
                            <a href="https://www.linkedin.com/company/in-junior/"><img src={linkedin} alt="linkedin" /></a>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={watermark} alt="watermark" />
                </div>
                <div className={style.localizacao}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4608.344090673946!2d-43.13596662374335!3d-22.906350637857273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99817ed79f10f3%3A0xb39c7c0639fbc9e8!2sIN%20Junior%20-%20Empresa%20Junior%20de%20Computa%C3%A7%C3%A3o%20da%20UFF!5e1!3m2!1spt-BR!2sbr!4v1772539873594!5m2!1spt-BR!2sbr" width="325" height="244" style={{border: 0}}  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <div className={style.copyRight}></div>
        </div>
    )
}