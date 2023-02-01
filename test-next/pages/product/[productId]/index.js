import { useRouter } from "next/router"

function ProductDetail(){
    const router = useRouter()
    const productId = router.query.productId // esta propriedade deve corresponder ao nome do arquivo, e retornará o parâmetro inserido na URL
    return (
        <h1>Detalhes sobre o produto {productId}</h1> //entre chaves vai a variável do JS, dentro do código HTML
    )
}
export default ProductDetail