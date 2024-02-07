import React, { FC } from "react";
import headerStiles from "./AppHeader.module.css";
import Navigation from "./Navigation/Navigation";

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
  headerData?: HeaderDataItem[];
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
            textElement="Конструктор"
          ></Navigation>
          <Navigation
            path={"feed"}
            icon={ListIcon}
            textElement="Лента заказов"
          />
        </nav>

        <Navigation
          path={"profile"}
          icon={ProfileIcon}
          textElement="Личный кабинет"
        />
      </div>
    </header>
  );
};

export default Header;
