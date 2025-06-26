import { useState, useContext } from "react"
import {useParams} from "react-router-dom"
import { getComments, deleteComment } from "../../api"
import { UserContext } from "../../contexts/UserContext"
import CommentAdder from "./CommentAdder"

function CommentList () {
    const [comments, setComments] = useState([])
    const [showingComments, setShowingComments] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [deleteError, setDeleteError] = useState(null);
    const {articleId} = useParams()
    const {user} = useContext(UserContext)

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
            setIsError(true);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    function handleAddComment(addedComment) {
        setComments((currComments) => [addedComment, ...currComments]);
    }
    return (
        <section className="comments-section">
        <button key="show-comments-button" onClick={handleClick}>Show Comments</button>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Whoops! Something went wrong</p>}
        {showingComments && (
            <section>
                <h2>Comments</h2>
                {deleteError &&
                <p>{deleteError}</p>}
                {user && (
                    <CommentAdder articleId={articleId}
                    onCommentAdded={handleAddComment} />
                )}

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
                    {user?.username === comment.author && (
                        <button onClick={() => handleDeleteComment(comment.comment_id)}>Delete</button>
                    )}
                </li>
            ))}
            </ul>
            </section>
        )}
    </section>)

    function handleDeleteComment(commentId){
        setDeleteError(null)

        const commentToDelete = comments.find(
            (comment) => comment.comment_id === commentId
        );

        setComments((curr) => 
            curr.filter((comment) => comment.comment_id !== commentId)
    );
        deleteComment(commentId).catch(()=> {
            setComments((curr) => [commentToDelete, ...curr]);
            setDeleteError("Failed to delete comment. Please try again later.")
        })
    }
}

export default CommentList