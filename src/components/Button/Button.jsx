

export default function Button(props) {
    let { children } = props
    return <button {...props}>{children}</button>
}