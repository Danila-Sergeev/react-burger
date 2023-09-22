import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import profiledStyles from "./Profile.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NotFoundPage } from "../notFoundPage/notFoundPage";
import { getUser, setUser } from "../../services/actions/user";
import { logoutApi, isAuthChecked } from "../../services/actions/user";
import { logoutStatus } from "../../services/actions/login";
import { CustomNavLink, useForm } from "../../utils/hoc";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { UserOrdersPage } from "../UserOrdersPage/UserOrdersPage";
export default function Profile() {
  const dispatch = useDispatch();
  const name = useSelector((store) => store.user.name);
  const email = useSelector((store) => store.user.email);

  let { "*": subpath } = useParams();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    name: "",
  });

  const onSaveClick = () => {
    dispatch(setUser(values.name, values.email));
  };
  const onCancelClick = () => {
    setValues({
      email: email,
      name: name,
      password: "denchic12",
    });
  };
  const onClickExit = () => {
    dispatch(logoutStatus());
    dispatch(isAuthChecked(false));
    dispatch(logoutApi());
  };
  useMemo(() => {
    setValues({ email: email, password: "denchic12", name: name });
  }, [name, email]);

  return (
    <section className={profiledStyles.main}>
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
          <UserOrdersPage />
        ) : (
          <form>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={handleChange}
              icon={"ProfileIcon"}
              value={values.name}
              name={"name"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1"
              disabled={false}
            />
            <EmailInput
              onChange={handleChange}
              value={values.email}
              name={"email"}
              placeholder="Логин"
              isIcon={true}
              extraClass="mb-6 mt-6"
            />
            <PasswordInput
              onChange={handleChange}
              value={values.password}
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
    </section>
  );
}
