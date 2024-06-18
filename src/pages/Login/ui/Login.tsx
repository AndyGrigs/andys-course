import { Button, Card, Form, Input, Row, Space, Typography } from "antd";
import Layout from "../../../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { UserData, useLoginMutation } from "../../../redux/services/auth";
import { ErrorMessage } from "../../../components/Error";

import { isErrorWithMessage } from "../../../utils/isErrorWithMessage";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const [loginUser] = useLoginMutation();

  useEffect(() => {
    if (user) {
      navigate("/modules");
    }
  }, [user, navigate]);

  const onFinish = async (data: UserData) => {
    try {
      const response = await loginUser(data).unwrap();
      const { token } = response;
      localStorage.setItem("token", token);
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("сталась помилка...");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card
          title="Увійти в аккаунт"
          // style={{ width: "30rem" }}
        >
          <Form onFinish={onFinish}>
            <Form.Item
              name="fullName"
              label="Ім'я"
              rules={[{ required: true, message: "Напиши своє ім'я" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="code"
              label="Код"
              rules={[{ required: true, message: "Напиши свій код" }]}
            >
              <Input.Password
              
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Увійти
              </Button>
            </Form.Item>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Нема аккаунту?
              <Link
                to="/register"
              >
                Зареєструйтесь
              </Link>
            </Typography.Text>
            <Typography.Text>
              Не знаєш код?
              <Link to="/register-update"
              >
                Відновити
              </Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
