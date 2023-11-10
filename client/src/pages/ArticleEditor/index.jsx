import { useState } from "react";

const ArticleEditor = () => {
  const [title, setTitle] = useState("");


  return (
    <div>
      <h2>Создать новую статью</h2>
      <form>
        <label>
          Заголовок
          <input
            type="text"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
        </label>
        <label>
          Текст
          <input
            type="text"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
        </label>
        <label>
          Текст
          <input
            type="text"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
        </label>
      </form>
    </div>
  );
};

export default ArticleEditor;
