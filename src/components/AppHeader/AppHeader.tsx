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
}

const Header: FC<HeaderProps> = (props) => {
  return (
    <header className={`${headerStiles.header}`}>
      <Logo />
      <div className={headerStiles.main_info}>
        <nav className={`${headerStiles.navigation_elements}`}>
          {/* Компонент Navigation */}
          <Link
            className={"mr-5"}
            to={""}
            /*  icon={BurgerIcon} */
            /* textElement={props.headerData.map((el) => {
              return el.navText_constuctor;
            })} */
          ></Link>
          <Link
            to={"feed"}
            /*  icon={ListIcon} */
            /*   textElement={props.headerData.map((el: HeaderDataItem) => {
              return el.navText_thread;
            })} */
          />
        </nav>

        <Link
          to={"profile"}
          /*  icon={ProfileIcon} */
          /* textElement={props.headerData.map((el: HeaderDataItem) => {
            return el.profile;
          })} */
        />
      </div>
    </header>
  );
};

export default Header;
