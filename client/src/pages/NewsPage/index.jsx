import { useSelector } from "react-redux";
import { useCachedNewsItem } from "../../utils/useCachedNewsItem";
import { selectCurrentUser } from "../../redux/userSlice";
import { useParams } from "react-router-dom";
import { useGetNewsItemQuery } from "../../redux/api/newsApi";
import { getErrorMessage } from "../../utils/getErrorMessage";
import NewsItem from "../../components/NewsItem";
import "./styles.scss";


const NewsPage = () => {
  const { newsItemId } = useParams(); 

  const user = useSelector(selectCurrentUser);
  const cachedNewsItemData = useCachedNewsItem(newsItemId, user?._id);
  const { data: fetchedNewsItemData, isLoading, error } = useGetNewsItemQuery(newsItemId, {skip: cachedNewsItemData});

  const newsItemData = cachedNewsItemData || fetchedNewsItemData;

  return isLoading
    ? <p>Загружается...</p>
    : error
      ? <p className="error">{getErrorMessage(error)}</p>
      : <main className="newsPage">
          {newsItemData
            ? <NewsItem newsItem={newsItemData} isNewsPage={true} />
            : <p>Такой новости не существует или она была удалена</p>
          }
        </main>
};

export default NewsPage;
