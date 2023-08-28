import React, { useEffect } from "react";
import PropTypes from "prop-types";
import forgotPasswordStylesUsual from "../Login/Login.module.css";
import resetPasswordStyles from "./ResetPassword.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getResetPassword } from "../../services/actions/resetPassword";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../utils/hoc";
export default function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const success = useSelector((store) => store.resetPassword.success);

  const { values, handleChange, setValues } = useForm({
    password: "",
    code: "",
  });

  const onClick = () => {
    dispatch(getResetPassword(values.password, values.code));
  };
  function goToNewPage() {
    navigate("/login", { replace: false });
  }
  useEffect(() => {
    if (success) {
      goToNewPage();
    }
  }, [onClick]);
  return (
    <div className={forgotPasswordStylesUsual.main}>
      <h1 className="text text_type_main-large">восстановить пароль</h1>
      <PasswordInput
        placeholder="введите новый пароль"
        onChange={handleChange}
        value={values.password}
        name={"password"}
        extraClass="mt-6"
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={handleChange}
        icon={""}
        value={values.code}
        name={"code"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass=" mt-6 mb-6"
        disabled={false}
      />
      <Button
        onClick={onClick}
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
