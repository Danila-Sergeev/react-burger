import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import profiledStyles from "./Profile.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NotFoundPage } from "../notFoundPage/notFoundPage";
import { getUser, setUser } from "../../services/actions/user";
import { logoutApi, isAuthChecked } from "../../services/actions/user";
import { logoutStatus } from "../../services/actions/login";
import { CustomNavLink } from "../../utils/hoc";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
export default function Profile() {
  const dispatch = useDispatch();
  const name = useSelector((store) => store.user.name);
  const email = useSelector((store) => store.user.email);
  const [password, setPassword] = React.useState("denchic12");
  const [newName, setNewName] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");

  let { "*": subpath } = useParams();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeName = (e) => {
    setNewName(e.target.value);
  };
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
        <CustomNavLink
          to="/profile"
          activeClass={`${profiledStyles.activeLink} mb-4 text text_type_main-medium`}
        >
          Профиль
        </CustomNavLink>
        <CustomNavLink
          to="/profile/orders"
          activeClass={`${profiledStyles.activeLink} mb-4 text text_type_main-medium`}
        >
          История заказов
        </CustomNavLink>
        <CustomNavLink
          to="/login"
          activeClass={`${profiledStyles.activeLink} mb-4 text text_type_main-medium`}
          onClick={onClickExit}
        >
          Выход
        </CustomNavLink>
        <p
          className={`${profiledStyles.info} text_color_inactive mt-20 text text_type_main-small`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </ul>

      <div className={profiledStyles.inputBox}>
        {subpath === "orders" ? (
          <NotFoundPage />
        ) : (
          <form>
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
              onChange={onChangePassword}
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
          </form>
        )}
      </div>
    </div>
  );
}
