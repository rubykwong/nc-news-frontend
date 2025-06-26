import ArticleList from "./ArticleList"

function Cooking () {
    const topic = "cooking"
    return <section>
        <h2> Cooking </h2>
        <ArticleList topic ={topic}/>
    </section>
}

export default Cooking