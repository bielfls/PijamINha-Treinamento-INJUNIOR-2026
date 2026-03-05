import {Link} from "react-router-dom"
import style from "./style.module.css"
import logo from "../../assets/Logo.svg"
import cart from "../../assets/Compras.svg"
import like from "../../assets/like header.svg"
import user from "../../assets/User.svg"


export default function Header(){
    return(
        <div className={style.headerContainer}>
            <Link to="/" className={style.imgContainer}>
                <img src={logo} alt="Logo" />
            </Link>
            <div className={style.linksContainer}>
                <Link className={style.link} to="/catalogo">PIJAMAS</Link>
                <Link className={style.link} to="/feminino">FEMININO</Link>
                <Link className={style.link} to="/masculino">MASCULINO</Link>
                <Link className={style.link} to="/infantil">INFANTIL</Link>
            </div>
            <div className={style.userSection}>
                <div className={style.cartLike}>
                    <Link to="/cartPage">
                        <img src={cart} alt="carrinho" />
                    </Link>
                    <Link to="/favoritos">
                        <img src={like} alt="curtidos" />
                    </Link>
                </div>
                <div className={style.User}>
                    <Link to="/login">
                        <img src={user} alt="user" />
                    </Link>
                </div>
            </div>
        </div>
    )
}