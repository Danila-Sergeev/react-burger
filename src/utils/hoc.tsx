import { NavLink, useMatch } from "react-router-dom";
import styles from "../pages/Profile/Profile.module.css";
import { useState, FC } from "react";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { AppDispatch, RootState } from "../services/types";

interface ICustomNavLink {
  to: string;
  activeClass: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const CustomNavLink: FC<ICustomNavLink> = ({
  to,
  activeClass,
  children,
  ...props
}) => {
  const match = useMatch(to);
  const isActive = match ? activeClass : "";
  const baseClasses = `${styles.link} mb-4 text_type_main-medium text_color_inactive text`;

  return (
    <NavLink to={to} className={`${baseClasses} ${isActive}`} {...props}>
      {children}
    </NavLink>
  );
};
export function useForm(inputValues: any) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}

export const useTypedDispatch = () => dispatchHook<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = selectorHook;
