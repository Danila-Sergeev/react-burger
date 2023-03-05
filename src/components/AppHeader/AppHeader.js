import React from "react";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStiles from "./AppHeader.module.css";
import Navigation from "./Navigation/Navigation";

//Компонент header
function Header(props) {
  return (
    <header className={`${headerStiles.header}`}>
      <Logo />
      <div className={headerStiles.main_info}>
        <nav className={`${headerStiles.navigation_elements}`}>
          {/* Компонент Navigation */}
          <Navigation
            className="mr-5"
            icon={BurgerIcon}
            textElement={props.headerData.map((el) => {
              return el.navText_constuctor;
            })}
          />
          <Navigation
            icon={ListIcon}
            textElement={props.headerData.map((el) => {
              return el.navText_thread;
            })}
          />
        </nav>

        <button className={headerStiles.profile_button}>
          <ProfileIcon />
          <p className="pl-2 text text_type_main-default">
            {props.headerData.map((el) => {
              return el.profile;
            })}
          </p>
        </button>
      </div>
    </header>
  );
}

export default Header;
