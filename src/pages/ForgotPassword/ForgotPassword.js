import React, { useState } from "react";
import PropTypes from "prop-types";
import forgotPasswordStylesUsual from "../Login/Login.module.css";
import forgotPasswordStyles from "./ForgotPassword.module.css";
import { NavLink } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
export default function ForgotPassword() {
  const [login, setLogin] = React.useState("");
  const onChangeLogin = (e) => {
    setLogin(e.target.value);
  };
  return (
    <div className={forgotPasswordStylesUsual.main}>
      <h1 className="text text_type_main-large">Восстановление пароля</h1>
      <EmailInput
        onChange={onChangeLogin}
        value={login}
        name={"email"}
        isIcon={false}
        placeholder="Укажите e-mail"
        extraClass="mb-6 mt-6"
      />
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        extraClass={forgotPasswordStyles.btn}
      >
        Восстановить
      </Button>
      <p className="mt-20 text text_type_main-small">
        Вспомнили пароль?{" "}
        <NavLink to="/login" className={forgotPasswordStylesUsual.link}>
          Войти
        </NavLink>
      </p>
    </div>
  );
}
