import { useEffect, useState } from "react"
import { getArticles } from "../../api"
import ArticleCard from "./ArticleCard"

function ArticleList () {
const [isLoading, setIsLoading] = useState(false)
const [isError, setIsError] = useState(false)
const [articles, setArticles] = useState([])

useEffect(() => {
    console.log("article list useEffect called");
    setIsLoading(true);
    setIsError(false);
    getArticles()
        .then((fetchedArticles) => {
            console.log(fetchedArticles)
            setArticles(fetchedArticles.articles)
            console.log(articles)
        }).catch((err) => {
            console.log(err)
            setIsError(true)
        }).finally(() => {
            setIsLoading(false)
        })
}, [])

if (isLoading) {
    return (
        <section>
            <p>Loading...</p>
        </section>
    )
}

if (isError) {
    return (
        <section>
            <p>{`Whoops! Something went wrong :(`}</p>
        </section>
    )
}
if (articles.length === 0) {
    return (
        <section>
            <p>No results found.</p>
        </section>
    )
}

if (articles.length > 0) {
    return (
    <section className="article-list">
       {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article}/>
        })}
    </section>
)
}
}

export default ArticleList