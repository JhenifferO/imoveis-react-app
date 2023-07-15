import { useEffect, useState } from "react"
import ImovelBox from "../components/ImovelBox/ImovelBox"
import Header from "../components/Header/Header"
import style from './imoveis.module.css'

export default function Imoveis() {

    const [listaImoveis, setListaImoveis] = useState([])

    //function useEffect requisição para listar todos os imoveis
    async function getImoveis() {
        const res = await fetch('http://127.0.0.1:8000/imoveis')

        const data = await res.json()

        setListaImoveis(data.data)
    }

    useEffect(() => {
        getImoveis()
    }, [])

    //function criar barra de filtros

    return (
        <>
            <Header/>
            <div className={style.container_imoveis}>
                <div className={style.imoveis}>
                    {listaImoveis?.map((imovel) => {
                        return (
                            <ImovelBox data={imovel} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}