import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/userSlice";
import { useAddNewsItemMutation, useModifyNewsItemMutation } from "../../redux/api/newsApi";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { useCachedNewsItem } from "../../utils/useCachedNewsItem";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import rehypeSanitize from "rehype-sanitize";
import "./styles.scss";


const NewsEditor = () => {
  const { newsItemId } = useParams();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  let newsItemData = useCachedNewsItem(newsItemId, user._id);

  const [title, setTitle] = useState(newsItemData?.title || "");
  const [description, setDescription] = useState(newsItemData?.description || "");
  const [publishDate, setPublishDate] = useState(newsItemData?.publishDate || "");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({title: "", description: ""});

  const inputRef = useRef(null);

  let publishDateFormatted = "";
  if (publishDate) {
    const timezoneOffset = new Date(publishDate).getTimezoneOffset() * 60 * 1000; // in milliseconds
    const localPublishDate = new Date(new Date(publishDate).getTime() - timezoneOffset);
    publishDateFormatted = localPublishDate.toISOString().slice(0, 16);
  }

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

    if (newsItemId && newsItemData) {
      modifyNewsItem({id: newsItemId, data: {title, description, publishDate}})
    } else {
      addNewsItem({title, description, publishDate});
    }   
  };

  const addImage = {
    ...commands.image,
    render: (command, disabled, executeCommand) => {

      const onChange = async (evt) => {
        if (evt.target.files.length && !evt.target.files[0]?.type.match("image.*")) {
          alert("Допускаются только изображения");
          return;
        }

        command.file = evt.target.files[0];
        executeCommand(command, command.groupName);
      };
      
      return (
        <>
          <input
            ref={inputRef}
            style={{display: "none"}}
            type="file"
            id="image"
            accept="image/*"
            onChange={onChange}
          />
          <button
            type="button"
            aria-label="Insert image"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
          >
            {commands.image.icon}
          </button>
        </>
      )
    },
    execute: async (state, api) => {
      if (!state.command.file) return;

      const storageRef = ref(storage, `images/${state.command.file.name + v4()}`); // for files to have different names even if users choose the same ones
      const uploadTask = uploadBytesResumable(storageRef, state.command.file);

      uploadTask.on("state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log(progress);
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(url => api.replaceSelection(`![](${url})\n`));
        }
      );
    },
  };

  return (
    <main className="news-editor">
      <h2 className="news-editor__title">{newsItemId ? "Oтредактировать" : "Создать новую"} статью</h2>
      <form className="news-editor__form" onSubmit={handleSubmit}>
        <label>
          Заголовок
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </label>

        {/* <label>
          Прикрепить файл
          <input type="file" id="document" accept=".docx, .doc, .pdf, .txt" onChange={(evt) => setDocumentUpload(evt.target.files[0])}/>
        </label> */}

        <label>
          Текст
          <MDEditor
            commands={[...commands.getCommands(), addImage]}
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
        </label>
        
        <div className="news-editor__publish">
          {!newsItemId || new Date(newsItemData?.publishDate) > new Date()
            ? <details>
                <summary>Опубликовать позже</summary>
                <input
                  id="publishDate"
                  name="publishDate"
                  type="datetime-local"
                  min={new Date().toISOString().slice(0, 16)}
                  value={publishDateFormatted}
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
