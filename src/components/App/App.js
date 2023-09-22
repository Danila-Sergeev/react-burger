import AppStyles from "./App.module.css";
import React, { useState, useEffect } from "react";
import Header from "../AppHeader/AppHeader";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Profile from "../../pages/Profile/Profile";
import { getCookie } from "../../utils/cookie";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import PublicRouteElement from "../PublicRouteElement/PublicRouteElement";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { NotFoundPage } from "../../pages/notFoundPage/notFoundPage";
import { HomePage } from "../../pages/HomePage/HomePage";
import { getIngredients } from "../../services/actions/Ingredients";
import { ISAUTH_CHECKED } from "../../services/actions/user";
import { FeedPage } from "../../pages/Feed/Feed";
import { ModalOrderPage } from "../../pages/ModalOrderPage/ModalOrderPage";
import { UserOrdersPage } from "../../pages/UserOrdersPage/UserOrdersPage";
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const [state, setState] = useState({
    headerData: [
      {
        profile: "Личный кабинет",
        navText_constuctor: "Конструктор",
        navText_thread: "Лента заказов",
      },
    ],
  });
  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  /* Обработчик состояния данных с API */
  useEffect(() => {
    const accessToken = getCookie("token");
    const refreshToken = getCookie("reftoken");
    if (accessToken && refreshToken) {
      dispatch({ type: ISAUTH_CHECKED, payload: true });
    }
  }, [dispatch]);
  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  return (
    <div className={AppStyles.App}>
      <Header headerData={state.headerData} />
      <main className={AppStyles.main_section}>
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />}></Route>

          <Route
            path="/ingredients/:ingredientId"
            element={<IngredientDetails fule={true} />}
          />
          <Route path="/orders/:id" element={<ModalOrderPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:id" element={<ModalOrderPage />} />

          <Route
            path="/profile/*"
            element={<ProtectedRouteElement element={<Profile />} />}
          >
            <Route path="orders" element={<UserOrdersPage />} />
          </Route>

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
