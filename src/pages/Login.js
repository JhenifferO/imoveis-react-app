import { useContext, useEffect, useState } from "react"
import Input from "../components/Input/Input"
import Button from "../components/Button/Button"
import { useLocation, useNavigate } from "react-router-dom"
import { TokenContext } from "../contexts/tokenContext"
import Header from "../components/Header/Header"
import style from './login.module.css'
import Modal from "../components/Modal/Modal"

const Login = () => {

    const { login } = useContext(TokenContext)

    const location = useLocation()

    const [usuario, setUsuario] = useState({
        nome: '',
        senha: '',
        confirmacaoSenha: ''
    })

    const [paginaCadastro, setPaginaCadastro] = useState()
    const [reqIncorreta, setReqIncorreta] = useState()
    const [msgReqIncorreta, setMsgReqIncorreta] = useState()
    const [popUp, setPopup] = useState(false)
    const [mgpPopup, setMsgPopup] = useState()

    const navigate = useNavigate()

    const handleUsuario = (valor, propriedade) => {
        setUsuario({ ...usuario, [propriedade]: valor })
    }

    const validacoes = (erro, msg) => {

        setReqIncorreta(erro)
        setMsgReqIncorreta(msg)

        setTimeout(() => {
            setReqIncorreta(false)
        }, 2000);
    }

    const openPopup = (msg) => {
        setPopup(true)
        setMsgPopup(msg)

    }

    const criarNovoUsuario = async () => {

        if (location.pathname.includes('cadastro')) {
            const res = await fetch('http://127.0.0.1:8000/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            })

            const data = await res.json()

            if (data.erro) {

                validacoes(data.erro, data.msg)

            } else {
                
                openPopup(data.msg)
                console.log(data)
                setUsuario({
                    nome: '',
                    senha: '',
                    confirmacaoSenha: ''
                })
            }
        } else {
            //verificações de campos vazios

            const result = await login(usuario)

            if(result) {
                return navigate('/minha_area')
            }


        }

    }

    useEffect(() => {
        if (location.pathname.includes('cadastro')) {
            setPaginaCadastro(true)
        } else {
            setPaginaCadastro(false)
        }
    }, [location.pathname])

    return (
        <>
            <Header/>
            <div className={style.main}>
            {popUp && (
                    <Modal
                        msg={mgpPopup}
                        msgButton={'Ok'}
                        redirecionar={()=> setPopup(false)}
                    />
                )}
                <div className={style.input_container}>
                    <div style={{
                                height: '10px',
                                marginBottom: '15px'
                            }}>
                        {reqIncorreta && (
                            <p style={{
                                fontSize: '12px',
                                margin: '0',
                                color: 'red'
                            }}>{msgReqIncorreta}</p>
                        )}
                    </div>
                    <h2>{paginaCadastro ? 'Cadastre-se' : 'Entrar'}</h2>
                    
                    <Input
                        width={'30px'}
                        label={'Usuario'}
                        type={'text'}
                        placeholder={'Nome de usuário'}
                        name={'nome'}
                        data={(valor, name) => handleUsuario(valor, name)}
                        value={usuario.nome}
                    />
                    <Input
                        width={'30px'}
                        label={'Senha'}
                        type={'password'}
                        placeholder={'Senha'}
                        name={'senha'}
                        data={(valor, name) => handleUsuario(valor, name)}
                        value={usuario.senha}
                    />

                    {paginaCadastro && (
                        <Input
                            width={'30px'}
                            label={'Confirmação senha'}
                            type={'password'}
                            placeholder={'Confirma senha'}
                            name={'confirmacaoSenha'}
                            data={(valor, name) => handleUsuario(valor, name)}
                            value={usuario.confirmacaoSenha}
                        />
                    )}

                    <Button className={style.btn_cadastro} type='button' onClick={() => criarNovoUsuario()}>
                        {paginaCadastro ? 'Cadastrar' : 'Entrar'}
                    </Button>

                </div>
            </div>
        </>
    )
}

export default Login