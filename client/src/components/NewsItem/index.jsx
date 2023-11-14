import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/userSlice";
import { useDeleteNewsItemMutation } from "../../redux/api/newsApi";
import { Link, useNavigate } from "react-router-dom";
import { PencilLine, Trash } from "@phosphor-icons/react";
import "./styles.scss";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { useEffect } from "react";


const NewsItem = ({newsItem, isNewsPage = false}) => {
  const { _id, title, description, owner, published, publishDate } = newsItem;
  const publishDateFormatted = new Date(publishDate).toLocaleString("ru");

  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const [deleteNewsItem, {isLoading, isSuccess, error, data = {}}] = useDeleteNewsItemMutation();

  useEffect(() => {
    let timeoutId;
    if (isSuccess && isNewsPage) {
      timeoutId = setTimeout(() => navigate("/dashboard"), 2000);
    }

    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleEdit = () => {
    navigate(`/news/${_id}/edit`);
  };

  const handleDelete = () => {
    const userConfirmed = confirm("Вы уверены, что хотите удалить эту новость?");
    if (userConfirmed) {
      deleteNewsItem(newsItem);
    }
  };

  return (
    <article className="newsItem">
      {user?._id === owner
        && <div className="newsItem__buttons">
              <PencilLine
                className="newsItem__edit"
                size={25}
                weight="duotone"
                color="#43c7c7"
                onClick={handleEdit}
              />

              <Trash
                className="newsItem__delete"
                size={25}
                weight="duotone"
                color="crimson"
                onClick={handleDelete}
              />
            </div>
      }
      {!published && <p className="newsItem__note">Будет опубликовано {publishDateFormatted}</p>}

      <Link
        to={isNewsPage ? "" : `/news/${_id}`}
        {...isNewsPage && {style: {cursor: "auto"}}}
      >
        <h2 className="newsItem__title">{title}</h2>
      </Link>

      <p className="newsItem__description">{description}</p>

      {error && <p className="error">{getErrorMessage(error)}</p>}
      {data.message && <p className="success">{data.message}</p>}
    </article>
  );
};

export default NewsItem;
