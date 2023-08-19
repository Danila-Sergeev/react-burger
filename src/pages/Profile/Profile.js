import React, { useState } from "react";
import PropTypes from "prop-types";
import profiledStyles from "./Profile.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../services/reducers/rootReducer";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
export default function Profile() {
  const [login, setLogin] = React.useState("danilasergeev2003@icloud.com");
  const onChangeLogin = (e) => {
    setLogin(e.target.value);
  };
  const [password, setPassword] = React.useState("denchic12");
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const [name, setName] = React.useState("Danila");
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <div className={profiledStyles.main}>
      <ul className={profiledStyles.list}>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? `${profiledStyles.activeLink} mb-4 text text_type_main-medium`
              : `${profiledStyles.link} mb-4 text text_type_main-medium text_color_inactive`
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${profiledStyles.activeLink} mb-4 text text_type_main-medium`
              : `${profiledStyles.link} mb-4 text text_type_main-medium text_color_inactive`
          }
        >
          История заказов
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${profiledStyles.activeLink} mb-4 text text_type_main-medium`
              : `mb-4 text  text_type_main-medium text_color_inactive ${profiledStyles.link}`
          }
        >
          Выход
        </NavLink>
        <p
          className={`${profiledStyles.info} text_color_inactive mt-20 text text_type_main-small`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </ul>
      <div>
        <EmailInput
          //onChange={onChangeName}
          value={name}
          name={"name"}
          placeholder="Имя"
          isIcon={true}
          extraClass=" mt-6"
        />
        <EmailInput
          // onChange={onChangeLogin}
          value={login}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-6 mt-6"
        />
        <PasswordInput
          // onChange={onChangePassword}
          value={password}
          name={"password"}
          extraClass="mb-6"
          icon="EditIcon"
        />
      </div>
    </div>
  );
}
