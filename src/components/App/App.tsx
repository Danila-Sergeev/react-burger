import AppStyles from "./App.module.css";
import React, { useCallback, useState, useEffect } from "react";
import Header from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

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
      .then((data) => setData(data.data))
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
          <BurgerIngredients
            ingredientsData={state.ingredientsData}
            items={data}
          />
          <BurgerConstructor items={data} />
        </main>
      )}
    </div>
  );
}

export default App;
