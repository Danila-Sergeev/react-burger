import AppStyles from "./App.module.css";
import React, { useReducer, useState, useEffect, useMemo } from "react";
import Header from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import {
  IngredientsData,
  idContext,
  orderContext,
  AllIngredientsData,
} from "../../services/apiContext";

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
  const [ingredients, setIngredients] = useState([]);
  const contextIngredientsValue = useMemo(() => {
    return { ingredients, setIngredients };
  }, [ingredients, setIngredients]);
  const contextDataValue = useMemo(() => {
    return { data, setData };
  }, [data, setData]);
  const [id, setId] = useState([]);
  const [order, setOrder] = useState(0);

  /* Ссылка на API */
  const url = "https://norma.nomoreparties.space/api/ingredients";

  /* Асинхронная функция для получения данных с API */
  async function getData() {
    return await fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={AppStyles.App}>
      <Header headerData={state.headerData} />
      {data.length !== 0 && (
        <main className={AppStyles.main_section}>
          <AllIngredientsData.Provider value={contextDataValue}>
            <IngredientsData.Provider value={contextIngredientsValue}>
              <idContext.Provider value={{ id, setId }}>
                <orderContext.Provider value={{ order, setOrder }}>
                  <BurgerIngredients ingredientsData={state.ingredientsData} />

                  <BurgerConstructor />
                </orderContext.Provider>
              </idContext.Provider>
            </IngredientsData.Provider>
          </AllIngredientsData.Provider>
        </main>
      )}
    </div>
  );
}

export default App;
