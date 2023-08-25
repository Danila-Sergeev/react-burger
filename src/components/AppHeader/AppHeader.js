import React from "react";
import headerStiles from "./AppHeader.module.css";
import Navigation from "./Navigation/Navigation";
import PropTypes from "prop-types";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Header(props) {
  return (
    <header className={`${headerStiles.header}`}>
      <Logo />
      <div className={headerStiles.main_info}>
        <nav className={`${headerStiles.navigation_elements}`}>
          {/* Компонент Navigation */}
          <Navigation
            className={"mr-5"}
            path={""}
            icon={BurgerIcon}
            textElement={props.headerData.map((el) => {
              return el.navText_constuctor;
            })}
          >
            hjhhjhjhjhjhjhj
          </Navigation>
          <Navigation
            path={"listOrders"}
            icon={ListIcon}
            textElement={props.headerData.map((el) => {
              return el.navText_thread;
            })}
          />
        </nav>

        <Navigation
          path={"profile"}
          icon={ProfileIcon}
          textElement={props.headerData.map((el) => {
            return el.profile;
          })}
        />
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
