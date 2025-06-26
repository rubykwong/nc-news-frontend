import { useEffect, useState } from "react"
import { getArticles } from "../../api"
import ArticleCard from "./ArticleCard"

function ArticleList ({topic}) {
const [isLoading, setIsLoading] = useState(false)
const [isError, setIsError] = useState(false)
const [articles, setArticles] = useState([])
const [sortBy, setSortBy] = useState("created_at")
const [order, setOrder] = useState("desc")

useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticles(topic, sortBy, order)
        .then((fetchedArticles) => {
            setArticles(fetchedArticles.articles)
        }).catch((err) => {
            console.log(err)
            setIsError(true)
        }).finally(() => {
            setIsLoading(false)
        })
}, [sortBy, order])

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
    <section className="articles-container">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="created_at">Date</option>
                <option value="comment_count">Comments</option>
                <option value="votes">Votes</option>
            </select>
            <label htmlFor="order">Order:</label>
            <select id="order" value={order} onChange={(event) => setOrder(event.target.value)}>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
            </select>
    <section className="article-list">
       {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article}/>
        })}
    </section>
    </section>
)
}
}

export default ArticleList
