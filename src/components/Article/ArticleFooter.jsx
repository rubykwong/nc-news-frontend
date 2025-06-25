import { useState } from "react";
import { patchArticleVotes } from "../../api"

function ArticleFooter ({articleId, initialVotes}) {
    const [votes, setVotes] = useState(initialVotes)
    const [isError, setIsError] = useState(false)

    function handleVoteChange(change) {
        setVotes((currVotes) => currVotes + change);
        patchArticleVotes(articleId, change)
        .catch(()=> {
            setVotes((currVotes) => currVotes - change);
            setIsError(true);
    })
    }

    return (
    <div className="vote-container">
        <button onClick={() => handleVoteChange(1)}>👍</button>
        <p>Votes: {votes}</p>
        {isError && <p>Something went wrong. Please try again!</p>}
        <button onClick={() => handleVoteChange(-1)}>👎</button>
    </div>
    )
}

export default ArticleFooter