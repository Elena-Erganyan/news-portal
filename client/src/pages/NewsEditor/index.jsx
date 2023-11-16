import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/userSlice";
import { useAddNewsItemMutation, useModifyNewsItemMutation } from "../../redux/api/newsApi";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { useCachedNewsItem } from "../../utils/useCachedNewsItem";
import MDEditor, { commands } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { formatDate, toHoursAndMinutes } from "./utils";
import { insertImage } from "./mdEditorComponents/inserImage";
import { attachDocument } from "./mdEditorComponents/attachDocument";
import "./styles.scss";


const NewsEditor = () => {
  const { newsItemId } = useParams();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  let newsItemData = useCachedNewsItem(newsItemId, user._id);

  const [title, setTitle] = useState(newsItemData?.title || "");
  const [description, setDescription] = useState(newsItemData?.description || "");
  const [publishDate, setPublishDate] = useState(newsItemData?.publishDate || undefined);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({title: "", description: ""});

  const [addNewsItem, {
    isLoading: isAdding, error: additionError, isSuccess: hasAdded, data: additionData = {}
  }] = useAddNewsItemMutation();

  const [modifyNewsItem, {
    isLoading: isModifying, error: modificationError, isSuccess: hasModified, data: modificationData = {}
  }] = useModifyNewsItemMutation();

  useEffect(() => {
    let timeoutId;
    if (additionError || modificationError) {
      const errorData = getErrorMessage(additionError || modificationError);
      if (typeof(errorData) === "object") {
        setErrors((prevErrors) => ({...prevErrors, ...errorData}));
      } else {
        setErrorMessage(errorData);
      }
    } else if (hasAdded || hasModified) {
        setMessage(additionData.message || modificationData.message);
        timeoutId = setTimeout(() => navigate("/dashboard"), 1500);
    }

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdding, isModifying]);

  useEffect(() => {
    if (newsItemId && !newsItemData) {
      navigate(`/news/${newsItemId}`, {replace: true});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    setErrors({title: "", description: ""});
    setMessage("");
    setErrorMessage("");

    const diff = new Date(publishDate).getTimezoneOffset();
    const sign = Math.sign(diff) < 0 ? "+" : "-";
    const UTCPublishDate = publishDate + sign + toHoursAndMinutes(Math.abs(diff));

    if (newsItemId && newsItemData) {
      modifyNewsItem({id: newsItemId, data: {title, description, publishDate: UTCPublishDate}})
    } else {
      addNewsItem({title, description, publishDate: UTCPublishDate});
    }   
  };

  return (
    <main className="news-editor">
      <h2 className="news-editor__title">{newsItemId ? "Oтредактировать" : "Создать новую"} статью</h2>
      <form className="news-editor__form" onSubmit={handleSubmit}>
        <label>
          Заголовок
          <input
            id="title"
            maxLength={90}
            name="title"
            type="text"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </label>

        <div className="label">
          <label>Текст</label>
          <MDEditor
            commands={[
              ...commands.getCommands().filter((command) => command.name !== "image"),
              insertImage,
              attachDocument,
            ]}
            value={description}
            onChange={setDescription}
            style={{width: "100%"}}
            height="50vh"
            visibleDragbar={false}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        
        <div className="news-editor__publish">
          {!newsItemId || new Date(newsItemData?.publishDate) > new Date()
            ? <details>
                <summary>Опубликовать позже</summary>
                <input
                  id="publishDate"
                  name="publishDate"
                  type="datetime-local"
                  min={formatDate(new Date())}
                  value={publishDate ? formatDate(new Date(publishDate)) : undefined}
                  onChange={(evt) => setPublishDate(evt.target.value)}
                />
              </details>
            : null
          }

          {isAdding || isModifying
            ? <p>{newsItemId ? "Создаём" : "Обновляем"} новость...</p>
            : <button type="submit">Опубликовать</button>
          }
        </div>
        
        {errorMessage && <p className="error">{errorMessage}</p>}
        {message && <p className="success">{message}</p>}
      </form>
    </main>
  );
};

export default NewsEditor;
