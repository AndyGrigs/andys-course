import { Card, Form, Row, Space, Typography } from "antd";
import Layout from "../../../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { AppButton } from "../../../components/ui/button";
import { AppInput } from "../../../components/ui/input";
import { PasswordInput } from "../../../components/ui/passwordInput";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../../redux/services/auth";
import { IUser } from "../../../types";
import { isErrorWithMessage } from "../../../utils/isErrorWithMessage";

type registerData = Omit<IUser, "id"> & { confirmPassword: string };

export const Registration = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [navigate, user]);

  const register = async (data: registerData) => {
    try {
      await registerUser(data).unwrap();
      navigate("/dashboard");
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Реєстрація" style={{ width: "30rem" }}>
          <Form onFinish={register}>
            <AppInput name="fullName" placeholder="Ім'я" />
            <AppInput type="email" name="email" placeholder="email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Повторіть пароль"
            />
            <AppButton type="primary" htmlType="submit">
              Зареєструватись
            </AppButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Вжу є аккаунт? <Link to="/login">Увійти</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
