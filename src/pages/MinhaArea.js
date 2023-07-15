import { useContext, useEffect, useState } from "react"
import { TokenContext } from "../contexts/tokenContext"
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import ImovelBox from "../components/ImovelBox/ImovelBox"
import Modal from "../components/Modal/Modal"

function Favoritos () {

    

    return (
        <div>
            Favoritos
        </div>
    )
}

function MeusImoveis () {
    const idUsuario = sessionStorage.getItem('idUsuario')
    const [meusImoveis, setMeusImoveis] = useState([])

    async function getMeusImoveis () {
        const res = await fetch(`http://127.0.0.1:8000/imoveis_user/${idUsuario}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json() 
        setMeusImoveis(data.data)
    }

    useEffect(() => {
        
        getMeusImoveis()
    }, [])

    const navigate = useNavigate()

    function editarImovel (id) {
        return navigate(`/imovel_cadastro_update/${id}`)
    }

    async function excluirImovel (id) {

        const res = await fetch(`http://127.0.0.1:8000/imoveis/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()

        if(data.erro) {
            return
        } else {
            getMeusImoveis()
        }

    }

    return (
        <div>
            {meusImoveis?.map((item) => {
                return (
                    <ImovelBox 
                        data={item}
                        editavel={true}
                        editarImovel={(id) => editarImovel(id)}
                        excluirImovel={(id)=> excluirImovel(id)}
                    />
                )
            })}
        </div>
    )
}

const MinhaArea = () => {
    return (
        <div>
            <Favoritos/>
            <MeusImoveis/>
        </div>
    )
}

export default MinhaArea