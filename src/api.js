export function getArticles(){
    return fetch(`https://nc-news-hx3v.onrender.com/api/articles`)
    .then((res) => {
        if (!res.ok) {
            return Promise.reject({
                status: res.status,
                msg: "Failed to fetch articles list"
            })
        }
        return res.json();
    });
}

export function getArticleById(id){
    return fetch(`https://nc-news-hx3v.onrender.com/api/articles/${id}`)
    .then((res) => {
        if (!res.ok) {
            return Promise.reject({
                status: res.status,
                msg: "Failed to fetch article",
            })
        }
        return res.json()
    })
}

export function patchArticleVotes(articleId, inc_votes) {
    return fetch(`https://nc-news-hx3v.onrender.com/api/articles/${articleId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inc_votes }),
    })
    .then((res) => {
    if (!res.ok) {
      return Promise.reject('Failed to update votes. Please try again later');
    }
    return res.json();
  })
}

export function getComments(articleId) {
    return fetch(`https://nc-news-hx3v.onrender.com/api/articles/${articleId}/comments`)
    .then((res) => {
        if (!res.ok) {
            return Promise.reject({
                status: res.status,
                msg: "Failed to fetch article. Please try again later",
            })
        }
        return res.json()  
    })
}

export function postComment(articleId, {username, body}) {
    return fetch(`https://nc-news-hx3v.onrender.com/api/articles/${articleId}/comments`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, body }),
    })
    .then((res) => {
        if (!res.ok) {
           return Promise.reject('Failed to post comment. Please try again later'); 
        }
        return res.json()
    })
}

export function deleteComment(commentId){
        return fetch(`https://nc-news-hx3v.onrender.com/api/comments/${commentId}`, {
        method: "DELETE",
    })
    .then((res) => {
        if (!res.ok) {
           return Promise.reject('Failed to delete comment. Please try again later'); 
        }
    })
}