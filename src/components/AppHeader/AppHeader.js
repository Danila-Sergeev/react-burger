import React from "react";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStiles from "./AppHeader.module.css";
import Navigation from "./Navigation/Navigation";
import PropTypes from "prop-types";

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

Header.propTypes = {
  headerData: PropTypes.arrayOf(
    PropTypes.shape({
      navText_constuctor: PropTypes.string.isRequired,
      profile: PropTypes.string.isRequired,
      navText_thread: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Header;
