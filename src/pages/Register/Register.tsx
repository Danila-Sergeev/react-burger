import React, { useState, useEffect, FC } from "react";
import registerStyles from "../Login/Login.module.css";
import { NavLink } from "react-router-dom";
import { getRegister } from "../../services/actions/register";
import { useNavigate } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "../../utils/hoc";

import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../utils/hoc";
const Register: FC = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const success = useTypedSelector((store) => store.register.registerSuccess);

  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    name: "",
  });

  const onClick = () => {
    dispatch(getRegister(values.email, values.password, values.name));
  };
  function goToNewPage() {
    navigate("/", { replace: false });
  }
  useEffect(() => {
    if (success) {
      goToNewPage();
    }
  }, [onClick]);

  return (
    <div className={registerStyles.main}>
      <h1 className="text text_type_main-large">Регистрация</h1>
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
      />

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
      <Button onClick={onClick} htmlType="button" type="primary" size="medium">
        Зарегистрироваться
      </Button>
      <p className="mt-20 text text_type_main-small">
        Уже зарегистрированы?{" "}
        <NavLink to="/login" className={registerStyles.link}>
          Войти
        </NavLink>
      </p>
    </div>
  );
};
export default Register;
