import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import forgotPasswordStylesUsual from "../Login/Login.module.css";
import forgotPasswordStyles from "./ForgotPassword.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { getPassword } from "../../services/actions/forgotPassword";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../utils/hoc";
export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const success = useSelector((store) => store.forgotPassword.success);
  const { values, handleChange, setValues } = useForm({
    email: "",
  });
  const onClick = () => {
    dispatch(getPassword(values.email));
  };
  function goToNewPage() {
    navigate("/reset-password", { replace: false });
  }
  useEffect(() => {
    if (success) {
      goToNewPage();
    }
  }, [onClick]);
  return (
    <div className={forgotPasswordStylesUsual.main}>
      <h1 className="text text_type_main-large">Восстановление пароля</h1>
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={"email"}
        isIcon={false}
        placeholder="Укажите e-mail"
        extraClass="mb-6 mt-6"
      />
      <Button
        onClick={onClick}
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
