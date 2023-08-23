import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import profiledStyles from "./Profile.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../services/reducers/rootReducer";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie, deleteCookie } from "../../utils/cookie";
import { getUser, setUser } from "../../services/actions/user";
import { logoutApi, isAuthChecked } from "../../services/actions/user";
import { logoutStatus } from "../../services/actions/login";

export default function Profile() {
  const dispatch = useDispatch();
  const name = useSelector((store) => store.user.name);
  const email = useSelector((store) => store.user.email);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const [password, setPassword] = React.useState("denchic12");
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const [newName, setNewName] = React.useState("");
  const onChangeName = (e) => {
    setNewName(e.target.value);
  };
  const [newEmail, setNewEmail] = React.useState("");
  const onChangeEmail = (e) => {
    setNewEmail(e.target.value);
  };
  const onSaveClick = () => {
    dispatch(setUser(newName, newEmail));
  };
  const onCancelClick = () => {
    setNewEmail(email);
    setNewName(name);
  };
  const onClickExit = () => {
    dispatch(logoutStatus());
    dispatch(isAuthChecked(false));
    dispatch(logoutApi());
  };
  useMemo(() => {
    setNewEmail(email);
    setNewName(name);
  }, [name, email]);

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
          onClick={onClickExit}
        >
          Выход
        </NavLink>
        <p
          className={`${profiledStyles.info} text_color_inactive mt-20 text text_type_main-small`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </ul>
      <div className={profiledStyles.inputBox}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChangeName}
          icon={"ProfileIcon"}
          value={newName}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
          disabled={false}
        />
        <EmailInput
          onChange={onChangeEmail}
          value={newEmail}
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
        <div className={profiledStyles.btnBox}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={onCancelClick}
          >
            Отмена
          </Button>
          <Button
            onClick={onSaveClick}
            htmlType="button"
            type="primary"
            size="medium"
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}
