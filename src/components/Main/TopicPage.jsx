import { useParams } from "react-router-dom";
import ArticleList from "./ArticleList";

function TopicPage() {
  const { topic } = useParams();

  return (
    <section>
      <h2>{topic.charAt(0).toUpperCase() + topic.slice(1)}</h2>
      <ArticleList topic={topic} />
    </section>
  );
}

export default TopicPage;