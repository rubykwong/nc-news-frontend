import { Link } from 'react-router-dom';

function ArticleCard({article}) {
    return (
        <Link to={`/${article.article_id}`} className="article-card">
            <img src={article.article_img_url} alt={`article image for ${article.title}`}/>
            <h3>{article.title}</h3>
            <div className="card-footer">
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
            <h4>{article.author}</h4>
            <p>Votes: {`${article.votes}`}</p>
            <p>Comments: {`${article.comment_count}`}</p>
            </div>
            <p>{article.topic}</p>
        </Link>
    )
}

export default ArticleCard
