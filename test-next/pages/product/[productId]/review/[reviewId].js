import { useRouter } from "next/router"

function Review(){
    const router = useRouter()
    const {productId, reviewId} = router.query // esta propriedade deve corresponder ao nome do arquivo, e retornará o parâmetro inserido na URL
    return (
        <h1>Resenha {reviewId} sobre o produto {productId}</h1> //entre chaves vai a variável do JS, dentro do código HTML
    )
}
export default Review