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

export function getComments(articleId) {
    return fetch(`https://nc-news-hx3v.onrender.com/api/articles/${articleId}/comments`)
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