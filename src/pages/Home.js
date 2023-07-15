import { useNavigate } from "react-router-dom"
import classe from './home.module.scss'
import Header from "../components/Header/Header"
function Button (props) {
    let { children } = props
    return <button {...props}>{children}</button>
}

export default function Home () {

    const navigate = useNavigate()

    function cadastrarNovoImovel () {
        return navigate('/imovel_cadastro')    
    }

    function listarImoveis(){
        return navigate('/imoveis')
    }


    return <>
    <Header/>
    <div className={classe.home_container}>
        <div>
            <Button className={classe.btn_home} onClick={() =>cadastrarNovoImovel()}>Cadastre um imóvel</Button>
            <Button className={classe.btn_home} onClick={() => listarImoveis()}>Ver imóveis</Button>
        </div>
    </div>
    </>
}

