import AppStyles from "./App.module.css";
import React, { useReducer, useState, useEffect, useMemo } from "react";
import Header from "../AppHeader/AppHeader";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/Ingredients";

import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Profile from "../../pages/Profile/Profile";
import { getCookie, setCookie } from "../../utils/cookie";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import PublicRouteElement from "../PublicRouteElement/PublicRouteElement";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { NotFoundPage } from "../../pages/notFoundPage/notFoundPage";
import { HomePage } from "../../pages/HomePage/HomePage";
function App() {
  const [state, setState] = useState({
    headerData: [
      {
        profile: "Личный кабинет",
        navText_constuctor: "Конструктор",
        navText_thread: "Лента заказов",
      },
    ],
    ingredientsData: [
      {
        title: "Соберите бургер",
        firstNavText: "Булки",
        secNavText: "Соусы",
        thrdNavText: "Начинки",
        frstElement: "Булки",
        sndElement: "Соусы",
        thrdElement: "Начинки",
      },
    ],
  });
  /* Обработчик состояния данных с API */
  const [data, setData] = useState([]);
  //const [ingredients, setIngredients] = useState([]);
  /* const contextIngredientsValue = useMemo(() => {
    return { ingredients, setIngredients };
  }, [ingredients, setIngredients]); */
  const contextDataValue = useMemo(() => {
    return { data, setData };
  }, [data, setData]);
  const [id, setId] = useState([]);
  const [order, setOrder] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = getCookie("token");
    const refreshToken = getCookie("reftoken");

    if (accessToken && refreshToken) {
      dispatch({ type: "ISAUTH_CHECKED", payload: true });
    }
  }, [dispatch]);
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  return (
    <div className={AppStyles.App}>
      <Header headerData={state.headerData} />

      <main className={AppStyles.main_section}>
        <Routes location={background || location}>
          <Route
            path="/"
            element={<HomePage ingredientsData={state.ingredientsData} />}
          ></Route>

          <Route
            path="/ingredients/:ingredientId"
            element={<IngredientDetails fule={true} />}
          />
          <Route
            path="/profile/*"
            element={<ProtectedRouteElement element={<Profile />} />}
          ></Route>
          <Route
            path="/login"
            element={<PublicRouteElement element={<Login />} />}
          ></Route>
          <Route
            path="/register"
            element={<PublicRouteElement element={<Register />} />}
          ></Route>
          <Route
            path="/forgot-password"
            element={<PublicRouteElement element={<ForgotPassword />} />}
          ></Route>
          <Route
            path="/reset-password"
            element={<PublicRouteElement element={<ResetPassword />} />}
          ></Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal onClose={handleModalClose}>
                <IngredientDetails fule={false} />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
