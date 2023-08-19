import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import loginStyles from "./Login.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../../services/actions/login";
export default function ForgotPassword() {
  const navigate = useNavigate();
  function goToNewPage() {
    navigate("/", { replace: false });
  }
  const dispatch = useDispatch();
  const login1 = useSelector((store) => store.login.email);
  const fail = useSelector((store) => store.login.loginSuccess);

  const [login, setLogin] = React.useState("");
  const onChangeLogin = (e) => {
    setLogin(e.target.value);
  };
  const [password, setPassword] = React.useState("");
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  console.log(login);
  console.log(password);
  const onClick = () => {
    dispatch(getLogin(login, password));
  };
  console.log(login1);
  console.log(fail);
  useEffect(() => {
    if (fail) {
      goToNewPage();
    }
  }, [onClick]);

  return (
    <div className={loginStyles.main}>
      <h1 className="text text_type_main-large">Вход</h1>
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
        extraClass={loginStyles.btn}
      >
        Войти
      </Button>
      <p className="mt-20 text text_type_main-small">
        Вы — новый пользователь?{" "}
        <NavLink to="/register" className={loginStyles.link}>
          Зарегистрироваться
        </NavLink>
      </p>
      <p className="mt-4 text text_type_main-small">
        Забыли пароль?{" "}
        <NavLink to="/forgot-password" className={loginStyles.link}>
          Восстановить пароль
        </NavLink>
      </p>
    </div>
  );
}
