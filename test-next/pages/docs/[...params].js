import { useRouter } from "next/router"

function Docs(){
    const router = useRouter()
    const { params = []} = router.query
    console.log(params)
    if(params.length == 2){
        //caso haja 2 parâmetros, mostramos esta página
        return <h1>Viewing docs for feature {params[0]} and concept {params[1]}</h1>
    }
    else if(params.length == 1){
        //caso haja 1 parâmetro, mostramos esta página
        return <h1>Viewing docs for feature {params[0]}</h1>
    }
    //caso haja mais parâmetros, mostra esta página padrão
    return <h1>Docs Home Page</h1>
}
export default  Docs