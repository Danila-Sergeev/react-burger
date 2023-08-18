import React from "react";
import headerStiles from "../AppHeader.module.css";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function Navigation(props) {
  return (
    <NavLink
      to={`/${props.path}`}
      className={`${headerStiles.navigation_element} mr-5 ml-5 mt-4 mb-4`}
    >
      <props.icon />
      <p className="pl-2 text text_type_main-default">{props.textElement}</p>
    </NavLink>
  );
}
Navigation.propTypes = {
  textElement: PropTypes.array.isRequired,
  icon: PropTypes.func.isRequired,
};

export default Navigation;
