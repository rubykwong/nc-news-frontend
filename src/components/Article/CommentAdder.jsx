import {useState, useContext} from "react"
import { UserContext } from "../../contexts/UserContext";
import { postComment } from "../../api";

function CommentAdder ({articleId, onCommentAdded}) {
    const { user } = useContext(UserContext)
    const [commentBody, setCommentBody] = useState("")
    const [isPosting, setIsPosting] = useState(false)
    const [error, setError] = useState(null)
    
    const isSubmitDisabled = !user || commentBody.trim() === "" || isPosting;
    
    function handleSubmit(event) {
        event.preventDefault();
        setIsPosting(true);
        setError(null);

        postComment(articleId, {
            username: user.username,
            body: commentBody.trim()
        })
        .then((res) => {
            onCommentAdded?.(res.comment);
            setCommentBody("");
        })
        .catch(() => {
            setError("Could not post comment. Please try again later.")
        })
        .finally(() => {
            setIsPosting(false)
        })
    };
    return (
        <form className="comment-adder" onSubmit={handleSubmit}>
            <label htmlFor="newComment">Add a comment</label>
            <textarea 
                value={commentBody}
                onChange={(event) => setCommentBody(event.target.value)} 
                placeholder="Write your comment here..."
                rows="4"
                id="newComment" 
                disabled={!user}/>
            <button type="submit" disabled={isSubmitDisabled}>{isPosting ? "Posting..." : "Post comment" }</button>
            {error && <p>{error}</p>}
            {!user && <p>You must be logged in to comment.</p>}
        </form>
    )
    
}

export default CommentAdder