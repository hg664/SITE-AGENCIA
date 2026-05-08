import { useEffect, useState } from "react"
export default function Usuarios(){
    const [cont, setCont] = useState(0)

    const aumenta = () => {
        setCont(cont + 1)
    }

    useEffect(() => {
        document.title = `count: ${cont}`
    }, [cont])

    return (
        <div>
            <h1>Usuarios</h1>
            {cont}
            <button onClick={() => aumenta()}>aumenta</button>
        </div>
    )
}