import Link from "next/link"

function ProductList({products}){
    return (
        <div>
            <Link href="/">Home</Link>
            <h1>List of Products</h1>
            {
                products.map(product => {
                    return(
                        <div key={product.id}>
                            <h2>
                                <Link href={`/products/${product.id}`}>
                                {product.id} {product.title} {product.price}
                                </Link>
                            </h2>
                            <hr />
                        </div>
                    )
                })
            }
        </div>
    )
}
export default ProductList

export async function getStaticProps(){
    const response = await fetch('http://localhost:4000/products')
    const data = await response.json()
    return{
        props:{
            products: data
        },
    } 
}