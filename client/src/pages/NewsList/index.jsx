import NewsItem from "../../components/NewsItem";
import { useGetNewsByFieldQuery } from "../../redux/api/newsApi";
import { getErrorMessage } from "../../utils/getErrorMessage";
import "./styles.scss";


const NewsList = () => {
  const {data: newsList, isLoading, error} = useGetNewsByFieldQuery({ key: "published", value: true });

  return isLoading
    ? <p>Загружается...</p>
    : error
      ? getErrorMessage(error)
      : <main className="newsList">
          <h1>Все новости</h1>
          
          {newsList.length 
            ? <div className="newsList__container">
                {newsList.map((newsItem) => 
                  (<NewsItem key={newsItem._id} newsItem={newsItem}/>))
                }
              </div>
            : <p>Пока не опубликовано ни одной новости</p>
          }
        </main>
};

export default NewsList;
