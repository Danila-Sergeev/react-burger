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
      <div className={headerStiles.main_info}>
        <nav className={`${headerStiles.navigation_elements}`}>
          {/* Компонент Navigation */}
          <Navigation
            className="mr-5"
            icon={BurgerIcon}
            textElement={props.navText_constuctor}
          />
          <Navigation icon={ListIcon} textElement={props.navText_thread} />
        </nav>
        <Logo />
        <button className={headerStiles.profile_button}>
          <ProfileIcon />
          <p className="pl-2 text text_type_main-default">{props.profile}</p>
        </button>
      </div>
    </header>
  );
}

export default Header;
