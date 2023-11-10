import Article from "../../components/Article";

const ArticleList = () => {
  const articles = [{
    title: "Внимание",
    text: "Случилось что-то невероятное",
    pics: [],
    docs: [],
  }];

  return articles.length
    ? articles.map((article, i) => <Article key={i} article={article}/>)
    : <p>Вы ещё не опубликовали ни одной статьи</p>
};

export default ArticleList;
