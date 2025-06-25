import { useState } from "react";
import { patchArticleVotes } from "../../api"

function ArticleFooter ({articleId, initialVotes}) {
    const [votes, setVotes] = useState(initialVotes)
    const [isError, setIsError] = useState(false)
    const [hasVoted, setHasVoted] = useState(false)

    function handleVoteChange(change) {
        if (hasVoted) return;

        setVotes((currVotes) => currVotes + change);
        setHasVoted(true);

        patchArticleVotes(articleId, change)
        .catch(()=> {
            setVotes((currVotes) => currVotes - change);
            setHasVoted(false);
            setIsError(true);
    })
    }

    return (
    <div className="vote-container">
        <p>Votes: {votes}</p>
        {isError && <p>Something went wrong. Please try again!</p>}
        <button onClick={() => handleVoteChange(1)}>👍</button>
        <button onClick={() => handleVoteChange(-1)}>👎</button>
    </div>
    )
}

export default ArticleFooter