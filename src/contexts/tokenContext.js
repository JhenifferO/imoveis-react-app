import { createContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const TokenContext = createContext()

const TokenProvider = ({ children }) => {

    const [token, setToken] = useState()
    const [idUsuario, setidUsuario] = useState()
    


    async function login(usuario) {
        const res = await fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)


        })

        if (res.ok) {

            let data = await res.json()

            sessionStorage.setItem('token', data.token)
            sessionStorage.setItem('idUsuario', data.idUsuario)

            setToken(data.token)
            setidUsuario(data.idUsuario)

            alert(`${data.msg}`)

            return true

        } else {
            let data = await res.json()

            alert(`${data.msg}`)

            return false
        }
    }


    return (
        <TokenContext.Provider value={{
            idUsuario: idUsuario,
            logado: token,
            login: login,

        }}>
            {children}
        </TokenContext.Provider>
    )

}
export default TokenProvider