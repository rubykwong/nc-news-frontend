import { Link } from 'react-router-dom';

function ArticleCard({article}) {
    return (
        <Link to={`/${article.article_id}`} className="article-card">
            <h3>{article.title}</h3>
            <p>{article.created_at}</p>
            <p>{article.topic}</p>
            <p>{article.author}</p>
            <img src={article.article_img_url} alt={`article image for ${article.title}`}/>
            <p>Votes:{`${article.votes}`}</p>
            <p>Comments:{`${article.comment_count}`}</p>
        </Link>
    )
}

export default ArticleCard
