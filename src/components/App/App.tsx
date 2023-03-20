import AppStyles from "./App.module.css";
import Header from "../AppHeader/AppHeader";
import PropTypes from "prop-types";
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
      <Header headerData={state.headerData} />
      <section className={AppStyles.main_section}>
        <BurgerIngredients ingredientsData={state.ingredientsData} />
        <BurgerConstructor />
      </section>
    </main>
  );
}

App.propTypes = {
  App: PropTypes.element,
  state: PropTypes.objectOf(PropTypes.string),
};

export default App;
