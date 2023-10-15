import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";

interface IProtectedRouteElement {
  element: any;
}

const ProtectedRouteElement: FC<IProtectedRouteElement> = ({ element }) => {
  const isLoggedIn = useSelector((store) => store.user.isAuthChecked);
  const authError = useSelector((store) => store.user.authError);

  const location = useLocation();

  if (!isLoggedIn || authError === "You should be authorized") {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRouteElement;
