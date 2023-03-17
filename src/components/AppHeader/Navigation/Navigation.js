import React from "react";
import headerStiles from "../AppHeader.module.css";
import PropTypes from "prop-types";

function Navigation(props) {
  return (
    <button
      className={`${headerStiles.navigation_element} mr-5 ml-5 mt-4 mb-4`}
    >
      <props.icon />
      <p className="pl-2 text text_type_main-default">{props.textElement}</p>
    </button>
  );
}
Navigation.propTypes = {
  textElement: PropTypes.array.isRequired,
  icon: PropTypes.func.isRequired,
};

export default Navigation;
