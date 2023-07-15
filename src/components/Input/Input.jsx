import style from './input.module.css'

export default function Input({ placeholder, label, value, data, type, name, width }) {
    return (
        <>
            <div className={style.container_inputs}>
                <label className={style.labels}>{label}</label>
                <input stye={{width: width}} className={style.input} type={type} value={value} placeholder={placeholder} onChange={(e) => data(e.target.value, name)} />
            </div>
        </>
    )
}