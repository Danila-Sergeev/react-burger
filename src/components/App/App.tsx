import AppStyles from "./App.module.css";
import React, { useCallback, useState, useEffect } from "react";
import Header from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";

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

  const [data, setData] = useState([]);

  const url = "https://norma.nomoreparties.space/api/ingredients";

  async function getData() {
    return await fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const [modal, setModal] = useState({ visible: false });

  const handleOpenModal = () => {
    setModal({ visible: true });
  };

  const handleCloseModal = () => {
    setModal({ visible: false });
  };

  const modals = <Modal header="Внимание!" onClose={handleCloseModal}></Modal>;

  return (
    <main className={AppStyles.App}>
      <Header headerData={state.headerData} />
      <section className={AppStyles.main_section}>
        <BurgerIngredients
          ingredientsData={state.ingredientsData}
          items={data}
        />
        <BurgerConstructor items={data} />
      </section>
      <div style={{ overflow: "hidden" }}>
        <button onClick={handleOpenModal}>Открыть модальное окно</button>
        {modal.visible && modals}
      </div>
    </main>
  );
}

export default App;
