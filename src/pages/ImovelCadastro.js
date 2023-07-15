import { useContext, useEffect, useState } from "react"
import style from './imovelCadastro.module.css'
import Input from '../components/Input/Input'
import Button from "../components/Button/Button"
import { TokenContext } from "../contexts/tokenContext"
import Header from "../components/Header/Header"
import Modal from '../components/Modal/Modal'
import { useLocation, useNavigate, useParams } from "react-router-dom"


function Select({ lista, label, data, name, value }) {

    return <div className={style.container_inputs}>
        <label className={style.labels}>{label}</label>
        <select value={value} className={style.selects} onChange={(e) => data(e.target.value, name)}>
            <option value='null'>Selecione...</option>
            {lista?.map((item) => {
                return (
                    <option key={item.valor} value={item.valor}>{item.nome}</option>
                )
            })}
        </select>
    </div>
}

export default function ImovelCadastro() {

    const listaCategoria = [
        {
            nome: 'Apartamento',
            valor: 'Apartamento'
        },
        {
            nome: 'Casa',
            valor: 'Casa'
        },
        {
            nome: 'Kitnet',
            valor: 'Kitnet'
        }
    ]

    const listaEstado = [
        {
            nome: 'São Paulo',
            valor: 'São Paulo'
        },
        {
            nome: 'Rio de Janeiro',
            valor: 'Rio de Janeiro'
        },
        {
            nome: 'Bahia',
            valor: 'Bahia'
        },
        {
            nome: 'Rio Grande do Sul',
            valor: 'Rio Grande do Sul'
        },
        {
            nome: 'Rio Grande do Norte',
            valor: 'Rio Grande do Norte'
        }
    ]

    const listaCidade = [
        {
            estado: 'São Paulo',
            cidades: [
                {
                    nome: 'São Paulo',
                    valor: 'São Paulo'
                },
                {
                    nome: 'Campinas',
                    valor: 'Campinas'
                },
                {
                    nome: 'Barueri',
                    valor: 'Barueri'
                },
                {
                    nome: 'Santo André',
                    valor: 'Santo André'
                },
                {
                    nome: 'São Bernardo',
                    valor: 'São Bernardo'
                },

            ]
        },
        {
            estado: 'Rio Grande do Sul',
            cidades: [
                {
                    nome: 'Pelotas',
                    valor: 'Pelotas'
                },
                {
                    nome: 'Caxias do Sul',
                    valor: 'Caxias do Sul'
                },
                {
                    nome: 'Gramado',
                    valor: 'Gramado'
                },
                {
                    nome: 'Gravataí',
                    valor: 'Gravataí'
                },
                {
                    nome: 'Santa Maria',
                    valor: 'Santa Maria'
                },

            ]
        },
        {
            estado: 'Rio Grande do Norte',
            cidades: [
                {
                    nome: 'Natal',
                    valor: 'Natal'
                },
                {
                    nome: 'Macau',
                    valor: 'Macau'
                },
                {
                    nome: 'Touros',
                    valor: 'Touros'
                },
                {
                    nome: 'Tibaú do Sul',
                    valor: 'Tibaú do Sul'
                },
                {
                    nome: 'Japi',
                    valor: 'Japi'
                },

            ]
        },
        {
            estado: 'Bahia',
            cidades: [
                {
                    nome: 'Salvador',
                    valor: 'Salvador'
                },
                {
                    nome: 'Porto Seguro',
                    valor: 'Porto Seguro'
                },
                {
                    nome: 'Filadélfia',
                    valor: 'Filadélfia'
                },
                {
                    nome: 'Itacaré',
                    valor: 'Itacaré'
                },
                {
                    nome: 'Itabuna',
                    valor: 'Itabuna'
                },

            ]
        },
        {
            estado: 'Rio de Janeiro',
            cidades: [
                {
                    nome: 'Rio de Janeiro',
                    valor: 'Rio de Janeiro'
                },
                {
                    nome: 'Niterói',
                    valor: 'Niterói'
                },
                {
                    nome: 'Petrópolis',
                    valor: 'Petrópolis'
                },
                {
                    nome: 'Nova Iguaçú',
                    valor: 'Nova Iguaçú'
                },
                {
                    nome: 'Angra dos Reis',
                    valor: 'Angra dos Reis'
                },

            ]
        }
    ]

    const [selectCidade, setSelectCidade] = useState(false)
    const [listaCidades, setListaCidades] = useState()
    const [campoVazio, setCampoVazio] = useState(false)
    const [popup, setPopup] = useState()
    const [msgPopup, setMsgPopup] = useState()
    const [popupErro, setPopupErro] = useState()

    const { token } = useContext(TokenContext)

    const location = useLocation()
    const navigate = useNavigate()

    const [imovel, setImovel] = useState({
        categoria: '',
        estado: '',
        cidade: '',
        comodos: '',
        quartos: '',
        banheiros: '',
        preco: '',
        imagem: ''
    })

    function handleImovel(valor, propriedade) {

        if (propriedade === 'estado') {
        
            setImovel({
                ...imovel,
                cidade: '',
                estado: valor
            })
            setSelectCidade(true)
            retornaListaCidade(valor)
            return
        }

        if (propriedade === 'cidade' & imovel.estado !== '') {
            setImovel({ ...imovel, [propriedade]: valor })
            return
        }

        setImovel({ ...imovel, [propriedade]: valor })

    }


    function retornaListaCidade(valor) {

        if (valor !== '') {
            let lista = listaCidade.find(cid => cid.estado === valor)

            setListaCidades(lista.cidades)
            return lista.cidades
        } else {
            return alert('Selecione o estado primeiro')
        }

    }

    function openPopup (valor, msg) {
        setPopupErro(valor)
        setPopup(true)
        setMsgPopup(msg)
    }

    async function cadastrarImovel() {
        console.log('eu')
        
        Object.keys(imovel).forEach((propriedade) => {
            if (imovel[propriedade] === '' || imovel[propriedade] === null) {

                setCampoVazio(true)
                setTimeout(() => {
                    setCampoVazio(false)
                }, 3000)

                return
            }
        })

        try {
            const res = await fetch('http://127.0.0.1:8000/imoveis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(imovel)
            })

            const data = await res.json()
            
            if (data.erro) {
                openPopup(true, data.msg)
            } else {
                setImovel({
                    categoria: '',
                    estado: '',
                    cidade: '',
                    comodos: '',
                    quartos: '',
                    banheiros: '',
                    preco: '',
                    imagem: ''
                })
                openPopup(false, data.msg)
                navigate('/imoveis')
            }

        } catch (error) {
            console.log(error)
        }


    }

    const { id } = useParams()

    async function isUpdate () {
        if(location.pathname.includes('update')) {
            const res = await fetch(`http://127.0.0.1:8000/imoveis/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()

        setImovel(data)

    } }

    useEffect(() => {
        isUpdate()
    }, [location.pathname])


    return (
        <>
            <Header />
            <div className={style.cadastro_imovel_container}>
                {popup && (
                    <Modal
                        msg={msgPopup}
                        msgButton={'Ok'}
                        redirecionar={()=> setPopup(!popup)}
                        erro={popupErro}
                    />
                )}
                <section className={style.cadastro_box}>
                    <h2>Cadastrar imóvel</h2>
                    <form>
                        {campoVazio && (
                            <div
                                style={{
                                    color: 'red',
                                    fontSize: '10px'
                                }}
                            >Todos os campos devem ser preenchidos</div>
                        )}
                        <div>
                            <Select label={'Categoria do imóvel'} lista={listaCategoria} name={'categoria'} value={imovel.categoria} data={(valor, name) => handleImovel(valor, name)} />
                        </div>

                        <div>
                            <Select label={'Estado'} lista={listaEstado} name={'estado'} value={imovel.estado} data={(valor, name) => handleImovel(valor, name)} />
                        </div>

                        {selectCidade && (
                            <div>
                                <Select label={'Cidade'} lista={listaCidades} name={'cidade'} value={imovel.cidade} data={(valor, name) => handleImovel(valor, name)} />
                            </div>
                        )}

                        <div className={style.boxTril}>
                            <Input
                                width={'30px'}
                                label={''}
                                type={'number'}
                                placeholder={'Nº de comodos'}
                                name={'comodos'}
                                data={(valor, name) => handleImovel(valor, name)}
                                value={imovel.comodos} />

                            <Input

                                label={''}
                                type={'number'}
                                placeholder={'Nº de quartos'}
                                name={'quartos'}
                                data={(valor, name) => handleImovel(valor, name)}
                                value={imovel.quartos} />

                            <Input
                                label={''}
                                type={'number'}
                                placeholder={'Nº de banheiros'}
                                name={'banheiros'}
                                data={(valor, name) => handleImovel(valor, name)}
                                value={imovel.banheiros} />
                        </div>

                        <div className={style.boxTril}>
                            <div>
                                <Input label={'Preço'} type={'number'} placeholder={'Preço'} name={'preco'} value={imovel.preco} data={(valor, name) => handleImovel(valor, name)} />
                            </div>

                            <div>
                                <Input label={'Imagem'} type={'text'} placeholder={'https://....'} name={'imagem'} value={imovel.imagem} data={(valor, name) => handleImovel(valor, name)} />
                                <a style={{
                                    marginLeft: '5px',
                                    fontSize: '12px',
                                    textDecoration: 'none',
                                    marginTop: '-10px',
                                    marginBottom: '10px',
                                    color: '#808080'
                                }} href='https://unsplash.com/pt-br' target="_blank" rel="noreferrer">Ir para o Unsplash</a>
                            </div>
                        </div>

                        <Button className={style.btn_cadastro_imovel} type='button' onClick={() => cadastrarImovel()}>Cadastrar imóvel</Button>
                    </form>
                </section>
            </div>
        </>
    )
}

