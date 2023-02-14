function ArticleListByCategory({ articles, category }){
    return(
        <>
            <h1>Showing News or category {category}</h1>
            {
                articles.map(article => {
                    return(
                        <div key={article.id}>
                            <h2>
                                {article.id} - {article.title}
                            </h2>
                            <p>{article.description}</p>
                            <hr />
                        </div>
                    )
                })
            }
        </>
    )
}
export default ArticleListByCategory


export async function getServerSideProps(context){
    const { params, req, res, query } = context
    console.log(req.headers.cookie) //ler um cookie do navegador
    res.setHeader('Set-Cookie', ['name=Joel'] ) //escrever um cookie no navegador
    console.log(query)
    const { category } = params
    const response = await fetch(`http://localhost:4000/news?category=${category}`) //com esta notaçao podemos filtrar os dados coletados
    const data = await response.json()

    return{
        props: {
            articles: data,
            category,
        }
    }
}