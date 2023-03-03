import React from "react";
import AppStyles from "./App.module.css";
import Header from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
  const state = {
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
  };

  return (
    <main className={AppStyles.App}>
      <Header
        profile={state.headerData.map((el) => {
          return el.profile;
        })}
        navText_constuctor={state.headerData.map((el) => {
          return el.navText_constuctor;
        })}
        navText_thread={state.headerData.map((el) => {
          return el.navText_thread;
        })}
      ></Header>
      <section className={AppStyles.main_section}>
        <BurgerIngredients
          title={state.ingredientsData.map((el) => {
            return el.title;
          })}
          firstNavText={state.ingredientsData.map((el) => {
            return el.firstNavText;
          })}
          secNavText={state.ingredientsData.map((el) => {
            return el.secNavText;
          })}
          thrdNavText={state.ingredientsData.map((el) => {
            return el.thrdNavText;
          })}
          frstElement={state.ingredientsData.map((el) => {
            return el.frstElement;
          })}
          sndElement={state.ingredientsData.map((el) => {
            return el.sndElement;
          })}
          thrdElement={state.ingredientsData.map((el) => {
            return el.thrdElement;
          })}
        ></BurgerIngredients>
        <BurgerConstructor button={"Оформить заказ"}></BurgerConstructor>
      </section>
    </main>
  );
}

export default App;
