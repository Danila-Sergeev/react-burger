import { Navigate, useLocation } from "react-router-dom";
import { useTypedSelector } from "../../utils/hoc";
import { FC, ReactElement } from "react";

interface IPublicRouteElement {
  element: ReactElement | null;
}

const PublicRouteElement: FC<IPublicRouteElement> = ({ element }) => {
  const isLoggedIn = useTypedSelector((store) => store.user.isAuthChecked);
  const location = useLocation();

  if (isLoggedIn) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  return element;
};

export default PublicRouteElement;
