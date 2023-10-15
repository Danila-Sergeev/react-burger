import React, { FC } from "react";
import headerStiles from "./AppHeader.module.css";
import Navigation from "./Navigation/Navigation";
import PropTypes from "prop-types";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

interface HeaderDataItem {
  profile: string;
  navText_constuctor: string;
  navText_thread: string;
}
interface HeaderProps {
  items?: string[];
  path?: string;
  icon?: any;
  textElement?: any;
  headerData?: HeaderDataItem[];
  className?: string;
}

const Header: FC<HeaderProps> = () => {
  return (
    <header className={`${headerStiles.header}`}>
      <Logo />
      <div className={headerStiles.main_info}>
        <nav className={`${headerStiles.navigation_elements}`}>
          {/* Компонент Navigation */}
          <Navigation
            className="mr-5"
            path={""}
            icon={BurgerIcon}
            textElement="Личный кабинет"
          ></Navigation>
          <Navigation path={"feed"} icon={ListIcon} textElement="Конструктор" />
        </nav>

        <Navigation
          path={"profile"}
          icon={ProfileIcon}
          textElement="Лента заказов"
        />
      </div>
    </header>
  );
};

export default Header;
