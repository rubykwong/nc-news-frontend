function CommentList ({comments, user, handleDeleteComment}) {
    return (
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
        )}

export default CommentList