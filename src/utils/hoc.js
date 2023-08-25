import { NavLink, useMatch } from "react-router-dom";
import styles from "../pages/Profile/Profile.module.css";

export function CustomNavLink({ to, activeClass, children, ...props }) {
  const match = useMatch(to);
  const isActive = match ? activeClass : "";
  const baseClasses = `${styles.link} mb-4 text_type_main-medium text_color_inactive text`;

  return (
    <NavLink to={to} className={`${baseClasses} ${isActive}`} {...props}>
      {children}
    </NavLink>
  );
}
