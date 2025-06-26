import { useState, useEffect, useContext} from "react";
import { getComments, deleteComment } from "../../api";
import { UserContext } from "../../contexts/UserContext";
import CommentList from "./CommentList"
import CommentAdder from "./CommentAdder"

function CommentContainer({articleId}){
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [deleteError, setDeleteError] = useState(null)
    const { user } = useContext(UserContext)


    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
    

    getComments(articleId)
    .then((res) => setComments(res.comments))
    .catch(() => setIsError(true))
    .finally(() => setIsLoading(false))
    }, [articleId]);

    function handleAddComment(addedComment) {
        setComments((currComments) => [addedComment, ...currComments]);
    }

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
    if (isLoading) return <p>Loading comments...</p>

    if (isError) return <p>Failed to load comments.</p>

    return (
        <section className="comment-container">
            <h2>Comments</h2>
           {!isLoading && <p>Comments: {comments.length}</p>}
            {user && (
                <CommentAdder 
                    articleId={articleId}
                    onCommentAdded={handleAddComment} />
                )}
                {deleteError && 
                <p className="delete-error">{deleteError}</p>}
            <CommentList 
            comments={comments}
            user={user}
            handleDeleteComment={handleDeleteComment}/>
        </section>
    )
}

export default CommentContainer