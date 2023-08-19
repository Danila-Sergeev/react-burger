import React, { useState } from "react";
import PropTypes from "prop-types";
import registerStyles from "../Login/Login.module.css";
import { NavLink } from "react-router-dom";
import { getRegister } from "../../services/actions/register";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
export default function Register() {
  const dispatch = useDispatch();

  const [login, setLogin] = React.useState("");
  const onChangeLogin = (e) => {
    setLogin(e.target.value);
  };
  const [password, setPassword] = React.useState("");
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const [name, setName] = React.useState("");
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onClick = () => {
    dispatch(getRegister(login, password, name));
  };

  return (
    <div className={registerStyles.main}>
      <h1 className="text text_type_main-large">Регистрация</h1>
      <EmailInput
        onChange={onChangeName}
        value={name}
        name={"name"}
        placeholder="Имя"
        isIcon={false}
        extraClass=" mt-6"
      />
      <EmailInput
        onChange={onChangeLogin}
        value={login}
        name={"email"}
        isIcon={false}
        extraClass="mb-6 mt-6"
      />
      <PasswordInput
        onChange={onChangePassword}
        value={password}
        name={"password"}
        extraClass="mb-6"
      />
      <Button
        onClick={onClick}
        htmlType="button"
        type="primary"
        size="medium"
        extraClass={registerStyles.btn}
      >
        Войти
      </Button>
      <p className="mt-20 text text_type_main-small">
        Уже зарегистрированы?{" "}
        <NavLink to="/login" className={registerStyles.link}>
          Войти
        </NavLink>
      </p>
    </div>
  );
}
