import {Link} from "react-router-dom"
import style from "./style.module.css"
import logo from "../../assets/Logo.svg"
import cart from "../../assets/Compras.svg"
import like from "../../assets/Favorito.svg"
import user from "../../assets/User.svg"


export default function Header(){
    return(
        <div className={style.headerContainer}>
            <Link to="/home" className={style.imgContainer}>
                <img src={logo} alt="Logo" />
            </Link>
            <div className={style.linksContainer}>
                <Link className={style.link} to="/pijamas">PIJAMAS</Link>
                <Link className={style.link} to="/feminino">FEMININO</Link>
                <Link className={style.link} to="/masculino">MASCULINO</Link>
                <Link className={style.link} to="/infantil">INFANTIL</Link>
            </div>
            <div className={style.userSection}>
                <div className={style.cartLike}>
                    <Link to="/carrinho">
                        <img src={cart} alt="carrinho" />
                    </Link>
                    <Link to="/curtidos">
                        <img src={like} alt="curtidos" />
                    </Link>
                </div>
                <div className={style.User}>
                    <Link to="/userPage">
                        <img src={user} alt="user" />
                    </Link>
                </div>
            </div>
        </div>
    )
}