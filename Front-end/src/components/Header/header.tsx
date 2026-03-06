import {Link, useNavigate} from "react-router-dom"
import style from "./style.module.css"
import logo from "../../assets/Logo.svg"
import cart from "../../assets/Compras.svg"
import like from "../../assets/like header.svg"
import user from "../../assets/User.svg"


export default function Header(){

    const navigate = useNavigate()

    function resetPage(){
        navigate(`/catalogo?reset=${Date.now()}`)
    }

    return(
        <div className={style.headerContainer}>
            <Link to="/" className={style.imgContainer}>
                <img src={logo} alt="Logo" />
            </Link>
            <div className={style.linksContainer}>
                <a style={{cursor: "pointer"}}className={style.link} onClick={resetPage}>PIJAMAS</a>
                <Link className={style.link} to="/catalogo?gender=Feminino">FEMININO</Link>
                <Link className={style.link} to="/catalogo?gender=Masculino">MASCULINO</Link>
                <Link className={style.link} to="/catalogo?type=Infantil">INFANTIL</Link>
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