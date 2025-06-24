import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../api";

function Article () {
const [article, setArticle] = useState(null)
const [isLoading, setIsLoading] = useState(false)
const [isError, setIsError] = useState(false)
const { articleId } = useParams()

useEffect(() => {
    setIsLoading(true)
    setIsError(false)
    getArticleById(articleId)
    .then((fetchedArticle) => {
        setArticle(fetchedArticle.article)
        console.log(fetchedArticle.article)
    })
    .catch((err)=> {
        console.log(err)
        setIsError(true)
    })
    .finally(() => {
        setIsLoading(false)
    });
}, []);

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
            <p>Whoops! Something went wrong</p>
        </section>
    )
}
if (!article) return null;

return (
    <section>
        <section className="single-article-body">
        <h2>{article.title}</h2>
        <img src={article.article_img_url} alt={`article image for ${article.title}`}/>
        <p>
            {new Date(article.created_at).toLocaleString('en-GB', {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })}
        </p>
        <h3>{article.author}</h3>
        <p>{article.body}</p>
    </section>
    <section className="single-article-footer">
            <p>Votes: {`${article.votes}`}</p>
            <p>Comments: {`${article.comment_count}`}</p>
    </section>
    </section>
)

}

export default Article