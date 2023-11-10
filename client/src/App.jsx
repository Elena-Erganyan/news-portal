import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const ArticleList= lazy(()=> import("./pages/ArticleList"));
const ArticleEditor = lazy(()=> import("./pages/ArticleEditor"));


function App() {

  return (
    <div>
      <a href="/articles/add">Add new article</a>

      <BrowserRouter>
        <Suspense fallback="loading...">
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles/add" element={<ArticleEditor />} />
            <Route path="/articles/:articleId/edit" element={<ArticleEditor />} />

            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/register" element={<Register />} /> */}
            {/* <Route path="/activation" element={user ? <Navigate to="/" /> : <ActivationMessage />} /> */}
            {/* <Route path="*" element={<NotFound />}/> */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App;
