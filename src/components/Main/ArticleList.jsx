import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import { useSearchParams, useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";

function ArticleList ({topic}) {
    const [isLoading, setIsLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const sortBy = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "desc";


    useEffect(()=> {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const fetchedArticles = await getArticles(topic, sortBy, order);
                setArticles(fetchedArticles.articles)
            }
            catch(err) {
                navigate("/error")
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [topic, sortBy, order, navigate])

    function handleSortChange(event) {
       searchParams.set("sort_by", event.target.value);
       setSearchParams(searchParams);
    }

    function handleOrderChange(event) {
        searchParams.set("order", event.target.value);
        setSearchParams(searchParams)
    }

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
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
                <select id="sort" value={sortBy} onChange={handleSortChange}>
                    <option value="created_at">Date</option>
                    <option value="comment_count">Comments</option>
                    <option value="votes">Votes</option>
                </select>
                <label htmlFor="order">Order:</label>
                <select id="order" value={order} onChange={handleOrderChange}>
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
