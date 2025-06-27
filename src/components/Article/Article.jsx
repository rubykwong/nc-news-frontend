import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleById } from "../../api";
import ArticleFooter from "./ArticleFooter";
import CommentContainer from "./CommentContainer";

function Article () {
    const [article, setArticle] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const { articleId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const fetchedArticle = await getArticleById(articleId);
                setArticle(fetchedArticle.article)
            }
            catch(err) {
                navigate("/error");
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchData();

    }, [articleId, navigate])

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
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
                <ArticleFooter articleId={article.article_id} initialVotes={article.votes} />
                {!showComments && (
                    <button onClick={() => setShowComments(true)}>Show Comments</button>
                )}
                {showComments && (
                    <CommentContainer articleId={article.article_id}/>
                )}
        </section>
        </section>
    )

}

export default Article