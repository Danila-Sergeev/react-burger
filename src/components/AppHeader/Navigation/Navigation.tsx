import React, { FC } from "react";
import headerStiles from "../AppHeader.module.css";
import PropTypes from "prop-types";
import { NavLink, useMatch } from "react-router-dom";

interface Inavigation {
  className?: string;
  path?: string;
  icon?: any;
  textElement: any;
}

const Navigation: FC<Inavigation> = (props) => {
  const isProfile = useMatch(`/${props.path}/*`);
  return (
    <NavLink
      className={`${headerStiles.navigation_element} mr-5 ml-5 mt-4 mb-4`}
      to={`/${props.path}`}
    >
      <props.icon type={isProfile !== null ? "primary" : "secondary"} />
      <p
        className={
          isProfile !== null
            ? "pl-2 text text_type_main-default"
            : "pl-2 text text_type_main-default text_color_inactive"
        }
      >
        {props.textElement}
      </p>
    </NavLink>
  );
};
Navigation.propTypes = {
  textElement: PropTypes.array.isRequired,
  icon: PropTypes.func.isRequired,
};

export default Navigation;
