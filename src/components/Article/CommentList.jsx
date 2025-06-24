import { useState } from "react"
import {useParams} from "react-router-dom"
import { getComments } from "../../api"

function CommentList () {
    const [comments, setComments] = useState([])
    const [showingComments, setShowingComments] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const {articleId} = useParams()

    function handleClick(event){
        event.preventDefault();
        if (showingComments) return;
        
        setIsLoading(true);
        setIsError(false);

        getComments(articleId)
        .then((fetchedComments) => {
            setComments(fetchedComments.comments);
            setShowingComments(true);
        })
        .catch((err) => {
            console.log(err);
            setIsError(true);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <section className="comments-section">
        <button key="show-comments-button" onClick={handleClick}>Show Comments</button>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Whoops! Something went wrong</p>}
        {showingComments && (
            <section><h2>Comments</h2>
            <ul className="comment-list">
            {comments.map((comment) => (
                <li key={comment.comment_id} className="comment">
                    <p>{comment.author}, {new Date(comment.created_at).toLocaleString('en-GB', {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                })}
                    </p>
                    <p>{comment.body}</p>
                    <p>Votes: {comment.votes}</p>
                </li>
            ))}
            </ul></section>
        )}
    </section>)
}

export default CommentList