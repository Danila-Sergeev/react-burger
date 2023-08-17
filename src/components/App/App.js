import AppStyles from "./App.module.css";
import React, { useReducer, useState, useEffect, useMemo } from "react";
import Header from "../AppHeader/AppHeader";
import { Routes, Route } from "react-router-dom";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/Ingredients";

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

  /* Ссылка на API */

  /* Асинхронная функция для получения данных с API

  /*  useEffect(() => {
    getData();
  }, []); */

  return (
    <div className={AppStyles.App}>
      <Header headerData={state.headerData} />

      <main className={AppStyles.main_section}>
        <Routes>
          <Route
            path="/"
            element={
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients ingredientsData={state.ingredientsData} />
                <BurgerConstructor />
              </DndProvider>
            }
          ></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
