import React, { useState } from "react";
import PropTypes from "prop-types";
import forgotPasswordStylesUsual from "../Login/Login.module.css";
import resetPasswordStyles from "./ResetPassword.module.css";
import { NavLink } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
export default function ResetPassword() {
  const [code, setCode] = React.useState("");
  const onChangeCode = (e) => {
    setCode(e.target.value);
  };
  const [password, setPassword] = React.useState("");
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className={forgotPasswordStylesUsual.main}>
      <h1 className="text text_type_main-large">восстановить пароль</h1>
      <PasswordInput
        placeholder="введите новый пароль"
        onChange={onChangePassword}
        value={password}
        name={"password"}
        extraClass="mt-6"
      />
      <EmailInput
        onChange={onChangeCode}
        value={code}
        name={"code"}
        placeholder="Введите код из письма"
        isIcon={true}
        extraClass=" mt-6 mb-6"
      />
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        extraClass={resetPasswordStyles.btn}
      >
        Сохранить
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
