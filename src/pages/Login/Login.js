import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import loginStyles from "./Login.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../../services/actions/login";
import { setCookie } from "../../utils/cookie";
import { useLocation } from "react-router-dom";
import { checkUserAuth } from "../../services/actions/user";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
export default function Login() {
  const navigate = useNavigate();
  function goToNewPage() {
    navigate("/", { replace: false });
  }
  const dispatch = useDispatch();
  const location = useLocation();
  const loginDetails = useSelector((store) => store.login);
  const token = useSelector((store) => store.login.token);
  const reftoken = useSelector((store) => store.login.refreshToken);
  const isLoggedIn = useSelector((store) => store.user.isAuthChecked);
  const [password, setPassword] = React.useState("");
  const [login, setLogin] = React.useState("");
  const onChangeLogin = (e) => {
    setLogin(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  function onSubmitFrom(e) {
    e.preventDefault();
    dispatch(getLogin(login, password));
  }
  useEffect(() => {
    if (loginDetails.status) {
      setCookie("token", token);
      setCookie("reftoken", reftoken);
      setPassword("");
      setLogin("");
      dispatch(checkUserAuth());
    }
  }, [loginDetails, isLoggedIn, location.state]);

  return (
    <form onSubmit={onSubmitFrom} className={loginStyles.main}>
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
        htmlType="submit"
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
    </form>
  );
}
