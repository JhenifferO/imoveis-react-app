import { LiaBathSolid } from 'react-icons/lia'
import { MdOutlineBedroomChild } from 'react-icons/md'
import { BsHouseDoor } from 'react-icons/bs'
import style from './imovel.module.css'
import { useState } from 'react'



export default function ImovelBox({ data, editavel, editarImovel, excluirImovel }) {

    return (
        <div key={data._id} className={style.box}>
            <div className={style.image_box}>
                <img alt='' style={{ width: '95%' }} src={data.imagem} />
            </div>


            <div>
                <p className={style.preco}><span className={style.preco_nome}>Aluguel:</span> R$ 2500,00</p>
            </div>

            <div className={style.box_informacoes}>
                <div className={style.box_informacoes_1}>
                    <div>
                        <p>{data.categoria}</p>

                        <p>{data.estado}, {data.cidade}</p>
                    </div>

                </div>

                <div>
                    <div className={style.numero}>
                        <span><BsHouseDoor size={'25'} /> </span>
                        <span >{data.comodos} Cômodos</span>
                    </div>

                    <div className={style.numero}>
                        <span><LiaBathSolid size={'25'} /> </span>
                        <span >{data.banheiros} Banheiros</span>
                    </div>

                    <div className={style.numero}>
                        <span><MdOutlineBedroomChild size={'25'} /> </span>
                        <span >{data.quartos} Quartos</span>
                    </div>
                </div>

                {editavel && (
                    <div>
                        <button onClick={() => editarImovel(data._id)}>Editar</button>
                        <button onClick={() => excluirImovel(data._id)}>Excluir</button>
                    </div>

                )}

            </div>

        </div>
    )
}