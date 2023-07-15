import { Link } from 'react-router-dom'
import style from './header.module.scss'

const Nav = () => {
    return (
        <ul className={style.lista}>
            <li>
                <Link to="/imoveis" className={style.menu_link}>Imóveis</Link>
            </li>
            
            <li>
                <Link to="/imovel_cadastro" className={style.menu_link}>Cadastrar imóveis</Link>
            </li>
      
            <li>
                <Link to="/minha_area" className={style.menu_link}>Minha área</Link>
            </li>
            
            <li>
                <Link to="/login" className={style.menu_link}>Entrar</Link>
            </li>
            <li>
                <Link to="/cadastro" className={style.menu_link}>Cadastrar</Link>
            </li>
        </ul>
    )
}

export default Nav