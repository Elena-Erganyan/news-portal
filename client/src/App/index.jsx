import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/userSlice";
import { useGetMeQuery } from "../redux/api/userApi/getUserApi";
import Cookies from "js-cookie";
import { getErrorMessage } from "../utils/getErrorMessage";
import Header from "../components/Header";
import "./styles.scss";

const Register = lazy(()=> import("../pages/Register"));
const Activation = lazy(()=> import("../pages/Activation"));
const Login = lazy(()=> import("../pages/Login"));
const Dashboard = lazy(()=> import("../pages/Dashboard"));
const NewsList= lazy(()=> import("../pages/NewsList"));
const NewsPage = lazy(()=> import("../pages/NewsPage"));
const NewsEditor = lazy(()=> import("../pages/NewsEditor"));


function App() {
  const isLoggedIn = Cookies.get('loggedIn');

  const user = useSelector(selectCurrentUser);

  // fetching user data only if we have cookies.loggedIn === "true"
  const {isLoading, error} = useGetMeQuery(undefined, {skip: !isLoggedIn || isLoggedIn === "false"});

  return isLoading ? <p>Загрузка...</p>
    : error
      ? <p>Произошла ошибка: {getErrorMessage(error)}</p>
      : <div className="App">
          <BrowserRouter>
            <Suspense fallback="loading...">
              <Header isLoading={isLoading} />
              <Routes>
                <Route path="/" element={user ? <Dashboard /> : <NewsList />} />
                <Route path="/news" element={<NewsList />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
                <Route path="/news/add" element={<NewsEditor />} />
                <Route path="/news/:newsItemId" element={<NewsPage />} />
                <Route path="/news/:newsItemId/edit" element={<NewsEditor key="editing" />} />
                <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
                <Route path="/activation" element={user ? <Navigate to="/" /> : <Activation />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </div>
}

export default App;
