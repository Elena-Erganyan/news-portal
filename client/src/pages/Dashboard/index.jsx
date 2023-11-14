import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../redux/userSlice";
import { useGetNewsByFieldQuery } from "../../redux/api/newsApi";
import { getErrorMessage } from "../../utils/getErrorMessage";
import NewsItem from "../../components/NewsItem";
import "./styles.scss";


const Dashboard = () => {
  const user = useSelector(selectCurrentUser);
  const {data: newsList, isLoading, error} = useGetNewsByFieldQuery({ key: "owner", value: user._id });

  return isLoading
    ? <p>Загружается...</p>
    : error
      ? getErrorMessage(error)
      : <main className="newsList">
          <h1>Созданные Вами новости, <span className="newsList__user">{user.name}</span></h1>
          
          {newsList.length 
            ? <div className="newsList__container">
                {newsList.map((newsItem) => 
                  (<NewsItem key={newsItem._id} newsItem={newsItem}/>))
                }
              </div>
            : <p>Вы пока не создали не одной новости</p>
          }
        </main>
};

export default Dashboard;
