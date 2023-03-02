import React from "react";
import "./App.css";
import Header from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

class App extends React.Component {
  render() {
    const headerData = {
      profile: "Личный кабинет",
      navText_constuctor: "Конструктор",
      navText_thread: "Лента заказов",
    };
    const ingredientsData = {
      title: "Соберите бургер",
      firstNavText: "Булки",
      secNavText: "Соусы",
      thrdNavText: "Начинки",
      frstElement: "Булки",
      sndElement: "Соусы",
      thrdElement: "Начинки",
    };
    return (
      <div className="App">
        <Header headerData={headerData}></Header>
        <BurgerIngredients
          title={ingredientsData.title}
          firstNavText={ingredientsData.firstNavText}
          secNavText={ingredientsData.secNavText}
          thrdNavText={ingredientsData.thrdNavText}
          frstElement={ingredientsData.frstElement}
          sndElement={ingredientsData.sndElement}
          thrdElement={ingredientsData.thrdElement}
        ></BurgerIngredients>
      </div>
    );
  }
}

export default App;
