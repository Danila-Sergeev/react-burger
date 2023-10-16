import React, { useEffect, useState, FC } from "react";
import PropTypes from "prop-types";
import loginStyles from "./Login.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../../services/actions/login";
import { setCookie } from "../../utils/cookie";
import { useLocation } from "react-router-dom";
import { checkUserAuth } from "../../services/actions/user";
import { useTypedDispatch, useTypedSelector } from "../../utils/hoc";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../utils/hoc";
export const Login: FC = () => {
  const navigate = useNavigate();
  function goToNewPage() {
    navigate("/", { replace: false });
  }
  const dispatch = useTypedDispatch();
  const location = useLocation();
  const loginDetails = useTypedSelector((store) => store.login);
  const token = useTypedSelector((store) => store.login.token);
  const reftoken = useTypedSelector((store) => store.login.refreshToken);
  const isLoggedIn = useTypedSelector((store) => store.user.isAuthChecked);
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  function onSubmitFrom(e: any) {
    e.preventDefault();
    dispatch(getLogin(values.email, values.password));
  }
  useEffect(() => {
    if (loginDetails.status) {
      setCookie("token", token);
      setCookie("reftoken", reftoken);
      setValues("");
      dispatch(checkUserAuth());
    }
  }, [loginDetails, isLoggedIn, location.state]);

  return (
    <form onSubmit={onSubmitFrom} className={loginStyles.main}>
      <h1 className="text text_type_main-large">Вход</h1>
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={"email"}
        isIcon={false}
        extraClass="mb-6 mt-6"
      />
      <PasswordInput
        onChange={handleChange}
        value={values.password}
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
};
