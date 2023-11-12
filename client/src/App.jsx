import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./redux/userSlice";
import { useGetMeQuery } from "./redux/api/userApi/getUserApi";
import Cookies from "js-cookie";

const Register = lazy(()=> import("./pages/Register"));
const Activation = lazy(()=> import("./pages/Activation"));
const Login = lazy(()=> import("./pages/Login"));
const ArticleList= lazy(()=> import("./pages/ArticleList"));
const ArticleEditor = lazy(()=> import("./pages/ArticleEditor"));


function App() {
  const isLoggedIn = Cookies.get('loggedIn');

  const user = useSelector(selectCurrentUser);

  // fetching user data only if we have cookies.loggedIn === "true"
  const {isLoading, error} = useGetMeQuery(undefined, {skip: !isLoggedIn || isLoggedIn === "false"});

  return isLoading ? <p>Загрузка...</p>
    : error
      ? <p>Произошла ошибка: {error.message}</p>
      : <div>
          {/* <a href="/articles/add">Add new article</a> */}

          <BrowserRouter>
            <Suspense fallback="loading...">
              <Routes>
                <Route path="/" element={user ? <Navigate to= "/dashboard" /> : <ArticleList />} />
                {/* <Route path="/dashboard" element={user ? <Navigate to="/" /> : <Dashboard />} /> */}
                <Route path="/articles/add" element={<ArticleEditor />} />
                <Route path="/articles/:articleId/edit" element={<ArticleEditor />} />

                <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
                <Route path="/activation" element={user ? <Navigate to="/" /> : <Activation />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </div>
}

export default App;
