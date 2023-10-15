import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";

interface IPublicRouteElement {
  element: any;
}

const PublicRouteElement: FC<IPublicRouteElement> = ({ element }) => {
  const isLoggedIn = useSelector((store) => store.user.isAuthChecked);
  const location = useLocation();

  if (isLoggedIn) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  return element;
};

PublicRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PublicRouteElement;
