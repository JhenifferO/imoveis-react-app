import classNames from 'classnames'
import Button from '../Button/Button'
import style from './modal.module.css'

const Modal = ({ msg, msgButton, redirecionar, erro }) => {
    return (
        <div className={style.modal_container}>
            <div className={style.modal}>
                <p
                    className={classNames({
                        [style.pErroFalse]: !erro,
                        [style.pErroTrue]: erro
                    
                    })}

                    // {classNames({[classe.container_menu]: true, [classe.container_menu_fechado]: menuVisivel === false})}
                >{msg}</p>
                <Button className={style.btn_modal} onClick={() => redirecionar()}>
                    {msgButton}
                </Button>
            </div>
        </div>
    )

}

export default Modal